import { Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Button,
  Card,
  Input,
  Select,
  Textarea,
} from "../../components/ui";
import { PageContainer, SectionHeader } from "../../components/layout";
import { useQuizActions } from "./useQuizzes";

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

function createQuestion(index) {
  return {
    id: `q_${Date.now()}_${index}`,
    type: "mcq",
    question: "",
    options: [
      { id: "a", text: "" },
      { id: "b", text: "" },
      { id: "c", text: "" },
      { id: "d", text: "" },
    ],
    correctAnswer: "a",
  };
}

export default function QuizEditor() {
  const navigate = useNavigate();
  const { createOrUpdateQuiz, isSaving } = useQuizActions();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("3");
  const [language, setLanguage] = useState("en");
  const [passingScore, setPassingScore] = useState("60");
  const [questions, setQuestions] = useState([createQuestion(0)]);
  const [error, setError] = useState("");

  const updateQuestion = (questionId, field, value) => {
    setQuestions((current) =>
      current.map((question) =>
        question.id === questionId
          ? { ...question, [field]: value }
          : question,
      ),
    );
  };

  const updateOption = (questionId, optionId, value) => {
    setQuestions((current) =>
      current.map((question) =>
        question.id === questionId
          ? {
              ...question,
              options: question.options.map((option) =>
                option.id === optionId ? { ...option, text: value } : option,
              ),
            }
          : question,
      ),
    );
  };

  const addQuestion = () => {
    setQuestions((current) => [...current, createQuestion(current.length)]);
  };

  const removeQuestion = (questionId) => {
    setQuestions((current) =>
      current.length === 1
        ? current
        : current.filter((question) => question.id !== questionId),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a quiz title.");
      return;
    }

    if (questions.some((question) => !question.question.trim())) {
      setError("Every question needs question text.");
      return;
    }

    if (
      questions.some((question) =>
        question.options.some((option) => !option.text.trim()),
      )
    ) {
      setError("Every answer option needs text.");
      return;
    }

    const quiz = {
      id: `quiz_${Date.now()}`,
      grade: Number(grade),
      subjectId: "evs",
      chapterId: null,
      defaultLanguage: language,
      languages: [language],
      title: { [language]: title.trim() },
      description: description.trim(),
      passingScore: Number(passingScore) || 0,
      questions: questions.map((question) => ({
        id: question.id,
        type: "mcq",
        question: { [language]: question.question.trim() },
        options: question.options.map((option) => ({
          id: option.id,
          text: { [language]: option.text.trim() },
        })),
        correctAnswer: question.correctAnswer,
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await createOrUpdateQuiz(quiz);
    navigate("/teacher/quizzes");
  };

  return (
    <PageContainer
      title="Create Quiz"
      description="Create a multiple-choice quiz that can be taken offline."
    >
      <form onSubmit={handleSubmit} className="quiz-editor">
        <Card padding="lg">
          <SectionHeader
            title="Quiz details"
            description="Add the basic information for this assessment."
          />

          <div className="quiz-editor__fields">
            <Input
              label="Quiz title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setError("");
              }}
              placeholder="e.g. Water Quiz"
              required
            />

            <Textarea
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="What will students practise?"
              rows={4}
            />

            <div className="quiz-editor__row">
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
              <Input
                label="Passing score (%)"
                type="number"
                min="0"
                max="100"
                value={passingScore}
                onChange={(event) => setPassingScore(event.target.value)}
              />
            </div>
          </div>
        </Card>

        <Card padding="lg">
          <SectionHeader
            title="Questions"
            description="Add multiple-choice questions and select the correct answer."
            action={
              <Button
                type="button"
                variant="outline"
                leftIcon={<Plus size={18} />}
                onClick={addQuestion}
              >
                Add question
              </Button>
            }
          />

          <div className="quiz-editor__questions">
            {questions.map((question, index) => (
              <div key={question.id} className="quiz-editor__question">
                <div className="quiz-editor__question-header">
                  <strong>Question {index + 1}</strong>
                  <Button
                    type="button"
                    variant="ghost"
                    leftIcon={<Trash2 size={17} />}
                    disabled={questions.length === 1}
                    onClick={() => removeQuestion(question.id)}
                  >
                    Remove
                  </Button>
                </div>

                <Textarea
                  label="Question"
                  value={question.question}
                  onChange={(event) => {
                    updateQuestion(
                      question.id,
                      "question",
                      event.target.value,
                    );
                    setError("");
                  }}
                  placeholder="Write the question..."
                  rows={3}
                  required
                />

                <div className="quiz-editor__options">
                  {question.options.map((option) => (
                    <div
                      key={option.id}
                      className="quiz-editor__option"
                    >
                      <Input
                        label={`Option ${option.id.toUpperCase()}`}
                        value={option.text}
                        onChange={(event) =>
                          updateOption(
                            question.id,
                            option.id,
                            event.target.value,
                          )
                        }
                        placeholder="Answer option"
                        required
                      />
                      <label>
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={question.correctAnswer === option.id}
                          onChange={() =>
                            updateQuestion(
                              question.id,
                              "correctAnswer",
                              option.id,
                            )
                          }
                        />
                        Correct answer
                      </label>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {error ? <p className="quiz-editor__error">{error}</p> : null}

        <div className="quiz-editor__actions">
          <Button type="button" variant="ghost" onClick={() => navigate(-1)}>
            Cancel
          </Button>
          <Button
            type="submit"
            leftIcon={<Save size={18} />}
            loading={isSaving}
          >
            Save quiz
          </Button>
        </div>
      </form>
    </PageContainer>
  );
}
