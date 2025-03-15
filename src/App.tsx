import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { HomePage } from "./pages/Home-page/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { ProfilePage } from "./pages/ProfilePage";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RefetchProvider } from "./contexts/RefetchContext";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <RefetchProvider>
          <Routes>
            {/* Public route without layout */}
            <Route path="/login" element={<LoginPage />} />

            {/* Protected routes with layout */}
            <Route element={<MainLayout />}>
              <Route
                path="/"
                element={
                  <ProtectedRoute>
                    <HomePage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <ProfilePage />
                  </ProtectedRoute>
                }
              />
            </Route>

            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </RefetchProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
