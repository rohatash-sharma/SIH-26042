import { useEffect } from "react";
import { X } from "lucide-react";

function Drawer({ open = false, onClose, title, children, position = "right", className = "" }) {
  useEffect(() => {
    if (!open) return undefined;
    const handler = (event) => { if (event.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, onClose]);

  if (!open) return null;

  return <div className="drawer-overlay" onMouseDown={(e) => {
    if (e.target === e.currentTarget) onClose?.();
  }}>
    <aside className={["drawer", `drawer--${position}`, className].filter(Boolean).join(" ")}
      role="dialog" aria-modal="true" aria-label={title}>
      <header className="drawer__header">
        <h2>{title}</h2>
        <button type="button" className="drawer__close" onClick={onClose} aria-label="Close">
          <X size={20} />
        </button>
      </header>
      <div className="drawer__content">{children}</div>
    </aside>
  </div>;
}
export default Drawer;
