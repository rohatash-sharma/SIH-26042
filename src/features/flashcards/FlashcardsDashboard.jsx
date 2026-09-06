import {
  Brain,
  ChevronRight,
  Filter,
  Languages,
  Layers3,
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
import { Grid, PageContainer } from "../../components/layout";
import { useFlashcardSets } from "./useFlashcards";

const gradeOptions = [
  { value: "", label: "All grades" },
  { value: "3", label: "Grade 3" },
  { value: "4", label: "Grade 4" },
  { value: "5", label: "Grade 5" },
];

export default function FlashcardsDashboard({ mode = "teacher" }) {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");
  const [grade, setGrade] = useState("");

  const filters = useMemo(
    () => ({ grade: grade ? Number(grade) : undefined }),
    [grade],
  );

  const { sets, isLoading, error } = useFlashcardSets(filters);

  const visibleSets = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return sets;

    return sets.filter((set) => {
      const title = Object.values(set.title || {}).join(" ").toLowerCase();
      return title.includes(normalizedQuery);
    });
  }, [sets, query]);

  const openSet = (set) => {
    navigate(
      mode === "teacher"
        ? `/teacher/flashcards/${set.id}`
        : `/student/flashcards/${set.id}`,
    );
  };

  return (
    <PageContainer
      title="Flashcards"
      description={
        mode === "teacher"
          ? "Create and manage flashcard sets stored on this device."
          : "Review key ideas with quick, interactive flashcards."
      }
      action={
        mode === "teacher" ? (
          <Button
            leftIcon={<Plus size={18} />}
            onClick={() => navigate("/teacher/flashcards/new")}
          >
            Create flashcards
          </Button>
        ) : null
      }
    >
      <section className="flashcards-dashboard__toolbar">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search flashcard sets..."
          icon={<Search size={18} />}
        />

        <Select
          value={grade}
          onChange={(event) => setGrade(event.target.value)}
          options={gradeOptions}
          aria-label="Filter flashcards by grade"
        />

        <div className="flashcards-dashboard__filter-label">
          <Filter size={18} />
          <span>{visibleSets.length} set(s)</span>
        </div>
      </section>

      {isLoading ? (
        <Card padding="lg">
          <div className="flashcards-dashboard__loading">
            <Spinner />
            <span>Loading flashcards...</span>
          </div>
        </Card>
      ) : error ? (
        <Card padding="lg">
          <EmptyState
            icon={<Layers3 size={34} />}
            title="Unable to load flashcards"
            description="The local flashcard store could not be read."
          />
        </Card>
      ) : visibleSets.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<Layers3 size={36} />}
            title={query ? "No matching flashcards" : "No flashcard sets available"}
            description={
              query
                ? "Try a different search term."
                : mode === "teacher"
                  ? "Create your first flashcard set for quick revision."
                  : "Ask your teacher to add flashcards to this device."
            }
            action={
              mode === "teacher" && !query ? (
                <Button
                  leftIcon={<Plus size={18} />}
                  onClick={() => navigate("/teacher/flashcards/new")}
                >
                  Create flashcards
                </Button>
              ) : null
            }
          />
        </Card>
      ) : (
        <Grid columns={2}>
          {visibleSets.map((set) => (
            <FlashcardSetCard
              key={set.id}
              set={set}
              mode={mode}
              onOpen={() => openSet(set)}
            />
          ))}
        </Grid>
      )}
    </PageContainer>
  );
}

function FlashcardSetCard({ set, mode, onOpen }) {
  const title =
    set.title?.[set.defaultLanguage || "en"] ||
    set.title?.en ||
    Object.values(set.title || {})[0] ||
    "Untitled flashcards";

  const cardCount = Array.isArray(set.cards) ? set.cards.length : 0;
  const languages = Array.isArray(set.languages)
    ? set.languages
    : Object.keys(set.title || {});

  return (
    <Card className="flashcard-set-card" padding="lg" onClick={onOpen}>
      <div className="flashcard-set-card__top">
        <div className="flashcard-set-card__icon">
          <Brain size={26} />
        </div>
        <Badge>{set.subjectId || "Revision"}</Badge>
      </div>

      <h2>{title}</h2>
      <p>{set.description || "Quick revision with question-and-answer cards."}</p>

      <div className="flashcard-set-card__meta">
        <span>
          <Layers3 size={16} />
          {cardCount} card{cardCount === 1 ? "" : "s"}
        </span>
        <span>
          <Languages size={16} />
          {languages.length || 1} language{languages.length === 1 ? "" : "s"}
        </span>
      </div>

      <div className="flashcard-set-card__footer">
        <span>{mode === "teacher" ? "Open set" : "Start revision"}</span>
        <ChevronRight size={20} />
      </div>
    </Card>
  );
}
