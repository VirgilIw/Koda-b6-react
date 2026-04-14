import { useSelector } from "react-redux";
import { Navigate, Outlet, useLocation } from "react-router";

export default function PrivateRoute({ requireAdmin = false }) {
  const { token, user } = useSelector((state) => state.auth);
  const location = useLocation();

  if (!token) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (requireAdmin && user?.role !== "admin") {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
}