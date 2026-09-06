import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "../../components/layout";
import StudentDashboard from "./StudentDashboard";
import StudentSubjects from "./StudentSubjects";
import StudentLearn from "./StudentLearn";
import StudentRevision from "./StudentRevision";
import StudentProgress from "./StudentProgress";
import StudentProfile from "./StudentProfile";
import StudentSettings from "./StudentSettings";

export default function StudentRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedLayout requiredRole="student" />}>
        <Route index element={<StudentDashboard />} />
        <Route path="subjects" element={<StudentSubjects />} />
        <Route path="learn" element={<StudentLearn />} />
        <Route path="revision" element={<StudentRevision />} />
        <Route path="progress" element={<StudentProgress />} />
        <Route path="profile" element={<StudentProfile />} />
        <Route path="settings" element={<StudentSettings />} />

        <Route path="subjects/:subjectId" element={<StudentFeaturePlaceholder title="Subject" />} />
        <Route path="lessons/:lessonId" element={<StudentFeaturePlaceholder title="Lesson" />} />
        <Route path="quizzes" element={<StudentFeaturePlaceholder title="Quizzes" />} />
        <Route path="flashcards" element={<StudentFeaturePlaceholder title="Flashcards" />} />
      </Route>

      <Route path="*" element={<Navigate to="/student" replace />} />
    </Routes>
  );
}

function StudentFeaturePlaceholder({ title }) {
  return (
    <main className="student-feature-placeholder">
      <h1>{title}</h1>
      <p>This feature module will be connected here next.</p>
    </main>
  );
}
