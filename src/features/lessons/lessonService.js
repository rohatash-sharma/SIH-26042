import db from "../../db/database";

export async function getLessons(filters = {}) {
  let collection = db.lessons.toCollection();

  if (filters.grade !== undefined) {
    collection = db.lessons.where("grade").equals(Number(filters.grade));
  }

  const lessons = await collection.toArray();

  return lessons.filter((lesson) => {
    if (filters.subjectId && lesson.subjectId !== filters.subjectId) return false;
    if (filters.chapterId && lesson.chapterId !== filters.chapterId) return false;
    return true;
  });
}

export async function getLessonById(id) {
  return db.lessons.get(id);
}

export async function saveLesson(lesson) {
  if (!lesson?.id) {
    throw new Error("Lesson id is required.");
  }

  await db.lessons.put(lesson);
  return lesson;
}

export async function deleteLesson(id) {
  await db.lessons.delete(id);
}

export async function countLessons(filters = {}) {
  const lessons = await getLessons(filters);
  return lessons.length;
}
