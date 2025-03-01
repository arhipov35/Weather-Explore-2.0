import {
  Box,
  Tooltip,
  IconButton,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { User } from "firebase/auth";

interface UserMenuProps {
  user: User;
  onLogout: () => Promise<void>;
  onOpenProfile: () => void;
}

function UserMenu({ user, onLogout, onOpenProfile }: UserMenuProps) {
  const [anchorElUser, setAnchorElUser] = useState<null | HTMLElement>(null);

  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <Box sx={{ flexGrow: 0 }}>
      <Tooltip title="Open settings">
        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
          <Avatar 
            alt={user.displayName || 'User'} 
            src={user.photoURL || undefined}
            sx={{ width: '3rem', height: '3rem' }}
          />
        </IconButton>
      </Tooltip>
      <Menu
        sx={{ mt: "45px" }}
        id="menu-appbar"
        anchorEl={anchorElUser}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        keepMounted
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        open={Boolean(anchorElUser)}
        onClose={handleCloseUserMenu}
      >
        <MenuItem onClick={() => {
          handleCloseUserMenu();
          onOpenProfile();
        }}>
          <Typography textAlign="center">Profile</Typography>
        </MenuItem>
        <MenuItem onClick={() => {
          handleCloseUserMenu();
          onLogout();
        }}>
          <Typography textAlign="center">Logout</Typography>
        </MenuItem>
      </Menu>
    </Box>
  );
}

export default UserMenu;
