import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "../../components/layout";
import LessonDetail from "./LessonDetail";
import LessonEditor from "./LessonEditor";
import LessonViewer from "./LessonViewer";
import LessonsDashboard from "./LessonsDashboard";

export default function LessonRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedLayout requiredRole="teacher" />}>
        <Route index element={<LessonsDashboard mode="teacher" />} />
        <Route path="new" element={<LessonEditor />} />
        <Route path=":lessonId" element={<LessonDetail />} />
        <Route path=":lessonId/edit" element={<LessonEditor />} />
      </Route>

      <Route path="*" element={<Navigate to="/teacher/lessons" replace />} />
    </Routes>
  );
}

export function StudentLessonRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedLayout requiredRole="student" />}>
        <Route index element={<LessonsDashboard mode="student" />} />
        <Route path=":lessonId" element={<LessonViewer />} />
      </Route>

      <Route path="*" element={<Navigate to="/student/learn" replace />} />
    </Routes>
  );
}
