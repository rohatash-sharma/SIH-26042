import { LogOut } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui";
import useAuth from "./useAuth";

export default function LogoutButton() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/", { replace: true });
  };

  return (
    <Button variant="ghost" leftIcon={<LogOut size={18} />} onClick={handleLogout}>
      Switch profile
    </Button>
  );
}
