import { useCallback, useEffect, useState } from "react";
import { useApp } from "../../app/providers";
import {
  clearCurrentUser,
  createLocalUser,
  getCurrentUser,
  saveCurrentUser,
} from "./authService";

export default function useAuth() {
  const { role, setRole, language, setLanguage } = useApp();
  const [user, setUser] = useState(null);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const storedUser = getCurrentUser();

    if (storedUser) {
      setUser(storedUser);
      setRole(storedUser.role);

      if (storedUser.language) {
        setLanguage(storedUser.language);
      }
    }

    setIsReady(true);
  }, [setLanguage, setRole]);

  const loginAsRole = useCallback(
    (selectedRole) => {
      setRole(selectedRole);
    },
    [setRole],
  );

  const createProfile = useCallback(
    (profile) => {
      const nextUser = createLocalUser(profile);

      saveCurrentUser(nextUser);
      setUser(nextUser);
      setRole(nextUser.role);
      setLanguage(nextUser.language);

      return nextUser;
    },
    [setLanguage, setRole],
  );

  const updateProfile = useCallback(
    (updates) => {
      if (!user) {
        throw new Error("No local user profile is active.");
      }

      const nextUser = {
        ...user,
        ...updates,
        id: user.id,
        role: user.role,
      };

      saveCurrentUser(nextUser);
      setUser(nextUser);

      if (nextUser.language) {
        setLanguage(nextUser.language);
      }

      return nextUser;
    },
    [setLanguage, user],
  );

  const logout = useCallback(() => {
    clearCurrentUser();
    setUser(null);
    setRole(null);
    setLanguage("en");
  }, [setLanguage, setRole]);

  return {
    user,
    role: user?.role ?? role,
    language: user?.language ?? language,
    isReady,
    isAuthenticated: Boolean(user),
    loginAsRole,
    createProfile,
    updateProfile,
    logout,
  };
}
