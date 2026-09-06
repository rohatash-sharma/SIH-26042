import { forwardRef, useId } from "react";

const Textarea = forwardRef(function Textarea({ label, error, hint, required = false,
  id, rows = 4, resize = "vertical", className = "", ...props }, ref) {
  const generatedId = useId();
  const textareaId = id ?? generatedId;
  const errorId = `${textareaId}-error`;
  const hintId = `${textareaId}-hint`;
  const describedBy = [hint ? hintId : "", error ? errorId : ""].filter(Boolean).join(" ");
  return (
    <div className="textarea-field">
      {label && <label className="textarea-field__label" htmlFor={textareaId}>
        {label}{required && <span className="textarea-field__required" aria-hidden="true">*</span>}
      </label>}
      <textarea ref={ref} id={textareaId} rows={rows}
        className={["textarea", `textarea--resize-${resize}`, error ? "textarea--error" : "", className].filter(Boolean).join(" ")}
        required={required} aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined} {...props} />
      {hint && !error && <p id={hintId} className="textarea-field__hint">{hint}</p>}
      {error && <p id={errorId} className="textarea-field__error" role="alert">{error}</p>}
    </div>
  );
});
Textarea.displayName = "Textarea";
export default Textarea;
