import { lazy, Suspense } from "react";
import "./App.css";
import { AuthProvider } from "./contexts/AuthContext";
import { Routes, Route, Navigate, BrowserRouter } from "react-router-dom";
import { MainLayout } from "./layouts/MainLayout";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { RefetchProvider } from "./contexts/RefetchContext";
import { WeatherProvider } from "./contexts/WeatherContext";
import { ThemeHandler, ThemeProvider } from "./contexts/ThemeContext";
import Loader from "./components/shared/Loader/Loader";

const HomePage = lazy(() => import("./pages/Home-page/HomePage").then(module => ({
  default: module.HomePage
})));
const LoginPage = lazy(() => import("./pages/LoginPage").then(module => ({
  default: module.LoginPage
})));
const ProfilePage = lazy(() => import("./pages/ProfilePage/ProfilePage").then(module => ({
  default: module.ProfilePage
})));




const LoadingFallback = () => (
  <Loader fullScreen size="medium" text="Loading..." />
);


function App() {
  return (
    <BrowserRouter>
      <ThemeProvider>
        <ThemeHandler />
        <AuthProvider>
          <RefetchProvider>
            <WeatherProvider>
              <Routes>
                {/* Public route without layout */}
                <Route
                  path="/login"
                  element={
                    <Suspense fallback={<LoadingFallback />}>
                      <LoginPage />
                    </Suspense>
                  }
                />

                {/* Protected routes with layout */}
                <Route element={<MainLayout />}>
                  <Route
                    path="/"
                    element={
                      <ProtectedRoute>
                        <Suspense fallback={<LoadingFallback />}>
                          <HomePage />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                  <Route
                    path="/profile"
                    element={
                      <ProtectedRoute>
                        <Suspense fallback={<LoadingFallback />}>
                          <ProfilePage />
                        </Suspense>
                      </ProtectedRoute>
                    }
                  />
                </Route>

                {/* Catch all route */}
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </WeatherProvider>
          </RefetchProvider>
        </AuthProvider>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
