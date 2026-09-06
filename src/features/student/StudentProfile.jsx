import { GraduationCap, Languages, User } from "lucide-react";
import { Badge, Card } from "../../components/ui";
import { PageContainer, SectionHeader } from "../../components/layout";
import useAuth from "../auth/useAuth";

export default function StudentProfile() {
  const { user } = useAuth();

  return (
    <PageContainer
      title="My Profile"
      description="Your local learner profile for this device."
    >
      <Card padding="lg">
        <div className="student-profile__header">
          <div className="student-profile__avatar">
            <User size={32} />
          </div>
          <div>
            <Badge>Student</Badge>
            <h2>{user?.name || "Learner"}</h2>
          </div>
        </div>

        <div className="student-profile__details">
          <div>
            <GraduationCap size={20} />
            <span>Grade</span>
            <strong>{user?.grade || 3}</strong>
          </div>
          <div>
            <Languages size={20} />
            <span>Learning language</span>
            <strong>{user?.language?.toUpperCase() || "EN"}</strong>
          </div>
        </div>
      </Card>

      <section className="student-profile__section">
        <SectionHeader
          title="Local profile"
          description="This profile is stored only on the current device."
        />
        <Card padding="md">
          <p>
            No internet connection or online account is required for the
            frontend-only version of SIH 26042.
          </p>
        </Card>
      </section>
    </PageContainer>
  );
}
