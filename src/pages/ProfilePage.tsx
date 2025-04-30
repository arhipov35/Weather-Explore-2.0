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
import { useTheme } from '../contexts/ThemeContext';
import { getAuth, updateProfile } from 'firebase/auth';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './ProfilePage.scss';

export function ProfilePage() {
  const { user } = useAuth();
  const { theme } = useTheme();
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
    <Container maxWidth="sm" className={`theme-${theme?.description?.toLowerCase() || 'white'}`}>
      <Paper
        elevation={3}
        className="profile-page-paper"
      >
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
          <Box sx={{ position: 'relative' }}>
            <Avatar
              src={user?.photoURL || undefined}
              alt={user?.displayName || 'User'}
              className="profile-page-avatar"
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
                    className="profile-page-camera-button"
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
                className="profile-page-text-field"
              />
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <Button
                  variant="contained"
                  onClick={handleUpdateProfile}
                  className="profile-page-save-button"
                >
                  Save
                </Button>
                <Button
                  variant="outlined"
                  onClick={() => setIsEditing(false)}
                  className="profile-page-cancel-button"
                >
                  Cancel
                </Button>
              </Box>
            </>
          ) : (
            <>
              <Typography variant="h5" component="h1">
                {user?.displayName || 'User'}
              </Typography>
              <Typography variant="body1" color="textSecondary">
                {user?.email}
              </Typography>
              <Button
                variant="contained"
                startIcon={<EditIcon />}
                onClick={() => setIsEditing(true)}
                className="profile-page-edit-button"
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
        <Alert onClose={() => setOpenSnackbar(false)} severity={severity}>
          {message}
        </Alert>
      </Snackbar>
    </Container>
  );
}
