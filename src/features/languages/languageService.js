import { getStorage, setStorage, removeStorage } from "../../services/storageService";
import { LANGUAGES } from "../../data/languages/languages";

const INTERFACE_LANGUAGE_KEY = "interfaceLanguage";
const LEARNING_LANGUAGE_KEY = "learningLanguage";
const TEACHER_LANGUAGES_KEY = "teacherLanguages";

const supportedCodes = LANGUAGES.map((language) => language.code);

export function getSupportedLanguages() {
  return LANGUAGES;
}

export function isSupportedLanguage(code) {
  return supportedCodes.includes(code);
}

export function getInterfaceLanguage() {
  const stored = getStorage(INTERFACE_LANGUAGE_KEY, "en");
  return isSupportedLanguage(stored) ? stored : "en";
}

export function setInterfaceLanguage(code) {
  if (!isSupportedLanguage(code)) throw new Error(`Unsupported language: ${code}`);
  setStorage(INTERFACE_LANGUAGE_KEY, code);
  return code;
}

export function getLearningLanguage() {
  const stored = getStorage(LEARNING_LANGUAGE_KEY, "en");
  return isSupportedLanguage(stored) ? stored : "en";
}

export function setLearningLanguage(code) {
  if (!isSupportedLanguage(code)) throw new Error(`Unsupported language: ${code}`);
  setStorage(LEARNING_LANGUAGE_KEY, code);
  return code;
}

export function getTeacherLanguages() {
  const stored = getStorage(TEACHER_LANGUAGES_KEY, supportedCodes);
  return Array.isArray(stored)
    ? stored.filter(isSupportedLanguage)
    : supportedCodes;
}

export function setTeacherLanguages(codes) {
  if (!Array.isArray(codes) || codes.length === 0) {
    throw new Error("At least one language must be enabled.");
  }

  const validCodes = [...new Set(codes)].filter(isSupportedLanguage);
  if (validCodes.length === 0) {
    throw new Error("No supported languages were selected.");
  }

  setStorage(TEACHER_LANGUAGES_KEY, validCodes);
  return validCodes;
}

export function resetLanguagePreferences() {
  removeStorage(INTERFACE_LANGUAGE_KEY);
  removeStorage(LEARNING_LANGUAGE_KEY);
  removeStorage(TEACHER_LANGUAGES_KEY);
}

export function resolveTranslation(value, language = getLearningLanguage()) {
  if (!value) return "";

  if (typeof value === "string") return value;

  if (typeof value !== "object") return "";

  return (
    value[language] ??
    value.en ??
    Object.values(value).find(
      (translation) => typeof translation === "string" && translation.trim(),
    ) ??
    ""
  );
}
