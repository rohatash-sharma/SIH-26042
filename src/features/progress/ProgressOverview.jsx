import {
  BookOpen,
  Brain,
  ClipboardCheck,
  TrendingUp,
} from "lucide-react";
import { useAuth } from "../auth";
import { useProgress } from "./useProgress";
import ProgressStatCard from "./ProgressStatCard";
import { LoadingScreen, ErrorState, EmptyState } from "../../components/common";

export default function ProgressOverview() {
  const { user } = useAuth();
  const studentId = user?.id ?? null;
  const { summary, records, loading, error } = useProgress(studentId);

  if (loading) return <LoadingScreen message="Loading your progress..." />;
  if (error) return <ErrorState message={error} />;

  return (
    <main className="progress-page">
      <header className="progress-page__header">
        <span className="eyebrow">Learning Progress</span>
        <h1>Your progress</h1>
        <p>
          A local summary of your completed learning activities on this device.
        </p>
      </header>

      <section className="progress-stats-grid">
        <ProgressStatCard
          label="Lessons"
          value={summary.lessonsCompleted}
          helper="completed"
          icon={BookOpen}
        />
        <ProgressStatCard
          label="Quizzes"
          value={summary.quizzesCompleted}
          helper="completed"
          icon={ClipboardCheck}
        />
        <ProgressStatCard
          label="Flashcards"
          value={summary.flashcardsCompleted}
          helper="completed"
          icon={Brain}
        />
        <ProgressStatCard
          label="Average score"
          value={`${summary.averageScore}%`}
          helper="across scored activities"
          icon={TrendingUp}
        />
      </section>

      {!records.length ? (
        <EmptyState
          title="No progress yet"
          description="Start a lesson, quiz, or flashcard activity and your results will appear here."
        />
      ) : (
        <section className="progress-history">
          <div className="progress-section-heading">
            <div>
              <h2>Recent activity</h2>
              <p>Your latest completed activities stored on this device.</p>
            </div>
          </div>

          <div className="progress-history__list">
            {records.slice(0, 8).map((record) => (
              <article className="progress-history-item" key={record.id}>
                <div>
                  <strong>{record.title || record.activityId}</strong>
                  <span>{record.type}</span>
                </div>
                <div className="progress-history-item__result">
                  {record.total
                    ? `${record.score ?? 0}/${record.total}`
                    : "Completed"}
                </div>
                <time dateTime={record.completedAt}>
                  {new Date(record.completedAt).toLocaleDateString()}
                </time>
              </article>
            ))}
          </div>
        </section>
      )}
    </main>
  );
}
