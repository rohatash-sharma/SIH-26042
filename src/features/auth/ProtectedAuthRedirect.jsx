import { Outlet } from "react-router-dom";
import useAuth from "./useAuth";

export default function ProtectedAuthRedirect() {
  const { isReady } = useAuth();

  if (!isReady) {
    return null;
  }

  return <Outlet />;
}
