# SIH 26042 — Progress Module

The Progress module provides local learning-progress persistence and analytics
for lessons, quizzes, and flashcard revision.

## Responsibilities

```text
Lessons ────────┐
Quizzes ────────┼──> progress table ──> Progress Services ──> UI
Flashcards ─────┘
```

The module does not own lesson, quiz, or flashcard definitions. Those feature
modules create progress records when a student completes an activity.

## Progress record

The module works with the existing Dexie `progress` table:

```js
{
  id: "progress_001",
  studentId: "student_001",
  activityId: "quiz_water_01",
  type: "quiz",
  score: 8,
  total: 10,
  completedAt: "2026-09-05T18:30:00Z"
}
```

Additional fields such as `title`, `answers`, `reviewedCards`, and
`knownCards` are allowed because the Dexie table stores objects.

## Supported activity types

- `lesson`
- `quiz`
- `flashcards`

## Student features

`/student/progress`

- Lessons completed
- Quizzes completed
- Flashcard sets completed
- Average score
- Recent activity history
- Empty state before the first activity

## Teacher features

`/teacher/progress`

- Student list from local IndexedDB
- Completed activity count per student
- Average score per student
- Local-storage privacy note

## API

### Read

```js
getStudentProgress(studentId)
getActivityProgress(studentId, activityId)
getProgressByType(studentId, type)
```

### Write

```js
saveProgress(record)
deleteProgress(progressId)
clearStudentProgress(studentId)
```

### Analytics

```js
calculateScorePercentage(score, total)
calculateAverageScore(records)
getProgressSummary(records)
getLatestProgress(records, limit)
```

## React hook

```js
const {
  records,
  summary,
  loading,
  error,
  refresh,
  addProgress,
} = useProgress(studentId);
```

## Integration with existing modules

### Lessons

When a student finishes a lesson:

```js
await saveProgress({
  id: `progress_${studentId}_${lessonId}`,
  studentId,
  activityId: lessonId,
  type: "lesson",
  title: lesson.title?.en,
  score: 1,
  total: 1,
});
```

### Quizzes

The existing quiz module can store:

```js
await saveProgress({
  id: `progress_${studentId}_${quizId}_${Date.now()}`,
  studentId,
  activityId: quizId,
  type: "quiz",
  title: quiz.title?.en,
  score,
  total: quiz.questions.length,
  answers,
});
```

### Flashcards

The existing flashcard module can store:

```js
await saveProgress({
  id: `progress_${studentId}_${flashcardId}_${Date.now()}`,
  studentId,
  activityId: flashcardId,
  type: "flashcards",
  title: flashcardSet.title?.en,
  score: knownCards,
  total: cards.length,
  reviewedCards,
  knownCards,
});
```

## Offline architecture

No API request is made.

```text
Student action
     ↓
Feature module
     ↓
progressService
     ↓
Dexie / IndexedDB
     ↓
Progress UI
```

This makes progress available even when the device has no internet
connection.

## Important integration note

The teacher analytics page reads student profiles from the existing `users`
table. If student setup stores a different profile ID, pass that exact ID
into the progress record's `studentId`.

The module is intentionally CSS-free. Styling should be added later through
the project's single unified stylesheet.
