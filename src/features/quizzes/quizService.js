import db from "../../db/database";

export async function getQuizzes(filters = {}) {
  let quizzes;

  if (filters.grade !== undefined) {
    quizzes = await db.quizzes.where("grade").equals(Number(filters.grade)).toArray();
  } else {
    quizzes = await db.quizzes.toArray();
  }

  return quizzes.filter((quiz) => {
    if (filters.subjectId && quiz.subjectId !== filters.subjectId) return false;
    if (filters.chapterId && quiz.chapterId !== filters.chapterId) return false;
    return true;
  });
}

export async function getQuizById(id) {
  return db.quizzes.get(id);
}

export async function saveQuiz(quiz) {
  if (!quiz?.id) {
    throw new Error("Quiz id is required.");
  }

  await db.quizzes.put(quiz);
  return quiz;
}

export async function deleteQuiz(id) {
  await db.quizzes.delete(id);
}

export async function countQuizzes(filters = {}) {
  return (await getQuizzes(filters)).length;
}

export async function saveQuizResult({
  studentId,
  quizId,
  score,
  total,
  answers = {},
}) {
  const result = {
    id: `progress_quiz_${studentId}_${quizId}_${Date.now()}`,
    studentId,
    activityId: quizId,
    type: "quiz",
    score,
    total,
    answers,
    completedAt: new Date().toISOString(),
  };

  await db.progress.put(result);
  return result;
}

export async function getQuizResults(studentId, quizId = null) {
  const results = await db.progress
    .where("studentId")
    .equals(studentId)
    .toArray();

  return results.filter(
    (result) =>
      result.type === "quiz" && (!quizId || result.activityId === quizId),
  );
}
