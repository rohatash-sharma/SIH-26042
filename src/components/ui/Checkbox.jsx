import { forwardRef, useId } from "react";

const Checkbox = forwardRef(function Checkbox({ label, description, id, className = "", ...props }, ref) {
  const generatedId = useId();
  const checkboxId = id ?? generatedId;
  return <label htmlFor={checkboxId} className={["checkbox", className].filter(Boolean).join(" ")}>
    <input ref={ref} id={checkboxId} type="checkbox" className="checkbox__input" {...props} />
    <span className="checkbox__content">
      {label && <span className="checkbox__label">{label}</span>}
      {description && <span className="checkbox__description">{description}</span>}
    </span>
  </label>;
});
Checkbox.displayName = "Checkbox";
export default Checkbox;
