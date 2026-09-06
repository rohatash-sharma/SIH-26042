import { Navigate, Route, Routes } from "react-router-dom";
import { ProtectedLayout } from "../../components/layout";
import FlashcardsDashboard from "./FlashcardsDashboard";
import FlashcardDetail from "./FlashcardDetail";
import FlashcardEditor from "./FlashcardEditor";
import FlashcardPlayer from "./FlashcardPlayer";

export default function FlashcardRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedLayout requiredRole="teacher" />}>
        <Route index element={<FlashcardsDashboard mode="teacher" />} />
        <Route path="new" element={<FlashcardEditor />} />
        <Route path=":setId" element={<FlashcardDetail />} />
        <Route path=":setId/edit" element={<FlashcardEditor />} />
      </Route>

      <Route path="*" element={<Navigate to="/teacher/flashcards" replace />} />
    </Routes>
  );
}

export function StudentFlashcardRoutes() {
  return (
    <Routes>
      <Route element={<ProtectedLayout requiredRole="student" />}>
        <Route index element={<FlashcardsDashboard mode="student" />} />
        <Route path=":setId" element={<FlashcardPlayer />} />
      </Route>

      <Route path="*" element={<Navigate to="/student/flashcards" replace />} />
    </Routes>
  );
}
