import {
  CheckCircle2,
  ClipboardList,
  Filter,
  Plus,
  Search,
  Trophy,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  SearchBar,
  Select,
  Spinner,
} from "../../components/ui";
import { Grid, PageContainer } from "../../components/layout";
import { useQuizzes } from "./useQuizzes";

const gradeOptions = [
  { value: "", label: "All grades" },
  { value: "3", label: "Grade 3" },
  { value: "4", label: "Grade 4" },
  { value: "5", label: "Grade 5" },
];

export default function QuizzesDashboard({ mode = "teacher" }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("");

  const filters = useMemo(
    () => ({ grade: grade ? Number(grade) : undefined }),
    [grade],
  );

  const { quizzes, isLoading, error } = useQuizzes(filters);

  const visibleQuizzes = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return quizzes;

    return quizzes.filter((quiz) => {
      const title = Object.values(quiz.title || {}).join(" ").toLowerCase();
      return title.includes(normalizedQuery);
    });
  }, [quizzes, query]);

  return (
    <PageContainer
      title="Quizzes"
      description={
        mode === "teacher"
          ? "Create and manage quizzes stored on this device."
          : "Test what you have learned and practise your skills."
      }
      action={
        mode === "teacher" ? (
          <Button
            leftIcon={<Plus size={18} />}
            onClick={() => navigate("/teacher/quizzes/new")}
          >
            Create quiz
          </Button>
        ) : null
      }
    >
      <section className="quizzes-dashboard__toolbar">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search quizzes..."
          icon={<Search size={18} />}
        />

        <Select
          value={grade}
          onChange={(event) => setGrade(event.target.value)}
          options={gradeOptions}
          aria-label="Filter quizzes by grade"
        />

        <div className="quizzes-dashboard__filter-label">
          <Filter size={18} />
          <span>{visibleQuizzes.length} quiz(zes)</span>
        </div>
      </section>

      {isLoading ? (
        <Card padding="lg">
          <div className="quizzes-dashboard__loading">
            <Spinner />
            <span>Loading quizzes...</span>
          </div>
        </Card>
      ) : error ? (
        <Card padding="lg">
          <EmptyState
            icon={<ClipboardList size={34} />}
            title="Unable to load quizzes"
            description="The local quiz store could not be read."
          />
        </Card>
      ) : visibleQuizzes.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<ClipboardList size={36} />}
            title={query ? "No matching quizzes" : "No quizzes available"}
            description={
              query
                ? "Try a different search term."
                : mode === "teacher"
                  ? "Create your first quiz to start assessing learners."
                  : "Ask your teacher to add quizzes to this device."
            }
            action={
              mode === "teacher" && !query ? (
                <Button
                  leftIcon={<Plus size={18} />}
                  onClick={() => navigate("/teacher/quizzes/new")}
                >
                  Create quiz
                </Button>
              ) : null
            }
          />
        </Card>
      ) : (
        <Grid columns={2}>
          {visibleQuizzes.map((quiz) => (
            <QuizCard
              key={quiz.id}
              quiz={quiz}
              mode={mode}
              onOpen={() =>
                navigate(
                  mode === "teacher"
                    ? `/teacher/quizzes/${quiz.id}`
                    : `/student/quizzes/${quiz.id}`,
                )
              }
            />
          ))}
        </Grid>
      )}
    </PageContainer>
  );
}

function QuizCard({ quiz, mode, onOpen }) {
  const title =
    quiz.title?.[quiz.defaultLanguage || "en"] ||
    quiz.title?.en ||
    Object.values(quiz.title || {})[0] ||
    "Untitled quiz";

  const questionCount = Array.isArray(quiz.questions)
    ? quiz.questions.length
    : 0;

  return (
    <Card className="quiz-card" padding="lg" onClick={onOpen}>
      <div className="quiz-card__top">
        <div className="quiz-card__icon">
          <ClipboardList size={26} />
        </div>
        <Badge>{quiz.subjectId || "Quiz"}</Badge>
      </div>

      <h2>{title}</h2>
      <p>{quiz.description || "Test your knowledge with this quiz."}</p>

      <div className="quiz-card__meta">
        <span>
          <CheckCircle2 size={16} />
          {questionCount} question{questionCount === 1 ? "" : "s"}
        </span>
        {quiz.passingScore ? (
          <span>
            <Trophy size={16} />
            Pass: {quiz.passingScore}%
          </span>
        ) : null}
      </div>

      <div className="quiz-card__footer">
        <span>{mode === "teacher" ? "Open quiz" : "Start quiz"}</span>
        <span aria-hidden="true">→</span>
      </div>
    </Card>
  );
}
