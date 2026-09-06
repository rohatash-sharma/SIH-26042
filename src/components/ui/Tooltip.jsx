function Tooltip({ content, children, position = "top" }) {
  return <span className="tooltip">
    {children}
    <span className={`tooltip__content tooltip__content--${position}`} role="tooltip">
      {content}
    </span>
  </span>;
}
export default Tooltip;
