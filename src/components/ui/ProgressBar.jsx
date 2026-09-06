function ProgressBar({ value = 0, max = 100, label, showValue = false,
  size = "md", variant = "primary", className = "" }) {
  const safeMax = max > 0 ? max : 100;
  const percentage = Math.min(100, Math.max(0, (value / safeMax) * 100));
  const rounded = Math.round(percentage);
  return <div className={["progress-bar", `progress-bar--${size}`, `progress-bar--${variant}`, className].filter(Boolean).join(" ")}>
    {(label || showValue) && <div className="progress-bar__header">
      {label && <span className="progress-bar__label">{label}</span>}
      {showValue && <span className="progress-bar__value">{rounded}%</span>}
    </div>}
    <div className="progress-bar__track" role="progressbar"
      aria-valuenow={rounded} aria-valuemin="0" aria-valuemax="100"
      aria-label={label ?? "Progress"}>
      <div className="progress-bar__fill" style={{ width: `${percentage}%` }} />
    </div>
  </div>;
}
export default ProgressBar;
