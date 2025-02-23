import {
  Box,
  Button,
  Container,
  Divider,
  Paper,
  TextField,
  Typography,
  Alert,
  IconButton,
  InputAdornment,
  CircularProgress,
  Link,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export function LoginPage() {
  const {
    user,
    signInWithGoogle,
    signInWithEmail,
    signUpWithEmail,
    error,
    clearError,
    resetPassword,
  } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isRegister, setIsRegister] = useState(false);
  const [isResetEmailSent, setIsResetEmailSent] = useState(false);
  const [isResetDialogOpen, setIsResetDialogOpen] = useState(false);
  const [resetEmail, setResetEmail] = useState("");
  const [resetEmailError, setResetEmailError] = useState("");

  useEffect(() => {
    if (user) {
      navigate(from, { replace: true });
    }
  }, [user, navigate, from]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    if (isRegister) {
      await signUpWithEmail(email, password);
    } else {
      await signInWithEmail(email, password);
    }
    setIsLoading(false);
  };
  const handleGoogleLogin = async () => {
    setIsLoading(true);
    await signInWithGoogle();
    setIsLoading(false);
  };

  const toggleMode = () => {
    setIsRegister(!isRegister);
    clearError();
  };

  const handleForgotPassword = async () => {
    if (!resetEmail) {
      setResetEmailError("Please enter your email address");
      return;
    }

    if (!/\S+@\S+\.\S+/.test(resetEmail)) {
      setResetEmailError("Please enter a valid email address");
      return;
    }

    setIsLoading(true);
    setResetEmailError("");

    try {
      await resetPassword(resetEmail);
      setIsResetEmailSent(true);
      setTimeout(() => {
        setIsResetDialogOpen(false);
        setIsResetEmailSent(false);
        setResetEmail("");
      }, 3000);
    } catch (error) {
      if (error instanceof Error) {
        setResetEmailError(error.message);
      } else {
        setResetEmailError("An error occurred while resetting password");
      }
    }
    setIsLoading(false);
  };

  const handleResetDialogClose = () => {
    setIsResetDialogOpen(false);
    setResetEmail("");
    setResetEmailError("");
    setIsResetEmailSent(false);
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper
        elevation={3}
        sx={{
          p: 4,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          mt: 8,
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ mb: 3, color: "gray", fontWeight: "bold" }}
        >
          Weather Explore 2.0
        </Typography>

        <Typography component="h2" variant="h5" sx={{ mb: 3 }}>
          {isRegister ? "Create an Account" : "Sign In"}
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{ mb: 2, width: "100%" }}
            onClose={clearError}
          >
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", mb: 2 }}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            label="Email Address"
            type="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            label="Password"
            type={showPassword ? "text" : "password"}
            autoComplete={isRegister ? "new-password" : "current-password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
            <Link
              component="button"
              variant="body2"
              onClick={(e) => {
                e.preventDefault();
                setIsResetDialogOpen(true);
              }}
              sx={{ textDecoration: "none" }}
            >
              Forgot password?
            </Link>
            <Link
              component="button"
              variant="body2"
              onClick={(e) => {
                e.preventDefault();
                toggleMode();
              }}
              sx={{ textDecoration: "none" }}
            >
              {isRegister
                ? "Already have an account? Sign in"
                : "Need an account? Sign up"}
            </Link>
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
            disabled={isLoading}
          >
            {isLoading ? (
              <CircularProgress size={24} color="inherit" />
            ) : isRegister ? (
              "Sign Up"
            ) : (
              "Sign In"
            )}
          </Button>
        </Box>

        <Divider sx={{ width: "100%", mb: 2 }}>
          <Typography color="textSecondary">OR</Typography>
        </Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={isLoading ? <CircularProgress size={20} /> : <Google />}
          onClick={handleGoogleLogin}
          disabled={isLoading}
        >
          Continue with Google
        </Button>
      </Paper>

      {/* Password Reset Dialog */}
      <Dialog open={isResetDialogOpen} onClose={handleResetDialogClose}>
        <DialogTitle>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ mb: 2 }}>
            {isResetEmailSent
              ? "Password reset email has been sent. Please check your inbox."
              : "Enter your email address and we'll send you a link to reset your password."}
          </DialogContentText>
          {resetEmailError && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {resetEmailError}
            </Alert>
          )}
          <TextField
            autoFocus
            margin="dense"
            label="Email Address"
            type="email"
            fullWidth
            variant="outlined"
            value={resetEmail}
            onChange={(e) => setResetEmail(e.target.value)}
            disabled={isResetEmailSent}
            error={!!resetEmailError}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleResetDialogClose} disabled={isLoading}>
            Cancel
          </Button>
          <LoadingButton
            onClick={handleForgotPassword}
            loading={isLoading}
            disabled={isResetEmailSent}
          >
            Reset Password
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
