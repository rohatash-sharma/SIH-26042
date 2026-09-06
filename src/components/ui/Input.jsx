import { forwardRef, useId } from "react";

const Input = forwardRef(function Input({ label, error, hint, required = false,
  id, className = "", ...props }, ref) {
  const generatedId = useId();
  const inputId = id ?? generatedId;
  const errorId = `${inputId}-error`;
  const hintId = `${inputId}-hint`;
  const describedBy = [hint ? hintId : "", error ? errorId : ""].filter(Boolean).join(" ");
  return (
    <div className="input-field">
      {label && <label className="input-field__label" htmlFor={inputId}>
        {label}{required && <span className="input-field__required" aria-hidden="true">*</span>}
      </label>}
      <input ref={ref} id={inputId}
        className={["input", error ? "input--error" : "", className].filter(Boolean).join(" ")}
        required={required} aria-invalid={Boolean(error)}
        aria-describedby={describedBy || undefined} {...props} />
      {hint && !error && <p id={hintId} className="input-field__hint">{hint}</p>}
      {error && <p id={errorId} className="input-field__error" role="alert">{error}</p>}
    </div>
  );
});
Input.displayName = "Input";
export default Input;
