import { createContext, useContext, useMemo, useState } from "react";

const AppContext = createContext(null);

export function AppProvider({ children }) {
  const [role, setRole] = useState(null);
  const [language, setLanguage] = useState("en");

  const value = useMemo(
    () => ({
      role,
      setRole,
      language,
      setLanguage,
    }),
    [role, language],
  );

  return (
    <AppContext.Provider value={value}>
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);

  if (!context) {
    throw new Error("useApp must be used inside an AppProvider.");
  }

  return context;
}
