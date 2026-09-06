function Spinner({ size = "md", label = "Loading...", className = "" }) {
  return <span className={["spinner", `spinner--${size}`, className].filter(Boolean).join(" ")}
    role="status" aria-label={label}>
    <span className="spinner__circle" aria-hidden="true" />
    {label && <span className="spinner__label">{label}</span>}
  </span>;
}
export default Spinner;
