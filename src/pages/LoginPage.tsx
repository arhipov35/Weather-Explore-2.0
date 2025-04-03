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
    <Container component="main" maxWidth="sm" sx={{ height: '100vh', display: 'flex', alignItems: 'center' }}>
      <Paper
        elevation={6}
        sx={{
          p: { xs: 3, sm: 5 },
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          borderRadius: '12px',
          backgroundColor: '#fafafa',
          boxShadow: '0 8px 24px rgba(0, 0, 0, 0.05)',
        }}
      >
        <Typography
          component="h1"
          variant="h4"
          sx={{ 
            mb: 4, 
            color: '#333',
            fontWeight: 600,
            letterSpacing: '-0.5px'
          }}
        >
          Weather Explore 2.0
        </Typography>

        <Typography 
          component="h2" 
          variant="h5" 
          sx={{ 
            mb: 3,
            color: '#444',
            fontWeight: 500
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
          <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3 }}>
            <Link
              component="span"
              variant="body2"
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
              mt: 2,
              mb: 3,
              py: 1.5,
              bgcolor: '#444',
              color: 'white',
              boxShadow: 'none',
              borderRadius: '8px',
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

        <Divider sx={{ width: "100%", mb: 3, color: '#ccc' }}>
          <Typography variant="body2" sx={{ color: '#888' }}>OR</Typography>
        </Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={<Google />}
          onClick={handleGoogleLogin}
          disabled={isLoading}
          sx={{
            py: 1.5,
            color: '#444',
            borderColor: '#ddd',
            borderRadius: '8px',
            '&:hover': {
              borderColor: '#999',
              bgcolor: '#f9f9f9',
            },
            '& .MuiButton-startIcon': {
              color: '#444'
            }
          }}
        >
          {isLoading ? <CircularProgress size={24} /> : "Continue with Google"}
        </Button>
      </Paper>

      <Dialog open={isResetDialogOpen} onClose={handleResetDialogClose} PaperProps={{
        sx: { 
          borderRadius: '12px',
          bgcolor: '#fafafa',
          p: 1
        }
      }}>
        <DialogTitle sx={{ color: '#444' }}>Reset Password</DialogTitle>
        <DialogContent>
          <DialogContentText sx={{ color: '#666', mb: 2 }}>
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
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button 
            onClick={handleResetDialogClose} 
            sx={{ 
              color: '#666',
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
            sx={{
              bgcolor: '#444',
              color: 'white',
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
