export { default as LanguageSettings } from "./LanguageSettings";
export { default as TeacherLanguageSettings } from "./TeacherLanguageSettings";
export { default as StudentLanguageSettings } from "./StudentLanguageSettings";
export { default as LanguageSelector } from "./LanguageSelector";
export { default as TranslationText } from "./TranslationText";
export { default as LanguageRoutes } from "./languageRoutes";

export { useLanguages } from "./useLanguages";

export {
  getSupportedLanguages,
  isSupportedLanguage,
  getInterfaceLanguage,
  setInterfaceLanguage,
  getLearningLanguage,
  setLearningLanguage,
  getTeacherLanguages,
  setTeacherLanguages,
  resetLanguagePreferences,
  resolveTranslation,
} from "./languageService";
