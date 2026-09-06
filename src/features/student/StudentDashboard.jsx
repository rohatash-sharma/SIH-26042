import {
  BookOpen,
  CheckCircle2,
  ClipboardList,
  Flame,
  Play,
  RotateCcw,
  Sparkles,
  Trophy,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card, ProgressBar } from "../../components/ui";
import { Grid, PageContainer, SectionHeader } from "../../components/layout";
import useAuth from "../auth/useAuth";

const subjects = [
  {
    id: "evs",
    name: "Environmental Studies",
    code: "EVS",
    icon: BookOpen,
    description: "Explore nature, water, plants, animals, and our environment.",
    path: "/student/subjects/evs",
  },
  {
    id: "math",
    name: "Mathematics",
    code: "Math",
    icon: Trophy,
    description: "Practise numbers, patterns, shapes, and problem solving.",
    path: "/student/subjects/math",
  },
];

export default function StudentDashboard() {
  const navigate = useNavigate();
  const { user, language } = useAuth();

  const firstName = user?.name?.split(" ")[0] || "Learner";
  const grade = user?.grade || 3;

  return (
    <PageContainer
      title={`Hello, ${firstName}!`}
      description={`Ready to learn? Continue your Grade ${grade} learning journey.`}
    >
      <section className="student-dashboard__hero">
        <Card padding="lg">
          <div className="student-dashboard__hero-content">
            <div>
              <Badge variant="success">Offline ready</Badge>
              <h2>Keep learning, wherever you are.</h2>
              <p>
                Your lessons, quizzes, flashcards, and progress can remain
                available on this device without an internet connection.
              </p>

              <div className="student-dashboard__hero-actions">
                <Button
                  leftIcon={<Play size={18} />}
                  onClick={() => navigate("/student/learn")}
                >
                  Start learning
                </Button>
                <Button
                  variant="outline"
                  leftIcon={<RotateCcw size={18} />}
                  onClick={() => navigate("/student/revision")}
                >
                  Revision
                </Button>
              </div>
            </div>

            <div className="student-dashboard__hero-icon" aria-hidden="true">
              <Sparkles size={42} />
            </div>
          </div>
        </Card>
      </section>

      <section className="student-dashboard__stats">
        <Grid columns={4}>
          <Card padding="md" className="student-stat-card">
            <BookOpen size={22} />
            <span>Lessons done</span>
            <strong>0</strong>
          </Card>

          <Card padding="md" className="student-stat-card">
            <ClipboardList size={22} />
            <span>Quizzes done</span>
            <strong>0</strong>
          </Card>

          <Card padding="md" className="student-stat-card">
            <CheckCircle2 size={22} />
            <span>Average score</span>
            <strong>—</strong>
          </Card>

          <Card padding="md" className="student-stat-card">
            <Flame size={22} />
            <span>Learning streak</span>
            <strong>0</strong>
          </Card>
        </Grid>
      </section>

      <section className="student-dashboard__continue">
        <SectionHeader
          title="Continue learning"
          description="Pick a subject to begin."
        />

        <Grid columns={2}>
          {subjects.map(({ id, name, code, icon: Icon, description, path }) => (
            <Card
              key={id}
              padding="lg"
              className="student-subject-card"
              onClick={() => navigate(path)}
            >
              <div className="student-subject-card__icon">
                <Icon size={28} />
              </div>
              <Badge>{code}</Badge>
              <h3>{name}</h3>
              <p>{description}</p>
              <Button
                variant="ghost"
                rightIcon={<Play size={17} />}
                onClick={(event) => {
                  event.stopPropagation();
                  navigate(path);
                }}
              >
                Open subject
              </Button>
            </Card>
          ))}
        </Grid>
      </section>

      <section className="student-dashboard__progress">
        <SectionHeader
          title="My progress"
          description="Your learning progress is saved locally."
          action={
            <Button
              variant="outline"
              onClick={() => navigate("/student/progress")}
            >
              View progress
            </Button>
          }
        />

        <Card padding="lg">
          <div className="student-progress-summary">
            <div>
              <span>Overall learning progress</span>
              <strong>0%</strong>
            </div>
            <ProgressBar value={0} showValue={false} />
            <p>Complete a lesson or quiz to start building your progress.</p>
          </div>
        </Card>
      </section>

      <div className="student-dashboard__language">
        Learning language: <strong>{language?.toUpperCase() || "EN"}</strong>
      </div>
    </PageContainer>
  );
}
