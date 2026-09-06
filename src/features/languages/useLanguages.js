import { useCallback, useMemo, useState } from "react";
import {
  getInterfaceLanguage,
  getLearningLanguage,
  getSupportedLanguages,
  getTeacherLanguages,
  resolveTranslation,
  setInterfaceLanguage,
  setLearningLanguage,
  setTeacherLanguages,
} from "./languageService";

export function useLanguages() {
  const [interfaceLanguage, setInterfaceLanguageState] = useState(
    getInterfaceLanguage(),
  );
  const [learningLanguage, setLearningLanguageState] = useState(
    getLearningLanguage(),
  );
  const [teacherLanguages, setTeacherLanguagesState] = useState(
    getTeacherLanguages(),
  );

  const languages = useMemo(() => getSupportedLanguages(), []);

  const updateInterfaceLanguage = useCallback((code) => {
    const next = setInterfaceLanguage(code);
    setInterfaceLanguageState(next);
    return next;
  }, []);

  const updateLearningLanguage = useCallback((code) => {
    const next = setLearningLanguage(code);
    setLearningLanguageState(next);
    return next;
  }, []);

  const updateTeacherLanguages = useCallback((codes) => {
    const next = setTeacherLanguages(codes);
    setTeacherLanguagesState(next);
    return next;
  }, []);

  return {
    languages,
    interfaceLanguage,
    learningLanguage,
    teacherLanguages,
    updateInterfaceLanguage,
    updateLearningLanguage,
    updateTeacherLanguages,
    resolveTranslation,
  };
}
