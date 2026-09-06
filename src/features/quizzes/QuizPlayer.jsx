import {
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  ClipboardList,
  Trophy,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Badge,
  Button,
  Card,
  EmptyState,
  ProgressBar,
  RadioGroup,
  Spinner,
} from "../../components/ui";
import { PageContainer } from "../../components/layout";
import { useQuiz, useQuizActions } from "./useQuizzes";
import useAuth from "../auth/useAuth";

export default function QuizPlayer() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user, language } = useAuth();
  const { quiz, isLoading } = useQuiz(quizId);
  const { submitResult, isSaving } = useQuizActions();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [result, setResult] = useState(null);

  const questions = quiz?.questions || [];
  const currentQuestion = questions[currentIndex];

  const questionText = useMemo(() => {
    if (!currentQuestion?.question) return "";

    return (
      currentQuestion.question[language] ||
      currentQuestion.question.en ||
      Object.values(currentQuestion.question)[0] ||
      ""
    );
  }, [currentQuestion, language]);

  const options = useMemo(
    () =>
      (currentQuestion?.options || []).map((option) => ({
        value: option.id,
        label:
          option.text?.[language] ||
          option.text?.en ||
          Object.values(option.text || {})[0] ||
          option.id,
      })),
    [currentQuestion, language],
  );

  const title =
    quiz?.title?.[language] ||
    quiz?.title?.en ||
    Object.values(quiz?.title || {})[0] ||
    "Quiz";

  const handleAnswer = (value) => {
    setAnswers((current) => ({
      ...current,
      [currentQuestion.id]: value,
    }));
  };

  const finishQuiz = async () => {
    let score = 0;

    questions.forEach((question) => {
      if (answers[question.id] === question.correctAnswer) {
        score += 1;
      }
    });

    const savedResult = await submitResult({
      studentId: user.id,
      quizId: quiz.id,
      score,
      total: questions.length,
      answers,
    });

    setResult(savedResult);
  };

  if (isLoading) {
    return (
      <PageContainer title="Quiz">
        <Card padding="lg">
          <div className="quiz-player__loading">
            <Spinner />
            <span>Loading quiz...</span>
          </div>
        </Card>
      </PageContainer>
    );
  }

  if (!quiz) {
    return (
      <PageContainer title="Quiz not found">
        <Card padding="lg">
          <EmptyState
            icon={<ClipboardList size={36} />}
            title="This quiz is not available"
            description="The quiz may not have been stored on this device."
            action={
              <Button onClick={() => navigate("/student/quizzes")}>
                Back to quizzes
              </Button>
            }
          />
        </Card>
      </PageContainer>
    );
  }

  if (result) {
    return <QuizResult quiz={quiz} result={result} onBack={() => navigate("/student/quizzes")} />;
  }

  if (!questions.length) {
    return (
      <PageContainer title={title}>
        <Card padding="lg">
          <EmptyState
            title="This quiz has no questions"
            description="Ask the teacher to add questions to this quiz."
          />
        </Card>
      </PageContainer>
    );
  }

  const progress = ((currentIndex + 1) / questions.length) * 100;
  const isLast = currentIndex === questions.length - 1;
  const hasAnswer = Boolean(answers[currentQuestion.id]);

  return (
    <PageContainer
      title={title}
      description={quiz.description}
    >
      <div className="quiz-player">
        <Card padding="lg">
          <div className="quiz-player__header">
            <Badge>
              Question {currentIndex + 1} of {questions.length}
            </Badge>
            <ProgressBar value={progress} showValue={false} />
          </div>

          <div className="quiz-player__question">
            <h2>{questionText}</h2>

            <RadioGroup
              name={`question-${currentQuestion.id}`}
              value={answers[currentQuestion.id] || ""}
              onChange={handleAnswer}
              options={options}
            />
          </div>

          <div className="quiz-player__navigation">
            <Button
              variant="outline"
              leftIcon={<ChevronLeft size={18} />}
              disabled={currentIndex === 0}
              onClick={() =>
                setCurrentIndex((index) => Math.max(0, index - 1))
              }
            >
              Previous
            </Button>

            {isLast ? (
              <Button
                rightIcon={<CheckCircle2 size={18} />}
                disabled={!hasAnswer}
                loading={isSaving}
                onClick={finishQuiz}
              >
                Finish quiz
              </Button>
            ) : (
              <Button
                rightIcon={<ChevronRight size={18} />}
                disabled={!hasAnswer}
                onClick={() =>
                  setCurrentIndex((index) =>
                    Math.min(questions.length - 1, index + 1),
                  )
                }
              >
                Next
              </Button>
            )}
          </div>
        </Card>
      </div>
    </PageContainer>
  );
}

function QuizResult({ quiz, result, onBack }) {
  const percentage = result.total
    ? Math.round((result.score / result.total) * 100)
    : 0;

  const passed =
    !quiz.passingScore || percentage >= Number(quiz.passingScore);

  return (
    <PageContainer
      title="Quiz Result"
      description="Your result has been saved locally."
    >
      <Card padding="lg">
        <div className="quiz-result">
          <div className="quiz-result__icon">
            <Trophy size={42} />
          </div>

          <Badge variant={passed ? "success" : "warning"}>
            {passed ? "Passed" : "Keep practising"}
          </Badge>

          <h2>{percentage}%</h2>
          <p>
            You scored <strong>{result.score}</strong> out of{" "}
            <strong>{result.total}</strong>.
          </p>

          <ProgressBar value={percentage} label="Your score" showValue />

          <Button onClick={onBack}>Back to quizzes</Button>
        </div>
      </Card>
    </PageContainer>
  );
}
