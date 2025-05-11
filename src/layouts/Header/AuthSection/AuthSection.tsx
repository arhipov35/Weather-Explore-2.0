import { Button } from "@mui/material";
import UserMenu from "../UserMenu/UserMenu";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../contexts/AuthContext";

export function AuthSection() {
  const { user, signInWithGoogle, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="auth-section">
      {user ? (
        <UserMenu 
          user={user}
          onLogout={logout}
          onOpenProfile={() => navigate("/profile")}
        />
      ) : (
        <Button 
          color="inherit" 
          variant="outlined" 
          onClick={signInWithGoogle}
        >
          Sign in with Google
        </Button>
      )}
    </div>
  );
}
