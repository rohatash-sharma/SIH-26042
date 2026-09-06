import { Users, UserPlus, WifiOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Card, EmptyState } from "../../components/ui";
import { PageContainer, SectionHeader } from "../../components/layout";

export default function TeacherClassroom() {
  const navigate = useNavigate();

  return (
    <PageContainer
      title="Classroom"
      description="Manage learners and prepare classroom activities on this device."
      action={
        <Button
          leftIcon={<UserPlus size={18} />}
          onClick={() => navigate("/teacher/classroom/add-student")}
        >
          Add student
        </Button>
      }
    >
      <Card padding="lg">
        <EmptyState
          icon={<Users size={36} />}
          title="No students added yet"
          description="Add local student profiles to keep classroom progress organised on this device."
          action={
            <Button
              leftIcon={<UserPlus size={18} />}
              onClick={() => navigate("/teacher/classroom/add-student")}
            >
              Add your first student
            </Button>
          }
        />
      </Card>

      <section className="teacher-classroom__offline">
        <SectionHeader
          title="Designed for offline classrooms"
          description="Student profiles and progress can be stored locally."
        />
        <Card padding="md">
          <div className="teacher-classroom__offline-row">
            <WifiOff size={24} />
            <div>
              <strong>Internet is optional</strong>
              <p>
                Classroom data can remain available even when there is no
                network connection.
              </p>
            </div>
          </div>
        </Card>
      </section>
    </PageContainer>
  );
}
