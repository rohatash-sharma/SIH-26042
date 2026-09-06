import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "../../components/layout";
import QuizzesDashboard from "./QuizzesDashboard";
import QuizDetail from "./QuizDetail";
import QuizEditor from "./QuizEditor";
import QuizPlayer from "./QuizPlayer";
import QuizResultHistory from "./QuizResult";

export default function QuizRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedLayout requiredRole="teacher" />}>
        <Route index element={<QuizzesDashboard mode="teacher" />} />
        <Route path="new" element={<QuizEditor />} />
        <Route path=":quizId" element={<QuizDetail />} />
        <Route path=":quizId/edit" element={<QuizEditor />} />
      </Route>

      <Route path="*" element={<Navigate to="/teacher/quizzes" replace />} />
    </Routes>
  );
}

export function StudentQuizRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedLayout requiredRole="student" />}>
        <Route index element={<QuizzesDashboard mode="student" />} />
        <Route path=":quizId" element={<QuizPlayer />} />
        <Route path=":quizId/results" element={<QuizResultHistory />} />
      </Route>

      <Route path="*" element={<Navigate to="/student/quizzes" replace />} />
    </Routes>
  );
}
