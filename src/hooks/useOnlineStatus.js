import { useEffect, useState } from "react";
import { isOnline, onConnectivityChange } from "../services/offlineService";

export function useOnlineStatus() {
  const [online, setOnline] = useState(isOnline());

  useEffect(() => onConnectivityChange(setOnline), []);

  return online;
}
