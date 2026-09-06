function EmptyState({ icon, title, description, action, className = "" }) {
  return <section className={["empty-state", className].filter(Boolean).join(" ")}>
    {icon && <div className="empty-state__icon" aria-hidden="true">{icon}</div>}
    <div className="empty-state__content">
      <h2 className="empty-state__title">{title}</h2>
      {description && <p className="empty-state__description">{description}</p>}
      {action && <div className="empty-state__action">{action}</div>}
    </div>
  </section>;
}
export default EmptyState;
