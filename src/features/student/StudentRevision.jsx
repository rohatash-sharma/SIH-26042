import { Brain, CheckCircle2, RotateCcw } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Card, EmptyState } from "../../components/ui";
import { PageContainer, SectionHeader } from "../../components/layout";

export default function StudentRevision() {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Revision"
      description="Review what you have learned using quizzes and flashcards."
    >
      <SectionHeader
        title="Choose a revision activity"
        description="Short practice activities help you remember key ideas."
      />

      <div className="student-revision-grid">
        <Card padding="lg" className="student-revision-card">
          <div className="student-revision-card__icon">
            <Brain size={30} />
          </div>
          <h2>Flashcards</h2>
          <p>Quickly review important words, ideas, and questions.</p>
          <Button
            leftIcon={<RotateCcw size={18} />}
            onClick={() => navigate("/student/flashcards")}
          >
            Practise flashcards
          </Button>
        </Card>

        <Card padding="lg" className="student-revision-card">
          <div className="student-revision-card__icon">
            <CheckCircle2 size={30} />
          </div>
          <h2>Quizzes</h2>
          <p>Test yourself and see how much you remember.</p>
          <Button onClick={() => navigate("/student/quizzes")}>
            Practise quizzes
          </Button>
        </Card>
      </div>

      <Card padding="lg">
        <EmptyState
          title="More revision activities are coming"
          description="Additional activities can be added later without changing the student dashboard."
        />
      </Card>
    </PageContainer>
  );
}
