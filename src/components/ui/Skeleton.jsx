function Skeleton({ width = "100%", height = "1rem", radius = "md", className = "" }) {
  return <span className={["skeleton", `skeleton--${radius}`, className].filter(Boolean).join(" ")}
    style={{ width, height }} aria-hidden="true" />;
}
export default Skeleton;
