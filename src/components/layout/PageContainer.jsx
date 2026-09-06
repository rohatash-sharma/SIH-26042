function PageContainer({ children, className = "" }) {
  return (
    <main className={["page-container", className].filter(Boolean).join(" ")}>
      {children}
    </main>
  );
}

export default PageContainer;
