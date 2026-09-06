import { forwardRef } from "react";

const Button = forwardRef(function Button({
  children, variant = "primary", size = "md", type = "button",
  disabled = false, loading = false, fullWidth = false, className = "", ...props
}, ref) {
  const classes = ["button", `button--${variant}`, `button--${size}`,
    fullWidth ? "button--full" : "", className].filter(Boolean).join(" ");
  return (
    <button ref={ref} type={type} className={classes}
      disabled={disabled || loading} aria-busy={loading} {...props}>
      {loading ? <><span className="button__spinner" aria-hidden="true" /><span>Loading...</span></> : children}
    </button>
  );
});
Button.displayName = "Button";
export default Button;
