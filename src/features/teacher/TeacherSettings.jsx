import { Database, Languages, Settings, ShieldCheck } from "lucide-react";
import { Card } from "../../components/ui";
import { PageContainer, SectionHeader } from "../../components/layout";
import { LogoutButton } from "../auth";

export default function TeacherSettings() {
  return (
    <PageContainer
      title="Teacher Settings"
      description="Manage local preferences and device-based classroom settings."
    >
      <section className="teacher-settings__section">
        <SectionHeader
          title="Preferences"
          description="These settings apply to the current device."
        />

        <Card padding="md">
          <div className="teacher-settings__row">
            <div className="teacher-settings__icon">
              <Languages size={22} />
            </div>
            <div>
              <h3>Languages</h3>
              <p>Configure the interface and learning languages.</p>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="teacher-settings__row">
            <div className="teacher-settings__icon">
              <Database size={22} />
            </div>
            <div>
              <h3>Local data</h3>
              <p>Learning data is stored on this device using local storage and IndexedDB.</p>
            </div>
          </div>
        </Card>

        <Card padding="md">
          <div className="teacher-settings__row">
            <div className="teacher-settings__icon">
              <ShieldCheck size={22} />
            </div>
            <div>
              <h3>Offline-first privacy</h3>
              <p>No teacher account is required for the frontend-only version.</p>
            </div>
          </div>
        </Card>
      </section>

      <section className="teacher-settings__section">
        <SectionHeader
          title="Profile"
          description="Switch the local profile currently active on this device."
        />
        <Card padding="md">
          <LogoutButton />
        </Card>
      </section>

      <div className="teacher-settings__footer">
        <Settings size={18} />
        <span>SIH 26042 Teacher Mode</span>
      </div>
    </PageContainer>
  );
}
