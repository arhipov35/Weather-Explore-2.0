import { useState } from 'react';
import {
  Box,
  Typography,
  Avatar,
  TextField,
  Button,
  Paper,
  IconButton,
  Snackbar,
  Alert,
  Container,
} from '@mui/material';
import { Edit as EditIcon, PhotoCamera } from '@mui/icons-material';
import { useAuth } from '../contexts/AuthContext';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export function ProfilePage() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [displayName, setDisplayName] = useState(user?.displayName || '');
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState<'success' | 'error'>('success');
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const handleUpdateProfile = async () => {
    try {
      const auth = getAuth();
      if (!auth.currentUser) return;

      await updateProfile(auth.currentUser, {
        displayName: displayName,
      });

      setMessage('Profile updated successfully!');
      setSeverity('success');
      setOpenSnackbar(true);
      setIsEditing(false);
    } catch (error) {
      setMessage((error as Error).message);
      setSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      const storage = getStorage();
      const storageRef = ref(storage, `profile-photos/${user?.uid}`);
      await uploadBytes(storageRef, file);
      const photoURL = await getDownloadURL(storageRef);

      const auth = getAuth();
      if (!auth.currentUser) return;

      await updateProfile(auth.currentUser, {
        photoURL: photoURL,
      });

      setMessage('Profile photo updated successfully!');
      setSeverity('success');
      setOpenSnackbar(true);
    } catch (error) {
      setMessage((error as Error).message);
      setSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Container maxWidth="sm">
      <Paper elevation={3} sx={{ p: 4, mt: 4, borderRadius: 2 }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={user?.photoURL || undefined}
              alt={user?.displayName || 'User'}
              sx={{
                width: 120,
                height: 120,
                border: '4px solid #fff',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            />
            {isEditing && (
              <>
                <input
                  accept="image/*"
                  type="file"
                  id="photo-upload"
                  onChange={handlePhotoUpload}
                  style={{ display: 'none' }}
                />
                <label htmlFor="photo-upload">
                  <IconButton
                    component="span"
                    sx={{
                      position: 'absolute',
                      bottom: 0,
                      right: 0,
                      backgroundColor: 'primary.main',
                      color: 'white',
                      '&:hover': { backgroundColor: 'primary.dark' },
                    }}
                  >
                    <PhotoCamera />
                  </IconButton>
                </label>
              </>
            )}
          </Box>

          {isEditing ? (
            <>
              <TextField
                fullWidth
                label="Display Name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                variant="outlined"
                sx={{ mt: 2 }}
              />
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleUpdateProfile}
                  sx={{ minWidth: 100 }}
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                  sx={{ minWidth: 100 }}
                >
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h4" component="h1" sx={{ fontWeight: 'medium' }}>
                {user?.displayName || 'User'}
              </Typography>
              <Typography variant="body1" color="text.secondary">
                {user?.email}
              </Typography>
              <Button
                startIcon={<EditIcon />}
                variant="outlined"
                onClick={() => setIsEditing(true)}
                sx={{ mt: 2 }}
              >
                Edit Profile
              </Button>
            </>
          )}
        </Box>
      </Paper>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={severity}
          sx={{ width: '100%' }}
        >
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
