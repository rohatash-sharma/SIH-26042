import { Navigate, Outlet } from "react-router-dom";
import { useApp } from "../../app/providers";

function ProtectedLayout({ requiredRole }) {
  const { role } = useApp();

  if (!role) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole && role !== requiredRole) {
    return <Navigate to={`/${role}`} replace />;
  }

  return <Outlet />;
}

export default ProtectedLayout;
