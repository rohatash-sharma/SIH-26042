import { CheckCircle2, RotateCcw, Trophy, XCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Card, EmptyState, ProgressBar } from "../../components/ui";
import { PageContainer } from "../../components/layout";
import { useQuiz, useQuizResults } from "./useQuizzes";
import useAuth from "../auth/useAuth";

export default function QuizResultHistory() {
  const { quizId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { quiz, isLoading: quizLoading } = useQuiz(quizId);
  const { results, isLoading: resultsLoading } = useQuizResults(
    user?.id,
    quizId,
  );

  if (quizLoading || resultsLoading) {
    return <PageContainer title="Quiz Results">Loading...</PageContainer>;
  }

  if (!quiz) {
    return (
      <PageContainer title="Results">
        <Card padding="lg">
          <EmptyState
            title="Quiz not found"
            description="The quiz is not available on this device."
          />
        </Card>
      </PageContainer>
    );
  }

  const title =
    quiz.title?.[quiz.defaultLanguage || "en"] ||
    quiz.title?.en ||
    Object.values(quiz.title || {})[0] ||
    "Quiz";

  return (
    <PageContainer
      title={`${title} — Results`}
      description="Your previous attempts are stored locally."
      action={
        <Button
          leftIcon={<RotateCcw size={18} />}
          onClick={() => navigate(`/student/quizzes/${quiz.id}`)}
        >
          Take quiz again
        </Button>
      }
    >
      {results.length === 0 ? (
        <Card padding="lg">
          <EmptyState
            icon={<Trophy size={36} />}
            title="No attempts yet"
            description="Complete the quiz to see your result here."
          />
        </Card>
      ) : (
        <div className="quiz-result-history">
          {results
            .slice()
            .reverse()
            .map((result) => {
              const percentage = result.total
                ? Math.round((result.score / result.total) * 100)
                : 0;
              const passed =
                !quiz.passingScore ||
                percentage >= Number(quiz.passingScore);

              return (
                <Card key={result.id} padding="lg">
                  <div className="quiz-result-history__row">
                    {passed ? (
                      <CheckCircle2 size={24} />
                    ) : (
                      <XCircle size={24} />
                    )}
                    <div>
                      <Badge variant={passed ? "success" : "warning"}>
                        {passed ? "Passed" : "Practise more"}
                      </Badge>
                      <h3>{percentage}%</h3>
                      <p>
                        {result.score}/{result.total} correct
                      </p>
                    </div>
                    <ProgressBar value={percentage} showValue />
                  </div>
                </Card>
              );
            })}
        </div>
      )}
    </PageContainer>
  );
}
