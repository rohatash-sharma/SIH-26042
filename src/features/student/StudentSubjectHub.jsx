import { ArrowRight, BookOpen, Brain, ClipboardCheck } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Card, EmptyState } from "../../components/ui";
import { PageContainer, Grid, SectionHeader } from "../../components/layout";
import { useAuth } from "../auth";

const SUBJECTS = {
  evs: {
    name: "Environmental Studies",
    code: "EVS",
    description: "Explore nature, water, plants, animals, and our environment.",
  },
  math: {
    name: "Mathematics",
    code: "Math",
    description: "Practise numbers, patterns, shapes, and problem solving.",
  },
};

export default function StudentSubjectHub() {
  const { subjectId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const subject = SUBJECTS[subjectId];

  if (!subject) {
    return (
      <PageContainer title="Subject">
        <EmptyState
          title="Subject not found"
          description="This subject is not available on this device."
        />
      </PageContainer>
    );
  }

  return (
    <PageContainer
      title={subject.name}
      description={`Grade ${user?.grade || 3} learning activities`}
    >
      <Card padding="lg" className="student-subject-hub__intro">
        <Badge>{subject.code}</Badge>
        <h2>{subject.name}</h2>
        <p>{subject.description}</p>
      </Card>

      <section className="student-subject-hub__activities">
        <SectionHeader
          title="Learning activities"
          description="Choose how you want to learn."
        />

        <Grid columns={3}>
          <Card padding="lg">
            <BookOpen size={28} />
            <h3>Lessons</h3>
            <p>Read and complete lessons at your own pace.</p>
            <Button
              rightIcon={<ArrowRight size={17} />}
              onClick={() => navigate("/student/lessons")}
            >
              Learn
            </Button>
          </Card>

          <Card padding="lg">
            <ClipboardCheck size={28} />
            <h3>Quizzes</h3>
            <p>Test your understanding with practice questions.</p>
            <Button
              rightIcon={<ArrowRight size={17} />}
              onClick={() => navigate("/student/quizzes")}
            >
              Practise
            </Button>
          </Card>

          <Card padding="lg">
            <Brain size={28} />
            <h3>Flashcards</h3>
            <p>Review important ideas with quick revision cards.</p>
            <Button
              rightIcon={<ArrowRight size={17} />}
              onClick={() => navigate("/student/flashcards")}
            >
              Revise
            </Button>
          </Card>
        </Grid>
      </section>
    </PageContainer>
  );
}
