import {
  Box,
  Button,
  Container,
  TextField,
  Typography,
  Paper,
  Divider,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Link,
  Alert,
  InputAdornment
} from "@mui/material";
import { Google, Visibility, VisibilityOff } from "@mui/icons-material";
import { LoadingButton } from "@mui/lab";

import Loader from "../components/shared/Loader/Loader";
import { useAuth } from "../contexts/AuthContext";
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTheme } from "../contexts/ThemeContext";

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
  const { theme } = useTheme();
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
    <Container component="main" maxWidth="sm" sx={{ 
      minHeight: '100vh', 
      display: 'flex', 
      alignItems: 'center',
      justifyContent: 'center',
      py: { xs: 4, sm: 2 }
    }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 2.5, sm: 5 },
          width: '100%',
          maxWidth: { xs: '100%', sm: '450px' },
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: { xs: '8px', sm: '12px' },
          backgroundColor: '#fafafa',
          boxShadow: theme?.boxShadow,
          mx: 'auto'
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          className="theme-typography"
          sx={{
            mb: { xs: 2.5, sm: 4 },
            color: '#333',
            fontWeight: 600,
            letterSpacing: '-0.5px',
            fontSize: { xs: '1.7rem', sm: '2.125rem' }
          }}
        >
          Weather Explore 2.0
        </Typography>

        <Typography
          component="h2"
          variant="h5"
          className="theme-typography"
          sx={{
            mb: { xs: 2, sm: 3 },
            color: '#444',
            fontWeight: 500,
            fontSize: { xs: '1.3rem', sm: '1.5rem' }
          }}
        >
          {isRegister ? "Create an Account" : "Sign In"}
        </Typography>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 3,
              width: "100%",
              borderRadius: '8px',
              '& .MuiAlert-icon': {
                color: '#666'
              }
            }}
            onClose={clearError}
          >
            {error}
          </Alert>
        )}

        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ width: "100%", mb: 3 }}
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
            sx={{
              mb: 3,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#ddd',
                },
                '&:hover fieldset': {
                  borderColor: '#aaa',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#666',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#666',
              },
            }}
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
            sx={{
              mb: 2,
              '& .MuiOutlinedInput-root': {
                borderRadius: '8px',
                '& fieldset': {
                  borderColor: '#ddd',
                },
                '&:hover fieldset': {
                  borderColor: '#aaa',
                },
                '&.Mui-focused fieldset': {
                  borderColor: '#666',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#666',
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                    sx={{ color: '#666' }}
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Box sx={{ 
            display: "flex", 
            flexDirection: { xs: "column", sm: "row" },
            justifyContent: "space-between", 
            alignItems: { xs: "flex-start", sm: "center" },
            width: "100%", 
            mb: 3,
            gap: { xs: 1.5, sm: 0 }
          }}>
            <Link
              component="span"
              variant="body2"
              className="theme-typography"
              onClick={(e) => {
                e.preventDefault();
                setIsResetDialogOpen(true);
              }}
              sx={{
                textDecoration: "none",
                color: '#666',
                '&:hover': {
                  color: '#333',
                },
                cursor: 'pointer'
              }}
            >
              Forgot password?
            </Link>
            <Link
              component="span"
              variant="body2"
              className="theme-typography"
              onClick={(e) => {
                e.preventDefault();
                toggleMode();
              }}
              sx={{
                textDecoration: "none",
                color: '#666',
                '&:hover': {
                  color: '#333',
                },
                cursor: 'pointer'
              }}
            >
              {isRegister ? "Already have an account? Sign In" : "Don't have an account? Register"}
            </Link>
          </Box>

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            loading={isLoading}
            disabled={!email || !password}
            sx={{
              mt: { xs: 1.5, sm: 2 },
              mb: { xs: 2, sm: 3 },
              py: { xs: 1.2, sm: 1.5 },
              bgcolor: '#444',
              color: 'white',
              boxShadow: 'none',
              borderRadius: '8px',
              fontSize: { xs: '0.875rem', sm: '0.9375rem' },
              '&:hover': {
                bgcolor: '#333',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
              },
              '&.Mui-disabled': {
                bgcolor: '#eee',
                color: '#999',
              },
            }}
          >
            {isRegister ? "Register" : "Sign In"}
          </LoadingButton>
        </Box>

        <Divider sx={{ width: "100%", mb: { xs: 2, sm: 3 }, color: '#ccc' }}>
          <Typography className="theme-typography" variant="body2" sx={{ color: '#888' }}>OR</Typography>
        </Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<Google />}
          onClick={handleGoogleLogin}
          disabled={isLoading}
          sx={{
            py: { xs: 1.2, sm: 1.5 },
            color: '#444',
            borderColor: '#ddd',
            borderRadius: '8px',
            fontSize: { xs: '0.875rem', sm: '0.9375rem' },
            '&:hover': {
              borderColor: '#999',
              bgcolor: '#f9f9f9',
            },
            '& .MuiButton-startIcon': {
              color: '#444',
              marginRight: { xs: 1, sm: 1.5 }
            }
          }}
        >
          {isLoading ? <Loader size="small" /> : "Continue with Google"}
        </Button>
      </Paper>

      <Dialog 
        open={isResetDialogOpen} 
        onClose={handleResetDialogClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
        sx: {
          borderRadius: { xs: '8px', sm: '12px' },
          bgcolor: '#fafafa',
          p: { xs: 1, sm: 1.5 },
          m: { xs: 2, sm: 0 },
          width: { xs: 'calc(100% - 32px)', sm: '100%' }
        }
      }}>
        <DialogTitle className="theme-typography" sx={{ 
          color: '#444',
          fontSize: { xs: '1.2rem', sm: '1.25rem' },
          pt: { xs: 1.5, sm: 2 }
        }}>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText className="theme-typography" sx={{ 
            color: '#666', 
            mb: 2,
            fontSize: { xs: '0.875rem', sm: '1rem' } 
          }}>
            Enter your email address and we will send you a link to reset your password.
          </DialogContentText>
          {isResetEmailSent ? (
            <Alert severity="success" sx={{ borderRadius: '8px' }}>
              Password reset email sent. Please check your inbox.
            </Alert>
          ) : (
            <TextField
              autoFocus
              margin="dense"
              label="Email Address"
              type="email"
              fullWidth
              value={resetEmail}
              onChange={(e) => setResetEmail(e.target.value)}
              error={!!resetEmailError}
              helperText={resetEmailError}
              sx={{
                '& .MuiOutlinedInput-root': {
                  borderRadius: '8px',
                  '& fieldset': {
                    borderColor: '#ddd',
                  },
                  '&:hover fieldset': {
                    borderColor: '#aaa',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#666',
                  },
                },
                '& .MuiInputLabel-root.Mui-focused': {
                  color: '#666',
                },
              }}
            />
          )}
        </DialogContent>
        <DialogActions sx={{ 
          px: { xs: 2, sm: 3 }, 
          pb: { xs: 2, sm: 3 },
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'stretch',
          gap: { xs: 1, sm: 0 }
        }}>
          <Button
            onClick={handleResetDialogClose}
            className="theme-typography"
            fullWidth={window.innerWidth < 600}
            sx={{
              color: '#666',
              order: { xs: 2, sm: 1 },
              '&:hover': {
                bgcolor: '#f5f5f5',
                color: '#444'
              }
            }}
          >
            Cancel
          </Button>
          <LoadingButton
            loading={isLoading}
            disabled={isResetEmailSent}
            onClick={handleForgotPassword}
            fullWidth={window.innerWidth < 600}
            sx={{
              bgcolor: '#444',
              color: 'white',
              order: { xs: 1, sm: 2 },
              '&:hover': {
                bgcolor: '#333',
              },
              '&.Mui-disabled': {
                bgcolor: '#eee',
                color: '#999',
              },
            }}
          >
            Reset Password
          </LoadingButton>
        </DialogActions>
      </Dialog>
    </Container>
  );
}
