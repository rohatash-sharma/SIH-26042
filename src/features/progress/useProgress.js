import { useCallback, useEffect, useMemo, useState } from "react";
import { getStudentProgress, saveProgress, getProgressSummary } from "./progressService";

export function useProgress(studentId) {
  const [records, setRecords] = useState([]);
  const [loading, setLoading] = useState(Boolean(studentId));
  const [error, setError] = useState("");

  const loadProgress = useCallback(async () => {
    if (!studentId) {
      setRecords([]);
      setLoading(false);
      return [];
    }

    setLoading(true);
    setError("");

    try {
      const next = await getStudentProgress(studentId);
      setRecords(next);
      return next;
    } catch (err) {
      setError(err?.message || "Unable to load progress.");
      return [];
    } finally {
      setLoading(false);
    }
  }, [studentId]);

  useEffect(() => {
    loadProgress();
  }, [loadProgress]);

  const addProgress = useCallback(
    async (record) => {
      await saveProgress({ ...record, studentId });
      await loadProgress();
    },
    [studentId, loadProgress],
  );

  const summary = useMemo(() => getProgressSummary(records), [records]);

  return {
    records,
    summary,
    loading,
    error,
    refresh: loadProgress,
    addProgress,
  };
}
