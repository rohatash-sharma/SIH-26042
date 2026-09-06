export const CURRENT_DB_VERSION = 1;

// Future database migrations belong here.
// Keep migrations additive so existing offline data is preserved.
export function registerMigrations() {
  return CURRENT_DB_VERSION;
}
