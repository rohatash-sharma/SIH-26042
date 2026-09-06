function Avatar({ name = "", src, size = "md" }) {
  const initials = name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase();
  if (src) return <img src={src} alt={name} className={`avatar avatar--${size}`} />;
  return <div className={`avatar avatar--${size}`} aria-label={name}>{initials}</div>;
}
export default Avatar;
