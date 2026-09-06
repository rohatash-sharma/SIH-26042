import db from "../../db/database";

export async function getFlashcardSets(filters = {}) {
  let sets = await db.flashcards.toArray();

  return sets.filter((set) => {
    if (filters.chapterId && set.chapterId !== filters.chapterId) return false;
    if (filters.subjectId && set.subjectId !== filters.subjectId) return false;
    if (filters.grade !== undefined && Number(set.grade) !== Number(filters.grade)) {
      return false;
    }
    return true;
  });
}

export async function getFlashcardSetById(id) {
  return db.flashcards.get(id);
}

export async function saveFlashcardSet(set) {
  if (!set?.id) {
    throw new Error("Flashcard set id is required.");
  }

  await db.flashcards.put(set);
  return set;
}

export async function deleteFlashcardSet(id) {
  await db.flashcards.delete(id);
}

export async function countFlashcardSets(filters = {}) {
  return (await getFlashcardSets(filters)).length;
}

export async function saveFlashcardProgress({
  studentId,
  flashcardSetId,
  reviewedCards = 0,
  totalCards = 0,
  knownCards = 0,
}) {
  const progress = {
    id: `progress_flashcards_${studentId}_${flashcardSetId}_${Date.now()}`,
    studentId,
    activityId: flashcardSetId,
    type: "flashcards",
    score: knownCards,
    total: totalCards,
    reviewedCards,
    knownCards,
    completedAt: new Date().toISOString(),
  };

  await db.progress.put(progress);
  return progress;
}

export async function getFlashcardProgress(studentId, flashcardSetId = null) {
  const progress = await db.progress
    .where("studentId")
    .equals(studentId)
    .toArray();

  return progress.filter(
    (item) =>
      item.type === "flashcards" &&
      (!flashcardSetId || item.activityId === flashcardSetId),
  );
}
