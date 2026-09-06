import { useEffect, useId } from "react";
import { X } from "lucide-react";

function Modal({ open = false, onClose, title, description, children, footer,
  size = "md", closeOnOverlayClick = true, closeOnEscape = true,
  showCloseButton = true, className = "" }) {
  const titleId = useId();
  const descriptionId = useId();

  useEffect(() => {
    if (!open || !closeOnEscape) return undefined;
    const handler = (event) => { if (event.key === "Escape") onClose?.(); };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [open, closeOnEscape, onClose]);

  useEffect(() => {
    if (!open) return undefined;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = previous; };
  }, [open]);

  if (!open) return null;

  return <div className="modal-overlay" role="presentation"
    onMouseDown={(event) => {
      if (closeOnOverlayClick && event.target === event.currentTarget) onClose?.();
    }}>
    <div className={["modal", `modal--${size}`, className].filter(Boolean).join(" ")}
      role="dialog" aria-modal="true"
      aria-labelledby={title ? titleId : undefined}
      aria-describedby={description ? descriptionId : undefined}
      onMouseDown={(event) => event.stopPropagation()}>
      {(title || showCloseButton) && <header className="modal__header">
        <div className="modal__heading">
          {title && <h2 id={titleId} className="modal__title">{title}</h2>}
          {description && <p id={descriptionId} className="modal__description">{description}</p>}
        </div>
        {showCloseButton && <button type="button" className="modal__close" onClick={onClose} aria-label="Close dialog">
          <X size={20} aria-hidden="true" />
        </button>}
      </header>}
      <div className="modal__content">{children}</div>
      {footer && <footer className="modal__footer">{footer}</footer>}
    </div>
  </div>;
}
export default Modal;
