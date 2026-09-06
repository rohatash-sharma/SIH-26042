import { X } from "lucide-react";

function Toast({ message, variant = "default", onClose, action }) {
  return <div className={`toast toast--${variant}`} role="status">
    <span className="toast__message">{message}</span>
    {action && <div className="toast__action">{action}</div>}
    {onClose && <button type="button" className="toast__close" onClick={onClose} aria-label="Close notification">
      <X size={18} />
    </button>}
  </div>;
}
export default Toast;
