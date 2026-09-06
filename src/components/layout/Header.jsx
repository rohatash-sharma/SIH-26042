import { Wifi, WifiOff } from "lucide-react";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

function Header({ title = "SIH 26042", children }) {
  const online = useOnlineStatus();

  return (
    <header className="app-header">
      <div className="app-header__brand">
        <strong>{title}</strong>
        <span className="app-header__status">
          {online ? <Wifi size={16} /> : <WifiOff size={16} />}
          {online ? "Online" : "Offline"}
        </span>
      </div>

      {children && <div className="app-header__actions">{children}</div>}
    </header>
  );
}

export default Header;
