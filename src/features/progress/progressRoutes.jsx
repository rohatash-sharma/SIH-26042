import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "../../components/layout";
import StudentProgressPage from "./StudentProgressPage";
import TeacherProgressPage from "./TeacherProgressPage";

export default function ProgressRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedLayout requiredRole="student" />}>
        <Route path="/student/progress" element={<StudentProgressPage />} />
      </Route>

      <Route element={<ProtectedLayout requiredRole="teacher" />}>
        <Route path="/teacher/progress" element={<TeacherProgressPage />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
