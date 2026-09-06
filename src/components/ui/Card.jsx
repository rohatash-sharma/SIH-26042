function Card({ children, title, description, icon, footer, variant = "default",
  padding = "md", hoverable = false, className = "", ...props }) {
  const classes = ["card", `card--${variant}`, `card--padding-${padding}`,
    hoverable ? "card--hoverable" : "", className].filter(Boolean).join(" ");
  return (
    <section className={classes} {...props}>
      {(icon || title || description) && <header className="card__header">
        {icon && <div className="card__icon" aria-hidden="true">{icon}</div>}
        <div className="card__heading">
          {title && <h3 className="card__title">{title}</h3>}
          {description && <p className="card__description">{description}</p>}
        </div>
      </header>}
      <div className="card__content">{children}</div>
      {footer && <footer className="card__footer">{footer}</footer>}
    </section>
  );
}
export default Card;
