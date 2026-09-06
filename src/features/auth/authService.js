import {
  getStorage,
  removeStorage,
  setStorage,
} from "../../services/storageService";

export const AUTH_STORAGE_KEY = "currentUser";

export function getCurrentUser() {
  return getStorage(AUTH_STORAGE_KEY, null);
}

export function saveCurrentUser(user) {
  if (!user?.id || !user?.role) {
    throw new Error("A valid local user profile is required.");
  }

  setStorage(AUTH_STORAGE_KEY, user);
  return user;
}

export function clearCurrentUser() {
  removeStorage(AUTH_STORAGE_KEY);
}

export function createLocalUser({
  name,
  role,
  language = "en",
  grade = null,
}) {
  return {
    id: `${role}_${Date.now()}`,
    name: name.trim(),
    role,
    language,
    ...(grade ? { grade: Number(grade) } : {}),
  };
}
