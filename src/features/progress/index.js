export { default as ProgressOverview } from "./ProgressOverview";
export { default as StudentProgressPage } from "./StudentProgressPage";
export { default as TeacherProgressPage } from "./TeacherProgressPage";
export { default as ProgressStatCard } from "./ProgressStatCard";
export { default as ProgressRoutes } from "./progressRoutes";

export { useProgress } from "./useProgress";

export {
  getStudentProgress,
  getActivityProgress,
  getProgressByType,
  saveProgress,
  deleteProgress,
  clearStudentProgress,
  calculateScorePercentage,
  calculateAverageScore,
  countCompleted,
  getProgressSummary,
  getLatestProgress,
} from "./progressService";
