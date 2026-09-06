export default function ProgressStatCard({
  label,
  value,
  helper,
  icon: Icon,
}) {
  return (
    <article className="progress-stat-card">
      <div className="progress-stat-card__icon">
        {Icon ? <Icon size={22} /> : null}
      </div>
      <div className="progress-stat-card__content">
        <span>{label}</span>
        <strong>{value}</strong>
        {helper ? <small>{helper}</small> : null}
      </div>
    </article>
  );
}
