import { useCallback, useState } from "react";
import { getStorage, setStorage } from "../services/storageService";

export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => getStorage(key, initialValue));

  const updateValue = useCallback((nextValue) => {
    setValue((currentValue) => {
      const resolved =
        typeof nextValue === "function"
          ? nextValue(currentValue)
          : nextValue;

      setStorage(key, resolved);
      return resolved;
    });
  }, [key]);

  return [value, updateValue];
}
