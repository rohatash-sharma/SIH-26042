import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "../../components/layout";
import TeacherClassroom from "./TeacherClassroom";
import TeacherContentLibrary from "./TeacherContentLibrary";
import TeacherDashboard from "./TeacherDashboard";
import TeacherProgress from "./TeacherProgress";
import TeacherSettings from "./TeacherSettings";

export default function TeacherRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedLayout requiredRole="teacher" />}>
        <Route index element={<TeacherDashboard />} />
        <Route path="content" element={<TeacherContentLibrary />} />
        <Route path="classroom" element={<TeacherClassroom />} />
        <Route path="progress" element={<TeacherProgress />} />
        <Route path="settings" element={<TeacherSettings />} />

        <Route path="lessons/new" element={<TeacherFeaturePlaceholder title="Create Lesson" />} />
        <Route path="quizzes/new" element={<TeacherFeaturePlaceholder title="Create Quiz" />} />
        <Route path="flashcards/new" element={<TeacherFeaturePlaceholder title="Create Flashcards" />} />
        <Route path="languages" element={<TeacherFeaturePlaceholder title="Manage Languages" />} />
        <Route path="classroom/add-student" element={<TeacherFeaturePlaceholder title="Add Student" />} />
      </Route>

      <Route path="*" element={<Navigate to="/teacher" replace />} />
    </Routes>
  );
}

function TeacherFeaturePlaceholder({ title }) {
  return (
    <main className="teacher-feature-placeholder">
      <h1>{title}</h1>
      <p>This feature module will be connected here next.</p>
    </main>
  );
}
