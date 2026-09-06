import { ArrowLeft, Edit3, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Card, EmptyState } from "../../components/ui";
import { PageContainer } from "../../components/layout";
import { useQuiz, useQuizActions } from "./useQuizzes";

export default function QuizDetail() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { quiz, isLoading } = useQuiz(quizId);
  const { removeQuiz, isSaving } = useQuizActions();

  if (isLoading) {
    return <PageContainer title="Quiz">Loading...</PageContainer>;
  }

  if (!quiz) {
    return (
      <PageContainer title="Quiz not found">
        <Card padding="lg">
          <EmptyState
            title="Quiz not found"
            description="This quiz is not stored on this device."
            action={
              <Button
                leftIcon={<ArrowLeft size={18} />}
                onClick={() => navigate("/teacher/quizzes")}
              >
                Back to quizzes
              </Button>
            }
          />
        </Card>
      </PageContainer>
    );
  }

  const title =
    quiz.title?.[quiz.defaultLanguage || "en"] ||
    quiz.title?.en ||
    Object.values(quiz.title || {})[0] ||
    "Untitled quiz";

  const handleDelete = async () => {
    if (!window.confirm("Delete this quiz from the local device?")) return;

    await removeQuiz(quiz.id);
    navigate("/teacher/quizzes");
  };

  return (
    <PageContainer
      title={title}
      description={quiz.description}
      action={
        <div className="quiz-detail__actions">
          <Button
            variant="outline"
            leftIcon={<Edit3 size={17} />}
            onClick={() => navigate(`/teacher/quizzes/${quiz.id}/edit`)}
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
      <div className="quiz-detail__questions">
        {(quiz.questions || []).map((question, index) => {
          const questionText =
            question.question?.[quiz.defaultLanguage || "en"] ||
            question.question?.en ||
            Object.values(question.question || {})[0] ||
            "";

          return (
            <Card key={question.id || index} padding="lg">
              <Badge>Question {index + 1}</Badge>
              <h2>{questionText}</h2>

              <div className="quiz-detail__options">
                {(question.options || []).map((option) => {
                  const optionText =
                    option.text?.[quiz.defaultLanguage || "en"] ||
                    option.text?.en ||
                    Object.values(option.text || {})[0] ||
                    "";

                  return (
                    <div
                      key={option.id}
                      className={
                        option.id === question.correctAnswer
                          ? "quiz-detail__option quiz-detail__option--correct"
                          : "quiz-detail__option"
                      }
                    >
                      <span>{option.id.toUpperCase()}</span>
                      <strong>{optionText}</strong>
                      {option.id === question.correctAnswer ? (
                        <em>Correct</em>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
