export function formatDate(value, locale = "en-IN") {
  if (!value) return "";

  return new Intl.DateTimeFormat(locale, {
    day: "numeric",
    month: "short",
    year: "numeric"
  }).format(new Date(value));
}

export function percentage(value, max) {
  if (!max) return 0;
  return Math.round((value / max) * 100);
}
