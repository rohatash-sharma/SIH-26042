import db from "../../db/database";

export async function getStudentProgress(studentId) {
  if (!studentId) return [];
  return db.progress.where("studentId").equals(studentId).reverse().sortBy("completedAt");
}

export async function getActivityProgress(studentId, activityId) {
  if (!studentId || !activityId) return [];
  return db.progress
    .where("[studentId+activityId]")
    .equals([studentId, activityId])
    .toArray();
}

export async function getProgressByType(studentId, type) {
  if (!studentId || !type) return [];
  return db.progress
    .where("[studentId+type]")
    .equals([studentId, type])
    .toArray();
}

export async function saveProgress(record) {
  if (!record?.id) throw new Error("Progress record requires an id.");
  if (!record.studentId) throw new Error("Progress record requires a studentId.");
  if (!record.activityId) throw new Error("Progress record requires an activityId.");
  if (!record.type) throw new Error("Progress record requires a type.");

  const normalized = {
    ...record,
    completedAt: record.completedAt ?? new Date().toISOString(),
  };

  await db.progress.put(normalized);
  return normalized;
}

export async function deleteProgress(progressId) {
  if (!progressId) return;
  await db.progress.delete(progressId);
}

export async function clearStudentProgress(studentId) {
  if (!studentId) return;
  await db.progress.where("studentId").equals(studentId).delete();
}

export function calculateScorePercentage(score = 0, total = 0) {
  if (!total || total <= 0) return 0;
  return Math.round((Number(score) / Number(total)) * 100);
}

export function calculateAverageScore(records = []) {
  const scored = records.filter(
    (record) => Number.isFinite(Number(record.score)) && Number(record.total) > 0,
  );

  if (!scored.length) return 0;

  const totalScore = scored.reduce(
    (sum, record) => sum + calculateScorePercentage(record.score, record.total),
    0,
  );

  return Math.round(totalScore / scored.length);
}

export function countCompleted(records = [], type) {
  return records.filter((record) => {
    if (type && record.type !== type) return false;
    return Boolean(record.completedAt);
  }).length;
}

export function getProgressSummary(records = []) {
  return {
    totalActivities: records.length,
    lessonsCompleted: countCompleted(records, "lesson"),
    quizzesCompleted: countCompleted(records, "quiz"),
    flashcardsCompleted: countCompleted(records, "flashcards"),
    averageScore: calculateAverageScore(records),
  };
}

export function getLatestProgress(records = [], limit = 5) {
  return [...records]
    .sort(
      (a, b) =>
        new Date(b.completedAt || 0).getTime() -
        new Date(a.completedAt || 0).getTime(),
    )
    .slice(0, limit);
}
