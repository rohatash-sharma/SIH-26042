import { useCallback, useEffect, useState } from "react";
import {
  deleteQuiz,
  getQuizById,
  getQuizzes,
  getQuizResults,
  saveQuiz,
  saveQuizResult,
} from "./quizService";

export function useQuizzes(filters = {}) {
  const [quizzes, setQuizzes] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    setIsLoading(true);
    setError(null);

    try {
      setQuizzes(await getQuizzes(filters));
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [filters.grade, filters.subjectId, filters.chapterId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { quizzes, isLoading, error, refresh };
}

export function useQuiz(id) {
  const [quiz, setQuiz] = useState(null);
  const [isLoading, setIsLoading] = useState(Boolean(id));
  const [error, setError] = useState(null);

  const refresh = useCallback(async () => {
    if (!id) {
      setQuiz(null);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    setError(null);

    try {
      setQuiz((await getQuizById(id)) || null);
    } catch (err) {
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, [id]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { quiz, isLoading, error, refresh };
}

export function useQuizActions() {
  const [isSaving, setIsSaving] = useState(false);

  const createOrUpdateQuiz = useCallback(async (quiz) => {
    setIsSaving(true);
    try {
      return await saveQuiz(quiz);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const removeQuiz = useCallback(async (id) => {
    setIsSaving(true);
    try {
      await deleteQuiz(id);
    } finally {
      setIsSaving(false);
    }
  }, []);

  const submitResult = useCallback(async (result) => {
    setIsSaving(true);
    try {
      return await saveQuizResult(result);
    } finally {
      setIsSaving(false);
    }
  }, []);

  return {
    createOrUpdateQuiz,
    removeQuiz,
    submitResult,
    isSaving,
  };
}

export function useQuizResults(studentId, quizId = null) {
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(Boolean(studentId));

  const refresh = useCallback(async () => {
    if (!studentId) {
      setResults([]);
      setIsLoading(false);
      return;
    }

    setIsLoading(true);
    try {
      setResults(await getQuizResults(studentId, quizId));
    } finally {
      setIsLoading(false);
    }
  }, [studentId, quizId]);

  useEffect(() => {
    refresh();
  }, [refresh]);

  return { results, isLoading, refresh };
}
