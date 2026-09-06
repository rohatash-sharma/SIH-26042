import { Navigate } from "react-router-dom";
import useAuth from "../auth/useAuth";

export default function SettingsRedirect() {
  const { role } = useAuth();
  return <Navigate to={role === "teacher" ? "/teacher/settings" : "/student/settings"} replace />;
}
