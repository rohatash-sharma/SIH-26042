const PREFIX = "sih26042:";

export function getStorage(key, fallback = null) {
  try {
    const value = localStorage.getItem(`${PREFIX}${key}`);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function setStorage(key, value) {
  localStorage.setItem(`${PREFIX}${key}`, JSON.stringify(value));
}

export function removeStorage(key) {
  localStorage.removeItem(`${PREFIX}${key}`);
}

export function clearStorage() {
  Object.keys(localStorage)
    .filter((key) => key.startsWith(PREFIX))
    .forEach((key) => localStorage.removeItem(key));
}
