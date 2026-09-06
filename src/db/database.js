import Dexie from "dexie";

const db = new Dexie("SIH26042Database");

db.version(2).stores({
  users: "id, role, language",
  subjects: "id, grade",
  chapters: "id, subjectId, grade",
  lessons: "id, chapterId, subjectId, grade",
  quizzes: "id, chapterId, subjectId, grade",
  flashcards: "id, chapterId, subjectId, grade",
  progress:
    "id, studentId, activityId, type, completedAt, [studentId+activityId], [studentId+type]",
});

export default db;
export { db };
