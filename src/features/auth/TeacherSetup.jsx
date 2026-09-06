import { ArrowRight, School } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, LanguageSwitcher } from "../../components/ui";
import { SUPPORTED_LANGUAGES } from "../../constants/app";
import useAuth from "./useAuth";

export default function TeacherSetup() {
  const navigate = useNavigate();
  const { createProfile } = useAuth();

  const [name, setName] = useState("");
  const [language, setLanguage] = useState("en");
  const [error, setError] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    const trimmedName = name.trim();

    if (!trimmedName) {
      setError("Please enter your name.");
      return;
    }

    createProfile({
      name: trimmedName,
      role: "teacher",
      language,
    });

    navigate("/teacher", { replace: true });
  };

  return (
    <main className="auth-page auth-page--form">
      <section className="auth-form-shell">
        <div className="auth-form-heading">
          <div className="auth-role-card__icon" aria-hidden="true">
            <School size={28} />
          </div>
          <div>
            <span className="auth-eyebrow">Teacher setup</span>
            <h1>Set up your teacher profile</h1>
          </div>
        </div>

        <Card padding="lg">
          <form onSubmit={handleSubmit} className="auth-form">
            <Input
              label="Your name"
              value={name}
              onChange={(event) => {
                setName(event.target.value);
                setError("");
              }}
              placeholder="Enter your name"
              autoComplete="name"
              error={error}
              required
            />

            <LanguageSwitcher
              label="Interface language"
              value={language}
              onChange={setLanguage}
              languages={SUPPORTED_LANGUAGES}
            />

            <div className="auth-form__actions">
              <Button
                type="button"
                variant="ghost"
                onClick={() => navigate("/auth/role")}
              >
                Back
              </Button>
              <Button
                type="submit"
                rightIcon={<ArrowRight size={18} />}
              >
                Continue to dashboard
              </Button>
            </div>
          </form>
        </Card>

        <p className="auth-note">
          This profile is stored locally on this device. No account or internet
          connection is required.
        </p>
      </section>
    </main>
  );
}
