import {
  BookOpen,
  ChevronRight,
  Clock3,
  Filter,
  Languages,
  Plus,
  Search,
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
import { PageContainer, Grid, SectionHeader } from "../../components/layout";
import { useLessons } from "./useLessons";

const gradeOptions = [
  { value: "", label: "All grades" },
  { value: "3", label: "Grade 3" },
  { value: "4", label: "Grade 4" },
  { value: "5", label: "Grade 5" },
];

export default function LessonsDashboard({ mode = "teacher" }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("");

  const filters = useMemo(
    () => ({ grade: grade ? Number(grade) : undefined }),
    [grade],
  );

  const { lessons, isLoading, error } = useLessons(filters);

  const visibleLessons = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return lessons;

    return lessons.filter((lesson) => {
      const title = Object.values(lesson.title || {}).join(" ").toLowerCase();
      return title.includes(normalizedQuery);
    });
  }, [lessons, query]);

  const openLesson = (lesson) => {
    navigate(
      mode === "teacher"
        ? `/teacher/lessons/${lesson.id}`
        : `/student/lessons/${lesson.id}`,
    );
  };

  return (
    <PageContainer
      title="Lessons"
      description={
        mode === "teacher"
          ? "Create and manage lessons stored on this device."
          : "Choose a lesson and learn at your own pace."
      }
      action={
        mode === "teacher" ? (
          <Button
            leftIcon={<Plus size={18} />}
            onClick={() => navigate("/teacher/lessons/new")}
          >
            Create lesson
          </Button>
        ) : null
      }
    >
      <section className="lessons-dashboard__toolbar">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search lessons..."
          icon={<Search size={18} />}
        />

        <Select
          value={grade}
          onChange={(event) => setGrade(event.target.value)}
          options={gradeOptions}
          aria-label="Filter lessons by grade"
        />

        <div className="lessons-dashboard__filter-label">
          <Filter size={18} />
          <span>{visibleLessons.length} lesson(s)</span>
        </div>
      </section>

      {isLoading ? (
        <Card padding="lg">
          <div className="lessons-dashboard__loading">
            <Spinner />
            <span>Loading lessons...</span>
          </div>
        </Card>
      ) : error ? (
        <Card padding="lg">
          <EmptyState
            icon={<BookOpen size={34} />}
            title="Unable to load lessons"
            description="The local lesson store could not be read."
          />
        </Card>
      ) : visibleLessons.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<BookOpen size={36} />}
            title={query ? "No matching lessons" : "No lessons available"}
            description={
              query
                ? "Try a different search term."
                : mode === "teacher"
                  ? "Create your first lesson to start building the classroom library."
                  : "Ask your teacher to add lessons to this device."
            }
            action={
              mode === "teacher" && !query ? (
                <Button
                  leftIcon={<Plus size={18} />}
                  onClick={() => navigate("/teacher/lessons/new")}
                >
                  Create lesson
                </Button>
              ) : null
            }
          />
        </Card>
      ) : (
        <Grid columns={2}>
          {visibleLessons.map((lesson) => (
            <LessonCard
              key={lesson.id}
              lesson={lesson}
              mode={mode}
              onOpen={() => openLesson(lesson)}
            />
          ))}
        </Grid>
      )}
    </PageContainer>
  );
}

function LessonCard({ lesson, mode, onOpen }) {
  const title =
    lesson.title?.[lesson.defaultLanguage || "en"] ||
    lesson.title?.en ||
    Object.values(lesson.title || {})[0] ||
    "Untitled lesson";

  const sectionCount = Array.isArray(lesson.sections)
    ? lesson.sections.length
    : 0;

  const languages = Array.isArray(lesson.languages)
    ? lesson.languages
    : Object.keys(lesson.title || {});

  return (
    <Card className="lesson-card" padding="lg" onClick={onOpen}>
      <div className="lesson-card__top">
        <div className="lesson-card__icon">
          <BookOpen size={26} />
        </div>
        <Badge>{lesson.subjectId || "Lesson"}</Badge>
      </div>

      <h2>{title}</h2>

      {lesson.description ? <p>{lesson.description}</p> : null}

      <div className="lesson-card__meta">
        <span>
          <Clock3 size={16} />
          {sectionCount} section{sectionCount === 1 ? "" : "s"}
        </span>
        <span>
          <Languages size={16} />
          {languages.length || 1} language{languages.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="lesson-card__footer">
        <span>{mode === "teacher" ? "Open lesson" : "Start learning"}</span>
        <ChevronRight size={20} />
      </div>
    </Card>
  );
}
