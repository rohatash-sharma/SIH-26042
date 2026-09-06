import { WifiOff } from "lucide-react";
import { useOnlineStatus } from "../../hooks/useOnlineStatus";

function OfflineIndicator() {
  const online = useOnlineStatus();

  if (online) return null;

  return (
    <div className="offline-indicator" role="status">
      <WifiOff size={16} aria-hidden="true" />
      <span>Offline mode — your local data is still available.</span>
    </div>
  );
}

export default OfflineIndicator;
