import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "./auth-context";

export function ProtectedRoute() {
  const { isAuthenticated } = useAuth();
  const location = useLocation();
  return isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to="/login" replace state={{ from: location }} />
  );
}

export function GuestOnlyRoute() {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/users" replace /> : <Outlet />;
}

export function DefaultRoute() {
  const { isAuthenticated } = useAuth();
  return <Navigate to={isAuthenticated ? "/users" : "/login"} replace />;
}
