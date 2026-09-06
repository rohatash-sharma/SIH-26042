export { default as QuizzesDashboard } from "./QuizzesDashboard";
export { default as QuizEditor } from "./QuizEditor";
export { default as QuizDetail } from "./QuizDetail";
export { default as QuizPlayer } from "./QuizPlayer";
export { default as QuizResultHistory } from "./QuizResult";
export { default as QuizRoutes, StudentQuizRoutes } from "./quizRoutes";

export {
  getQuizzes,
  getQuizById,
  saveQuiz,
  deleteQuiz,
  countQuizzes,
  saveQuizResult,
  getQuizResults,
} from "./quizService";

export {
  useQuizzes,
  useQuiz,
  useQuizActions,
  useQuizResults,
} from "./useQuizzes";
