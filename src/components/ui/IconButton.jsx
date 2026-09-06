import { forwardRef } from "react";

const IconButton = forwardRef(function IconButton({
  icon, label, variant = "ghost", size = "md", type = "button",
  disabled = false, className = "", ...props
}, ref) {
  return <button ref={ref} type={type}
    className={["icon-button", `icon-button--${variant}`, `icon-button--${size}`, className].filter(Boolean).join(" ")}
    disabled={disabled} aria-label={label} title={label} {...props}>
    {icon}
  </button>;
});
IconButton.displayName = "IconButton";
export default IconButton;
