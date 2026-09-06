import { ArrowRight, BookOpen, CheckCircle2, PlayCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge, Button, Card, EmptyState } from "../../components/ui";
import { PageContainer, SectionHeader } from "../../components/layout";
import useAuth from "../auth/useAuth";

const lessons = [
  {
    id: "lesson_water_01",
    title: "Water",
    subject: "Environmental Studies",
    chapter: "Water",
    status: "available",
    path: "/student/lessons/water",
  },
];

export default function StudentLearn() {
  const navigate = useNavigate();
  const { user } = useAuth();

  const availableLessons = lessons.filter((lesson) => lesson.status === "available");

  return (
    <PageContainer
      title="Learn"
      description={`Lessons for Grade ${user?.grade || 3}.`}
    >
      <section>
        <SectionHeader
          title="Available lessons"
          description="Open a lesson and learn at your own pace."
        />

        {availableLessons.length === 0 ? (
          <Card padding="lg">
            <EmptyState
              icon={<BookOpen size={36} />}
              title="No lessons available"
              description="Lessons will appear here when they are added to this device."
            />
          </Card>
        ) : (
          <div className="student-lesson-list">
            {availableLessons.map((lesson) => (
              <Card key={lesson.id} padding="md" className="student-lesson-card">
                <div className="student-lesson-card__icon">
                  <PlayCircle size={26} />
                </div>
                <div className="student-lesson-card__content">
                  <Badge>{lesson.subject}</Badge>
                  <h3>{lesson.title}</h3>
                  <p>Chapter: {lesson.chapter}</p>
                  <div className="student-lesson-card__status">
                    <CheckCircle2 size={16} />
                    Ready to learn
                  </div>
                </div>
                <Button
                  rightIcon={<ArrowRight size={18} />}
                  onClick={() => navigate(lesson.path)}
                >
                  Open
                </Button>
              </Card>
            ))}
          </div>
        )}
      </section>
    </PageContainer>
  );
}
