import { useCallback, useEffect, useState } from "react";
import {
  deleteFlashcardSet,
  getFlashcardProgress,
  getFlashcardSetById,
  getFlashcardSets,
  saveFlashcardProgress,
  saveFlashcardSet,
} from "./flashcardService";

export function useFlashcardSets(filters = {}) {
  const [sets, setSets] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setSets(await getFlashcardSets(filters));
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [filters.grade, filters.subjectId, filters.chapterId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { sets, isLoading, error, refresh };
}

export function useFlashcardSet(id) {
  const [set, setSet] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!id) {
      setSet(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      setSet((await getFlashcardSetById(id)) || null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { set, isLoading, error, refresh };
}

export function useFlashcardActions() {
  const [isSaving, setIsSaving] = useState(false);

  const createOrUpdateSet = useCallback(async (set) => {
    setIsSaving(true);
    try {
      return await saveFlashcardSet(set);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const removeSet = useCallback(async (id) => {
    setIsSaving(true);
    try {
      await deleteFlashcardSet(id);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const saveProgress = useCallback(async (progress) => {
    setIsSaving(true);
    try {
      return await saveFlashcardProgress(progress);
    } finally {
      setIsSaving(false);
    }
  }, []);

  return { createOrUpdateSet, removeSet, saveProgress, isSaving };
}

export function useFlashcardProgress(studentId, flashcardSetId = null) {
  const [progress, setProgress] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean(studentId));

  const refresh = useCallback(async () => {
    if (!studentId) {
      setProgress([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      setProgress(await getFlashcardProgress(studentId, flashcardSetId));
    } finally {
      setIsLoading(false);
    }
  }, [studentId, flashcardSetId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { progress, isLoading, refresh };
}
