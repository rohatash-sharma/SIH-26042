function Grid({
  children,
  columns = "repeat(auto-fit, minmax(240px, 1fr))",
  gap = "1rem",
  className = "",
}) {
  return (
    <div
      className={className}
      style={{
        display: "grid",
        gridTemplateColumns: columns,
        gap,
      }}
    >
      {children}
    </div>
  );
}

export default Grid;
