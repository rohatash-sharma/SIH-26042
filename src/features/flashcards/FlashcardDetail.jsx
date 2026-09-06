import { ArrowLeft, Edit3, Layers3, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Card, EmptyState } from "../../components/ui";
import { PageContainer } from "../../components/layout";
import { useFlashcardActions, useFlashcardSet } from "./useFlashcards";

export default function FlashcardDetail() {
  const { setId } = useParams();
  const navigate = useNavigate();
  const { set, isLoading } = useFlashcardSet(setId);
  const { removeSet, isSaving } = useFlashcardActions();

  if (isLoading) {
    return <PageContainer title="Flashcards">Loading...</PageContainer>;
  }

  if (!set) {
    return (
      <PageContainer title="Flashcards not found">
        <Card padding="lg">
          <EmptyState
            title="Flashcard set not found"
            description="This set is not stored on the current device."
            action={
              <Button
                leftIcon={<ArrowLeft size={18} />}
                onClick={() => navigate("/teacher/flashcards")}
              >
                Back to flashcards
              </Button>
            }
          />
        </Card>
      </PageContainer>
    );
  }

  const title =
    set.title?.[set.defaultLanguage || "en"] ||
    set.title?.en ||
    Object.values(set.title || {})[0] ||
    "Flashcards";

  const handleDelete = async () => {
    if (!window.confirm("Delete this flashcard set from the local device?")) {
      return;
    }

    await removeSet(set.id);
    navigate("/teacher/flashcards");
  };

  return (
    <PageContainer
      title={title}
      description={set.description}
      action={
        <div className="flashcard-detail__actions">
          <Button
            variant="outline"
            leftIcon={<Edit3 size={17} />}
            onClick={() =>
              navigate(`/teacher/flashcards/${set.id}/edit`)
            }
          >
            Edit
          </Button>
          <Button
            variant="danger"
            leftIcon={<Trash2 size={17} />}
            loading={isSaving}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </div>
      }
    >
      <div className="flashcard-detail__summary">
        <Badge>{set.subjectId || "Revision"}</Badge>
        <span>
          <Layers3 size={17} />
          {set.cards?.length || 0} cards
        </span>
      </div>

      <div className="flashcard-detail__cards">
        {(set.cards || []).map((card, index) => {
          const front =
            card.front?.[set.defaultLanguage || "en"] ||
            card.front?.en ||
            Object.values(card.front || {})[0] ||
            "";

          const back =
            card.back?.[set.defaultLanguage || "en"] ||
            card.back?.en ||
            Object.values(card.back || {})[0] ||
            "";

          return (
            <Card key={card.id || index} padding="lg">
              <span className="flashcard-detail__number">
                Card {index + 1}
              </span>
              <div className="flashcard-detail__side">
                <small>Question</small>
                <p>{front}</p>
              </div>
              <div className="flashcard-detail__side">
                <small>Answer</small>
                <p>{back}</p>
              </div>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
