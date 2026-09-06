function Badge({ children, variant = "default", size = "md", icon, className = "", ...props }) {
  return <span className={["badge", `badge--${variant}`, `badge--${size}`, className].filter(Boolean).join(" ")} {...props}>
    {icon && <span className="badge__icon" aria-hidden="true">{icon}</span>}
    <span className="badge__text">{children}</span>
  </span>;
}
export default Badge;
