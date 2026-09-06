import { Plus, Save, Trash2 } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, Select, Textarea } from "../../components/ui";
import { PageContainer, SectionHeader } from "../../components/layout";
import { useLessonActions } from "./useLessons";

const languageOptions = [
  { value: "en", label: "English" },
  { value: "hi", label: "Hindi" },
  { value: "sat", label: "Santhali" },
];

const gradeOptions = [
  { value: "3", label: "Grade 3" },
  { value: "4", label: "Grade 4" },
  { value: "5", label: "Grade 5" },
];

export default function LessonEditor() {
  const navigate = useNavigate();
  const { createOrUpdateLesson, isSaving } = useLessonActions();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [grade, setGrade] = useState("3");
  const [language, setLanguage] = useState("en");
  const [sections, setSections] = useState([
    { id: `section_${Date.now()}`, heading: "", content: "" },
  ]);
  const [error, setError] = useState("");

  const updateSection = (id, field, value) => {
    setSections((current) =>
      current.map((section) =>
        section.id === id ? { ...section, [field]: value } : section,
      ),
    );
  };

  const addSection = () => {
    setSections((current) => [
      ...current,
      {
        id: `section_${Date.now()}_${current.length}`,
        heading: "",
        content: "",
      },
    ]);
  };

  const removeSection = (id) => {
    setSections((current) =>
      current.length === 1
        ? current
        : current.filter((section) => section.id !== id),
    );
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!title.trim()) {
      setError("Please enter a lesson title.");
      return;
    }

    const hasContent = sections.some((section) => section.content.trim());

    if (!hasContent) {
      setError("Add content to at least one lesson section.");
      return;
    }

    const lesson = {
      id: `lesson_${Date.now()}`,
      grade: Number(grade),
      subjectId: "evs",
      chapterId: null,
      defaultLanguage: language,
      languages: [language],
      title: { [language]: title.trim() },
      description: description.trim(),
      sections: sections.map((section) => ({
        id: section.id,
        type: "text",
        heading: section.heading.trim()
          ? { [language]: section.heading.trim() }
          : undefined,
        content: { [language]: section.content.trim() },
      })),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    await createOrUpdateLesson(lesson);
    navigate("/teacher/content");
  };

  return (
    <PageContainer
      title="Create Lesson"
      description="Build a lesson that can be stored and used offline."
    >
      <form onSubmit={handleSubmit} className="lesson-editor">
        <Card padding="lg">
          <SectionHeader
            title="Lesson details"
            description="Start with the basic information."
          />

          <div className="lesson-editor__fields">
            <Input
              label="Lesson title"
              value={title}
              onChange={(event) => {
                setTitle(event.target.value);
                setError("");
              }}
              placeholder="e.g. Water"
              required
            />

            <Textarea
              label="Description"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Briefly describe what students will learn."
              rows={4}
            />

            <div className="lesson-editor__row">
              <Select
                label="Grade"
                value={grade}
                onChange={(event) => setGrade(event.target.value)}
                options={gradeOptions}
              />
              <Select
                label="Content language"
                value={language}
                onChange={(event) => setLanguage(event.target.value)}
                options={languageOptions}
              />
            </div>
          </div>
        </Card>

        <Card padding="lg">
          <SectionHeader
            title="Lesson sections"
            description="Add the learning material section by section."
            action={
              <Button
                type="button"
                variant="outline"
                leftIcon={<Plus size={18} />}
                onClick={addSection}
              >
                Add section
              </Button>
            }
          />

          <div className="lesson-editor__sections">
            {sections.map((section, index) => (
              <div key={section.id} className="lesson-editor__section">
                <div className="lesson-editor__section-header">
                  <strong>Section {index + 1}</strong>
                  <Button
                    type="button"
                    variant="ghost"
                    leftIcon={<Trash2 size={17} />}
                    disabled={sections.length === 1}
                    onClick={() => removeSection(section.id)}
                  >
                    Remove
                  </Button>
                </div>

                <Input
                  label="Section heading"
                  value={section.heading}
                  onChange={(event) =>
                    updateSection(section.id, "heading", event.target.value)
                  }
                  placeholder="Optional heading"
                />

                <Textarea
                  label="Learning content"
                  value={section.content}
                  onChange={(event) => {
                    updateSection(section.id, "content", event.target.value);
                    setError("");
                  }}
                  placeholder="Write the lesson content..."
                  rows={6}
                  required
                />
              </div>
            ))}
          </div>
        </Card>

        {error ? <p className="lesson-editor__error">{error}</p> : null}

        <div className="lesson-editor__actions">
          <Button
            type="button"
            variant="ghost"
            onClick={() => navigate(-1)}
          >
            Cancel
          </Button>
          <Button
            type="submit"
            leftIcon={<Save size={18} />}
            loading={isSaving}
          >
            Save lesson
          </Button>
        </div>
      </form>
    </PageContainer>
  );
}
