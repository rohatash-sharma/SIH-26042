import { forwardRef, useId } from "react";

const Select = forwardRef(function Select({ label, options = [],
  placeholder = "Select an option", error, hint, required = false, id,
  value, defaultValue, disabled = false, className = "", ...props }, ref) {
  const generatedId = useId();
  const selectId = id ?? generatedId;
  const errorId = `${selectId}-error`;
  const hintId = `${selectId}-hint`;
  const describedBy = [hint ? hintId : "", error ? errorId : ""].filter(Boolean).join(" ");
  return (
    <div className="select-field">
      {label && <label className="select-field__label" htmlFor={selectId}>
        {label}{required && <span className="select-field__required" aria-hidden="true">*</span>}
      </label>}
      <select ref={ref} id={selectId}
        className={["select", error ? "select--error" : "", className].filter(Boolean).join(" ")}
        value={value} defaultValue={defaultValue} required={required} disabled={disabled}
        aria-invalid={Boolean(error)} aria-describedby={describedBy || undefined} {...props}>
        {placeholder && <option value="" disabled={required}>{placeholder}</option>}
        {options.map((option) => typeof option === "string"
          ? <option key={option} value={option}>{option}</option>
          : <option key={option.value} value={option.value} disabled={option.disabled}>{option.label}</option>)}
      </select>
      {hint && !error && <p id={hintId} className="select-field__hint">{hint}</p>}
      {error && <p id={errorId} className="select-field__error" role="alert">{error}</p>}
    </div>
  );
});
Select.displayName = "Select";
export default Select;
