import { ArrowLeft, Edit3, Trash2 } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { Button, Card, EmptyState } from "../../components/ui";
import { PageContainer } from "../../components/layout";
import { useLesson, useLessonActions } from "./useLessons";

export default function LessonDetail() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { lesson, isLoading } = useLesson(lessonId);
  const { removeLesson, isSaving } = useLessonActions();

  if (isLoading) {
    return <PageContainer title="Lesson">Loading...</PageContainer>;
  }

  if (!lesson) {
    return (
      <PageContainer title="Lesson not found">
        <Card padding="lg">
          <EmptyState
            title="Lesson not found"
            description="This lesson is not stored on this device."
            action={
              <Button
                leftIcon={<ArrowLeft size={18} />}
                onClick={() => navigate("/teacher/content")}
              >
                Back to content
              </Button>
            }
          />
        </Card>
      </PageContainer>
    );
  }

  const title =
    lesson.title?.[lesson.defaultLanguage || "en"] ||
    lesson.title?.en ||
    Object.values(lesson.title || {})[0] ||
    "Untitled lesson";

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Delete this lesson from the local device?",
    );

    if (!confirmed) return;

    await removeLesson(lesson.id);
    navigate("/teacher/content");
  };

  return (
    <PageContainer
      title={title}
      description={lesson.description}
      action={
        <div className="lesson-detail__actions">
          <Button
            variant="outline"
            leftIcon={<Edit3 size={17} />}
            onClick={() => navigate(`/teacher/lessons/${lesson.id}/edit`)}
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
      <div className="lesson-detail__sections">
        {(lesson.sections || []).map((section, index) => {
          const heading =
            section.heading?.[lesson.defaultLanguage || "en"] ||
            section.heading?.en ||
            Object.values(section.heading || {})[0];

          const content =
            section.content?.[lesson.defaultLanguage || "en"] ||
            section.content?.en ||
            Object.values(section.content || {})[0] ||
            "";

          return (
            <Card key={section.id || index} padding="lg">
              <span className="lesson-detail__section-number">
                Section {index + 1}
              </span>
              {heading ? <h2>{heading}</h2> : null}
              <p>{content}</p>
            </Card>
          );
        })}
      </div>
    </PageContainer>
  );
}
