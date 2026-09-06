import { useCallback, useEffect, useState } from "react";
import {
  countLessons,
  deleteLesson,
  getLessonById,
  getLessons,
  saveLesson,
} from "./lessonService";

export function useLessons(filters = {}) {
  const [lessons, setLessons] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setLessons(await getLessons(filters));
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [filters.grade, filters.subjectId, filters.chapterId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { lessons, isLoading, error, refresh };
}

export function useLesson(id) {
  const [lesson, setLesson] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!id) {
      setLesson(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      setLesson((await getLessonById(id)) || null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { lesson, isLoading, error, refresh };
}

export function useLessonActions() {
  const [isSaving, setIsSaving] = useState(false);

  const createOrUpdateLesson = useCallback(async (lesson) => {
    setIsSaving(true);
    try {
      return await saveLesson(lesson);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const removeLesson = useCallback(async (id) => {
    setIsSaving(true);
    try {
      await deleteLesson(id);
    } finally {
      setIsSaving(false);
    }
  }, []);

  return { createOrUpdateLesson, removeLesson, isSaving };
}

export async function getLessonCount(filters = {}) {
  return countLessons(filters);
}
