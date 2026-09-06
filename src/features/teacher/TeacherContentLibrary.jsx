import {
  BookOpen,
  ClipboardList,
  FileText,
  FolderOpen,
  Plus,
  Search,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  SearchBar,
  Tabs,
  EmptyState,
} from "../../components/ui";
import { PageContainer } from "../../components/layout";

const CONTENT_TYPES = [
  { id: "all", label: "All" },
  { id: "lessons", label: "Lessons" },
  { id: "quizzes", label: "Quizzes" },
  { id: "flashcards", label: "Flashcards" },
];

const emptyContent = [];

export default function TeacherContentLibrary() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("all");
  const [query, setQuery] = useState("");

  const visibleContent = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    return emptyContent.filter((item) => {
      const typeMatches =
        activeTab === "all" || item.type === activeTab.slice(0, -1);

      const queryMatches =
        !normalizedQuery ||
        item.title.toLowerCase().includes(normalizedQuery);

      return typeMatches && queryMatches;
    });
  }, [activeTab, query]);

  return (
    <PageContainer
      title="Content Library"
      description="Manage lessons, quizzes, and flashcard sets stored on this device."
      action={
        <Button
          leftIcon={<Plus size={18} />}
          onClick={() => navigate("/teacher/lessons/new")}
        >
          Create content
        </Button>
      }
    >
      <div className="teacher-library__toolbar">
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder="Search your content..."
          icon={<Search size={18} />}
        />

        <Tabs
          tabs={CONTENT_TYPES}
          value={activeTab}
          onChange={setActiveTab}
        />
      </div>

      {visibleContent.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<FolderOpen size={34} />}
            title="Your content library is empty"
            description="Create your first lesson, quiz, or flashcard set to start building your classroom."
            action={
              <Button
                leftIcon={<Plus size={18} />}
                onClick={() => navigate("/teacher/lessons/new")}
              >
                Create your first lesson
              </Button>
            }
          />
        </Card>
      ) : (
        <div className="teacher-library__grid">
          {visibleContent.map((item) => (
            <Card key={item.id} padding="md">
              <div className="teacher-library__item">
                <div className="teacher-library__item-icon">
                  {item.type === "lesson" && <BookOpen size={22} />}
                  {item.type === "quiz" && <ClipboardList size={22} />}
                  {item.type === "flashcard" && <FileText size={22} />}
                </div>
                <Badge>{item.type}</Badge>
                <h3>{item.title}</h3>
              </div>
            </Card>
          ))}
        </div>
      )}
    </PageContainer>
  );
}
