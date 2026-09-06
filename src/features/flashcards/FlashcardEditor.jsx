import { Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, Select, Textarea } from "../../components/ui";
import { PageContainer, SectionHeader } from "../../components/layout";
import { useFlashcardActions } from "./useFlashcards";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "sat", label: "Santhali" },
];

const gradeOptions = [
  { value: "3", label: "Grade 3" },
  { value: "4", label: "Grade 4" },
  { value: "5", label: "Grade 5" },
];

function createCard(index) {
  return {
    id: `card_${Date.now()}_${index}`,
    front: "",
    back: "",
  };
}

export default function FlashcardEditor() {
  const navigate = useNavigate();
  const { createOrUpdateSet, isSaving } = useFlashcardActions();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("3");
  const [language, setLanguage] = useState("en");
  const [cards, setCards] = useState([createCard(0)]);
  const [error, setError] = useState("");

  const updateCard = (id, field, value) => {
    setCards((current) =>
      current.map((card) => (card.id === id ? { ...card, [field]: value } : card)),
    );
  };

  const addCard = () => {
    setCards((current) => [...current, createCard(current.length)]);
  };

  const removeCard = (id) => {
    setCards((current) =>
      current.length === 1 ? current : current.filter((card) => card.id !== id),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a flashcard set title.");
      return;
    }

    if (
      cards.some(
        (card) => !card.front.trim() || !card.back.trim(),
      )
    ) {
      setError("Every card needs both a question and an answer.");
      return;
    }

    const flashcardSet = {
      id: `flashcard_${Date.now()}`,
      grade: Number(grade),
      subjectId: "evs",
      chapterId: null,
      defaultLanguage: language,
      languages: [language],
      title: { [language]: title.trim() },
      description: description.trim(),
      cards: cards.map((card) => ({
        id: card.id,
        front: { [language]: card.front.trim() },
        back: { [language]: card.back.trim() },
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await createOrUpdateSet(flashcardSet);
    navigate("/teacher/flashcards");
  };

  return (
    <PageContainer
      title="Create Flashcards"
      description="Build quick question-and-answer cards for offline revision."
    >
      <form onSubmit={handleSubmit} className="flashcard-editor">
        <Card padding="lg">
          <SectionHeader
            title="Flashcard set details"
            description="Add the basic information for the revision set."
          />

          <div className="flashcard-editor__fields">
            <Input
              label="Set title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setError("");
              }}
              placeholder="e.g. Water Revision"
              required
            />

            <Textarea
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What should students revise?"
              rows={4}
            />

            <div className="flashcard-editor__row">
              <Select
                label="Grade"
                value={grade}
                onChange={(event) => setGrade(event.target.value)}
                options={gradeOptions}
              />
              <Select
                label="Content language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                options={languageOptions}
              />
            </div>
          </div>
        </Card>

        <Card padding="lg">
          <SectionHeader
            title="Cards"
            description="Write a prompt on the front and the answer on the back."
            action={
              <Button
                type="button"
                variant="outline"
                leftIcon={<Plus size={18} />}
                onClick={addCard}
              >
                Add card
              </Button>
            }
          />

          <div className="flashcard-editor__cards">
            {cards.map((card, index) => (
              <div key={card.id} className="flashcard-editor__card">
                <div className="flashcard-editor__card-header">
                  <strong>Card {index + 1}</strong>
                  <Button
                    type="button"
                    variant="ghost"
                    leftIcon={<Trash2 size={17} />}
                    disabled={cards.length === 1}
                    onClick={() => removeCard(card.id)}
                  >
                    Remove
                  </Button>
                </div>

                <Textarea
                  label="Front — question"
                  value={card.front}
                  onChange={(event) => {
                    updateCard(card.id, "front", event.target.value);
                    setError("");
                  }}
                  placeholder="What do you want the student to remember?"
                  rows={4}
                  required
                />

                <Textarea
                  label="Back — answer"
                  value={card.back}
                  onChange={(event) => {
                    updateCard(card.id, "back", event.target.value);
                    setError("");
                  }}
                  placeholder="Write the answer or explanation."
                  rows={4}
                  required
                />
              </div>
            ))}
          </div>
        </Card>

        {error ? <p className="flashcard-editor__error">{error}</p> : null}

        <div className="flashcard-editor__actions">
          <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            leftIcon={<Save size={18} />}
            loading={isSaving}
          >
            Save flashcards
          </Button>
        </div>
      </form>
    </PageContainer>
  );
}
