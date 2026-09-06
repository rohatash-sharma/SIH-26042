function ErrorState({
  title = "Something went wrong",
  message = "We couldn't load this content.",
  onRetry,
}) {
  return (
    <div
      style={{
        padding: "2rem",
        textAlign: "center",
        border: "1px solid #fecaca",
        borderRadius: "12px",
        background: "#fef2f2",
      }}
    >
      <h2>{title}</h2>
      <p>{message}</p>

      {onRetry && (
        <button
          type="button"
          onClick={onRetry}
          style={{
            marginTop: "1rem",
            padding: "0.65rem 1rem",
            border: 0,
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorState;
