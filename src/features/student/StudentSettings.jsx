import { Database, Languages, ShieldCheck } from "lucide-react";
import { Card } from "../../components/ui";
import { PageContainer, SectionHeader } from "../../components/layout";
import { LogoutButton } from "../auth";

export default function StudentSettings() {
  return (
    <PageContainer
      title="Student Settings"
      description="Manage local learning preferences on this device."
    >
      <section className="student-settings__section">
        <SectionHeader
          title="Learning preferences"
          description="These settings apply to this device."
        />

        <Card padding="md">
          <div className="student-settings__row">
            <Languages size={22} />
            <div>
              <h3>Language</h3>
              <p>Choose the language used for your learning content.</p>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="student-settings__row">
            <Database size={22} />
            <div>
              <h3>Local learning data</h3>
              <p>Your progress and activity data are kept on this device.</p>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="student-settings__row">
            <ShieldCheck size={22} />
            <div>
              <h3>Offline-first</h3>
              <p>You can continue learning when the internet is unavailable.</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="student-settings__section">
        <SectionHeader
          title="Profile"
          description="Switch the active learner profile."
        />
        <Card padding="md">
          <LogoutButton />
        </Card>
      </section>
    </PageContainer>
  );
}
