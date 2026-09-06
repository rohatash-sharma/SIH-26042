function LoadingScreen({ message = "Loading..." }) {
  return (
    <div
      style={{
        minHeight: "40vh",
        display: "grid",
        placeItems: "center",
        padding: "2rem",
      }}
    >
      <div style={{ textAlign: "center" }}>
        <div
          style={{
            width: 40,
            height: 40,
            margin: "0 auto 1rem",
            border: "4px solid #e5e7eb",
            borderTopColor: "#2563eb",
            borderRadius: "50%",
            animation: "sih-spin 0.8s linear infinite",
          }}
        />
        <p>{message}</p>
      </div>

      <style>{`
        @keyframes sih-spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
}

export default LoadingScreen;
