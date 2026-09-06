import {
  BarChart3,
  BookOpen,
  ClipboardList,
  FileText,
  Languages,
  Plus,
  Sparkles,
  Users,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Card, Button, Badge, ProgressBar } from "../../components/ui";
import { PageContainer, SectionHeader, Grid } from "../../components/layout";
import useAuth from "../auth/useAuth";

const quickActions = [
  {
    id: "lesson",
    title: "Create Lesson",
    description: "Prepare a lesson for your students.",
    icon: BookOpen,
    path: "/teacher/lessons/new",
  },
  {
    id: "quiz",
    title: "Create Quiz",
    description: "Make a quiz for practice or assessment.",
    icon: ClipboardList,
    path: "/teacher/quizzes/new",
  },
  {
    id: "flashcards",
    title: "Create Flashcards",
    description: "Build quick revision cards.",
    icon: FileText,
    path: "/teacher/flashcards/new",
  },
  {
    id: "language",
    title: "Manage Languages",
    description: "Choose learning and interface languages.",
    icon: Languages,
    path: "/teacher/languages",
  },
];

const stats = [
  { label: "Lessons", value: "0", icon: BookOpen },
  { label: "Quizzes", value: "0", icon: ClipboardList },
  { label: "Flashcard sets", value: "0", icon: FileText },
  { label: "Students", value: "0", icon: Users },
];

export default function TeacherDashboard() {
  const navigate = useNavigate();
  const { user, language } = useAuth();

  return (
    <PageContainer
      title={`Welcome, ${user?.name || "Teacher"}!`}
      description="Create, organise, and share learning activities — even when offline."
      action={
        <Button
          leftIcon={<Plus size={18} />}
          onClick={() => navigate("/teacher/lessons/new")}
        >
          Create content
        </Button>
      }
    >
      <section className="teacher-dashboard__welcome">
        <Card padding="lg">
          <div className="teacher-dashboard__welcome-content">
            <div>
              <Badge variant="success">Offline ready</Badge>
              <h2>Your classroom, on this device.</h2>
              <p>
                Lessons, quizzes, flashcards, and student progress can be
                managed locally without an internet connection.
              </p>
            </div>

            <div className="teacher-dashboard__welcome-icon" aria-hidden="true">
              <Sparkles size={34} />
            </div>
          </div>

          <div className="teacher-dashboard__language">
            <span>Current interface language</span>
            <strong>{language?.toUpperCase() || "EN"}</strong>
          </div>
        </Card>
      </section>

      <section className="teacher-dashboard__stats">
        <SectionHeader
          title="Your classroom"
          description="A quick overview of your locally stored content."
        />

        <Grid columns={4}>
          {stats.map(({ label, value, icon: Icon }) => (
            <Card key={label} padding="md" className="teacher-stat-card">
              <div className="teacher-stat-card__icon" aria-hidden="true">
                <Icon size={22} />
              </div>
              <span>{label}</span>
              <strong>{value}</strong>
            </Card>
          ))}
        </Grid>
      </section>

      <section className="teacher-dashboard__quick-actions">
        <SectionHeader
          title="Quick actions"
          description="Start creating classroom material."
        />

        <Grid columns={2}>
          {quickActions.map(
            ({ id, title, description, icon: Icon, path }) => (
              <Card
                key={id}
                className="teacher-action-card"
                padding="lg"
                onClick={() => navigate(path)}
              >
                <div className="teacher-action-card__icon" aria-hidden="true">
                  <Icon size={24} />
                </div>
                <div className="teacher-action-card__content">
                  <h3>{title}</h3>
                  <p>{description}</p>
                </div>
              </Card>
            ),
          )}
        </Grid>
      </section>

      <section className="teacher-dashboard__progress">
        <SectionHeader
          title="Student progress"
          description="Progress analytics will appear here as students complete activities."
          action={
            <Button
              variant="outline"
              leftIcon={<BarChart3 size={18} />}
              onClick={() => navigate("/teacher/progress")}
            >
              View progress
            </Button>
          }
        />

        <Card padding="lg">
          <div className="teacher-progress-empty">
            <div className="teacher-progress-empty__icon" aria-hidden="true">
              <BarChart3 size={28} />
            </div>
            <div>
              <h3>No progress recorded yet</h3>
              <p>
                Student quiz and lesson activity will be summarised here once
                learning begins.
              </p>
            </div>
            <ProgressBar value={0} label="Overall progress" showValue />
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}
