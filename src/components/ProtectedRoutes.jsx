import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom";

// Normal Protected Route
export const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated } = useSelector(store => store.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Prevent access for logged-in users (login/signup page)
export const isAuthenticatedUser = ({ children }) => {
  const { isAuthenticated } = useSelector(store => store.auth);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return children;
};

// Admin Only Route
export const AdminRoute = ({ children }) => {
  const { user, isAuthenticated } = useSelector(store => store.auth);

  // Not logged in
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Logged in but not admin
  if (user?.role !== "admin") {
    return <Navigate to="/" />;
  }

  // Admin can access
  return children;
};
