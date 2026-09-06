export { default as FlashcardsDashboard } from "./FlashcardsDashboard";
export { default as FlashcardPlayer } from "./FlashcardPlayer";
export { default as FlashcardEditor } from "./FlashcardEditor";
export { default as FlashcardDetail } from "./FlashcardDetail";
export {
  default as FlashcardRoutes,
  StudentFlashcardRoutes,
} from "./flashcardRoutes";

export {
  getFlashcardSets,
  getFlashcardSetById,
  saveFlashcardSet,
  deleteFlashcardSet,
  countFlashcardSets,
  saveFlashcardProgress,
  getFlashcardProgress,
} from "./flashcardService";

export {
  useFlashcardSets,
  useFlashcardSet,
  useFlashcardActions,
  useFlashcardProgress,
} from "./useFlashcards";
