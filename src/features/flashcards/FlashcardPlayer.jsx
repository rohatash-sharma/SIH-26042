import {
  ArrowLeft,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  RotateCcw,
  XCircle,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  ProgressBar,
  Spinner,
} from "../../components/ui";
import { PageContainer } from "../../components/layout";
import { useFlashcardActions, useFlashcardSet } from "./useFlashcards";
import useAuth from "../auth/useAuth";

export default function FlashcardPlayer() {
  const { setId } = useParams();
  const navigate = useNavigate();
  const { user, language } = useAuth();
  const { set, isLoading } = useFlashcardSet(setId);
  const { saveProgress, isSaving } = useFlashcardActions();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [knownCards, setKnownCards] = useState(new Set());
  const [reviewedCards, setReviewedCards] = useState(new Set());
  const [completed, setCompleted] = useState(false);

  const cards = set?.cards || [];
  const currentCard = cards[currentIndex];

  const frontText = useMemo(() => {
    if (!currentCard?.front) return "";

    return (
      currentCard.front[language] ||
      currentCard.front.en ||
      Object.values(currentCard.front)[0] ||
      ""
    );
  }, [currentCard, language]);

  const backText = useMemo(() => {
    if (!currentCard?.back) return "";

    return (
      currentCard.back[language] ||
      currentCard.back.en ||
      Object.values(currentCard.back)[0] ||
      ""
    );
  }, [currentCard, language]);

  if (isLoading) {
    return (
      <PageContainer title="Flashcards">
        <Card padding="lg">
          <div className="flashcard-player__loading">
            <Spinner />
            <span>Loading flashcards...</span>
          </div>
        </Card>
      </PageContainer>
    );
  }

  if (!set) {
    return (
      <PageContainer title="Flashcards not found">
        <Card padding="lg">
          <EmptyState
            title="This flashcard set is not available"
            description="The set may not have been stored on this device."
            action={
              <Button
                leftIcon={<ArrowLeft size={18} />}
                onClick={() => navigate("/student/flashcards")}
              >
                Back to flashcards
              </Button>
            }
          />
        </Card>
      </PageContainer>
    );
  }

  if (!cards.length) {
    return (
      <PageContainer title="Empty flashcard set">
        <Card padding="lg">
          <EmptyState
            title="No cards in this set"
            description="Ask the teacher to add cards to this flashcard set."
          />
        </Card>
      </PageContainer>
    );
  }

  const title =
    set.title?.[language] ||
    set.title?.en ||
    Object.values(set.title || {})[0] ||
    "Flashcards";

  const progress = ((currentIndex + 1) / cards.length) * 100;
  const isLast = currentIndex === cards.length - 1;
  const hasReviewed = reviewedCards.has(currentCard.id);

  const markCard = async (known) => {
    const nextKnown = new Set(knownCards);
    const nextReviewed = new Set(reviewedCards);

    if (known) {
      nextKnown.add(currentCard.id);
    } else {
      nextKnown.delete(currentCard.id);
    }

    nextReviewed.add(currentCard.id);

    setKnownCards(nextKnown);
    setReviewedCards(nextReviewed);

    if (isLast) {
      await saveProgress({
        studentId: user.id,
        flashcardSetId: set.id,
        reviewedCards: nextReviewed.size,
        totalCards: cards.length,
        knownCards: nextKnown.size,
      });
      setCompleted(true);
      return;
    }

    setCurrentIndex((index) => index + 1);
    setIsFlipped(false);
  };

  if (completed) {
    const score = cards.length
      ? Math.round((knownCards.size / cards.length) * 100)
      : 0;

    return (
      <PageContainer
        title="Revision complete!"
        description="Your flashcard progress has been saved locally."
      >
        <Card padding="lg">
          <div className="flashcard-result">
            <div className="flashcard-result__icon">
              <CheckCircle2 size={44} />
            </div>
            <Badge variant="success">Completed</Badge>
            <h2>{score}% remembered</h2>
            <p>
              You marked {knownCards.size} of {cards.length} cards as known.
            </p>
            <ProgressBar value={score} label="Cards remembered" showValue />
            <div className="flashcard-result__actions">
              <Button
                leftIcon={<RotateCcw size={18} />}
                onClick={() => window.location.reload()}
              >
                Revise again
              </Button>
              <Button variant="outline" onClick={() => navigate("/student/flashcards")}>
                Back to flashcards
              </Button>
            </div>
          </div>
        </Card>
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={title}
      description={set.description}
    >
      <div className="flashcard-player">
        <div className="flashcard-player__progress">
          <Badge>
            Card {currentIndex + 1} of {cards.length}
          </Badge>
          <ProgressBar value={progress} showValue={false} />
        </div>

        <button
          type="button"
          className={`flashcard${isFlipped ? " flashcard--flipped" : ""}`}
          onClick={() => setIsFlipped((value) => !value)}
          aria-label={isFlipped ? "Show question" : "Show answer"}
        >
          <span className="flashcard__label">
            {isFlipped ? "Answer" : "Question"}
          </span>
          <strong>{isFlipped ? backText : frontText}</strong>
          <span className="flashcard__hint">
            Tap or click to {isFlipped ? "see the question" : "reveal the answer"}
          </span>
        </button>

        <div className="flashcard-player__controls">
          <Button
            variant="outline"
            leftIcon={<XCircle size={18} />}
            disabled={!isFlipped || isSaving}
            onClick={() => markCard(false)}
          >
            Need practice
          </Button>

          <Button
            leftIcon={<CheckCircle2 size={18} />}
            disabled={!isFlipped || isSaving}
            loading={isSaving}
            onClick={() => markCard(true)}
          >
            I know this
          </Button>
        </div>

        <div className="flashcard-player__navigation">
          <Button
            variant="ghost"
            leftIcon={<ChevronLeft size={18} />}
            disabled={currentIndex === 0}
            onClick={() => {
              setCurrentIndex((index) => Math.max(0, index - 1));
              setIsFlipped(false);
            }}
          >
            Previous
          </Button>

          {!hasReviewed && !isLast ? (
            <Button
              variant="ghost"
              rightIcon={<ChevronRight size={18} />}
              disabled={!isFlipped}
              onClick={() => {
                setCurrentIndex((index) =>
                  Math.min(cards.length - 1, index + 1),
                );
                setIsFlipped(false);
              }}
            >
              Skip
            </Button>
          ) : null}
        </div>
      </div>
    </PageContainer>
  );
}
