import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
  Languages,
} from "lucide-react";
import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Badge, Button, Card, EmptyState, ProgressBar, Spinner } from "../../components/ui";
import { PageContainer } from "../../components/layout";
import { useLesson } from "./useLessons";
import useAuth from "../auth/useAuth";

export default function LessonViewer() {
  const { lessonId } = useParams();
  const navigate = useNavigate();
  const { language } = useAuth();
  const { lesson, isLoading } = useLesson(lessonId);
  const [sectionIndex, setSectionIndex] = useState(0);

  const sections = lesson?.sections || [];
  const currentSection = sections[sectionIndex];

  const sectionText = useMemo(() => {
    if (!currentSection?.content) return "";
    return (
      currentSection.content[language] ||
      currentSection.content.en ||
      Object.values(currentSection.content)[0] ||
      ""
    );
  }, [currentSection, language]);

  if (isLoading) {
    return (
      <PageContainer title="Lesson">
        <Card padding="lg">
          <div className="lesson-viewer__loading">
            <Spinner />
            <span>Loading lesson...</span>
          </div>
        </Card>
      </PageContainer>
    );
  }

  if (!lesson) {
    return (
      <PageContainer title="Lesson not found">
        <Card padding="lg">
          <EmptyState
            title="This lesson is not available"
            description="The lesson may not have been stored on this device."
            action={
              <Button
                leftIcon={<ArrowLeft size={18} />}
                onClick={() => navigate(-1)}
              >
                Go back
              </Button>
            }
          />
        </Card>
      </PageContainer>
    );
  }

  const title =
    lesson.title?.[language] ||
    lesson.title?.en ||
    Object.values(lesson.title || {})[0] ||
    "Lesson";

  const progress = sections.length
    ? ((sectionIndex + 1) / sections.length) * 100
    : 100;

  const isLast = sectionIndex >= sections.length - 1;

  return (
    <PageContainer
      title={title}
      description={lesson.description}
      action={
        <Button
          variant="ghost"
          leftIcon={<ArrowLeft size={18} />}
          onClick={() => navigate(-1)}
        >
          Back
        </Button>
      }
    >
      <div className="lesson-viewer">
        <div className="lesson-viewer__language">
          <Languages size={17} />
          <span>Learning language: {language?.toUpperCase() || "EN"}</span>
        </div>

        <Card padding="lg">
          <div className="lesson-viewer__header">
            <Badge>
              Section {sections.length ? sectionIndex + 1 : 1}
              {sections.length ? ` of ${sections.length}` : ""}
            </Badge>
            <ProgressBar value={progress} showValue={false} />
          </div>

          {currentSection ? (
            <article className="lesson-viewer__content">
              {currentSection.heading ? (
                <h2>
                  {currentSection.heading?.[language] ||
                    currentSection.heading?.en ||
                    Object.values(currentSection.heading)[0]}
                </h2>
              ) : null}

              {currentSection.type === "image" && currentSection.src ? (
                <img
                  src={currentSection.src}
                  alt={title}
                  className="lesson-viewer__image"
                />
              ) : null}

              <p>{sectionText}</p>
            </article>
          ) : (
            <div className="lesson-viewer__complete">
              <CheckCircle2 size={40} />
              <h2>Lesson complete!</h2>
              <p>You have finished this lesson.</p>
            </div>
          )}

          <div className="lesson-viewer__navigation">
            <Button
              variant="outline"
              leftIcon={<ChevronLeft size={18} />}
              disabled={sectionIndex === 0}
              onClick={() => setSectionIndex((index) => Math.max(0, index - 1))}
            >
              Previous
            </Button>

            {isLast ? (
              <Button
                rightIcon={<CheckCircle2 size={18} />}
                onClick={() => navigate("/student/progress")}
              >
                Finish lesson
              </Button>
            ) : (
              <Button
                rightIcon={<ChevronRight size={18} />}
                onClick={() =>
                  setSectionIndex((index) =>
                    Math.min(sections.length - 1, index + 1),
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
