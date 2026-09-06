import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "../../components/layout";
import TeacherLanguageSettings from "./TeacherLanguageSettings";
import StudentLanguageSettings from "./StudentLanguageSettings";

export default function LanguageRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedLayout requiredRole="teacher" />}>
        <Route path="/teacher/languages" element={<TeacherLanguageSettings />} />
      </Route>

      <Route element={<ProtectedLayout requiredRole="student" />}>
        <Route
          path="/student/languages"
          element={<StudentLanguageSettings />}
        />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
