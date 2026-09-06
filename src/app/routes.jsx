import { Navigate, Route, Routes } from "react-router-dom";

import {
  ProtectedAuthRedirect,
  RoleSelection,
  StudentSetup,
  TeacherSetup,
  WelcomePage,
} from "../features/auth";

import {
  TeacherDashboard,
  TeacherClassroom,
  TeacherContentLibrary,
  TeacherSettings,
} from "../features/teacher";

import {
  StudentDashboard,
  StudentSubjects,
  StudentRevision,
  StudentProfile,
  StudentSettings,
} from "../features/student";

import {
  LessonRoutes,
  StudentLessonRoutes,
} from "../features/lessons";

import {
  QuizRoutes,
  StudentQuizRoutes,
} from "../features/quizzes";

import {
  FlashcardRoutes,
  StudentFlashcardRoutes,
} from "../features/flashcards";

import {
  TeacherLanguageSettings,
  StudentLanguageSettings,
} from "../features/languages";

import {
  StudentProgressPage,
  TeacherProgressPage,
} from "../features/progress";

import ProtectedLayout from "../components/layout/ProtectedLayout";
import StudentSubjectHub from "../features/student/StudentSubjectHub";
import SettingsRedirect from "../features/common/SettingsRedirect";

function RoleFeatureRedirect({ feature }) {
  return <Navigate to={`/${feature}`} replace />;
}

function NotFoundPage() {
  return (
    <main className="not-found-page">
      <h1>Page not found</h1>
      <p>The page you are looking for does not exist.</p>
      <a href="/">Return home</a>
    </main>
  );
}

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedAuthRedirect />}>
        {/* Public / local-profile setup */}
        <Route path="/" element={<WelcomePage />} />
        <Route path="/auth/role" element={<RoleSelection />} />
        <Route path="/auth/teacher-setup" element={<TeacherSetup />} />
        <Route path="/auth/student-setup" element={<StudentSetup />} />

        {/* Teacher */}
        <Route element={<ProtectedLayout requiredRole="teacher" />}>
          <Route path="/teacher" element={<TeacherDashboard />} />
          <Route path="/teacher/content" element={<TeacherContentLibrary />} />
          <Route path="/teacher/classroom" element={<TeacherClassroom />} />
          <Route path="/teacher/progress" element={<TeacherProgressPage />} />
          <Route path="/teacher/languages" element={<TeacherLanguageSettings />} />
          <Route path="/teacher/settings" element={<TeacherSettings />} />
        </Route>

        {/* Teacher content feature routers own their protected layout. */}
        <Route path="/teacher/lessons/*" element={<LessonRoutes />} />
        <Route path="/teacher/quizzes/*" element={<QuizRoutes />} />
        <Route path="/teacher/flashcards/*" element={<FlashcardRoutes />} />

        {/* Student */}
        <Route element={<ProtectedLayout requiredRole="student" />}>
          <Route path="/student" element={<StudentDashboard />} />
          <Route path="/student/subjects" element={<StudentSubjects />} />
          <Route
            path="/student/subjects/:subjectId"
            element={<StudentSubjectHub />}
          />
          <Route path="/student/learn" element={<StudentLearnRedirect />} />
          <Route path="/student/revision" element={<StudentRevision />} />
          <Route path="/student/progress" element={<StudentProgressPage />} />
          <Route path="/student/profile" element={<StudentProfile />} />
          <Route path="/student/settings" element={<StudentSettings />} />
          <Route path="/student/languages" element={<StudentLanguageSettings />} />
        </Route>

        {/* Student content feature routers own their protected layout. */}
        <Route path="/student/lessons/*" element={<StudentLessonRoutes />} />
        <Route path="/student/quizzes/*" element={<StudentQuizRoutes />} />
        <Route
          path="/student/flashcards/*"
          element={<StudentFlashcardRoutes />}
        />

        {/* Generic shortcuts from shared navigation. */}
        <Route
          path="/quizzes"
          element={<RoleFeatureRedirect feature="student/quizzes" />}
        />
        <Route
          path="/flashcards"
          element={<RoleFeatureRedirect feature="student/flashcards" />}
        />
        <Route path="/settings" element={<SettingsRedirect />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  );
}

function StudentLearnRedirect() {
  return <Navigate to="/student/lessons" replace />;
}
