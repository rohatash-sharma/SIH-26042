import { ArrowRight, GraduationCap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button, Card, Input, LanguageSwitcher, Select } from "../../components/ui";
import { SUPPORTED_LANGUAGES } from "../../constants/app";
import useAuth from "./useAuth";

const gradeOptions = [
  { value: "3", label: "Grade 3" },
  { value: "4", label: "Grade 4" },
  { value: "5", label: "Grade 5" },
];

export default function StudentSetup() {
  const navigate = useNavigate();
  const { createProfile } = useAuth();

  const [name, setName] = useState("");
  const [grade, setGrade] = useState("3");
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
      role: "student",
      language,
      grade,
    });

    navigate("/student", { replace: true });
  };

  return (
    <main className="auth-page auth-page--form">
      <section className="auth-form-shell">
        <div className="auth-form-heading">
          <div className="auth-role-card__icon" aria-hidden="true">
            <GraduationCap size={28} />
          </div>
          <div>
            <span className="auth-eyebrow">Student setup</span>
            <h1>Set up your student profile</h1>
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

            <Select
              label="Grade"
              value={grade}
              onChange={(event) => setGrade(event.target.value)}
              options={gradeOptions}
              required
            />

            <LanguageSwitcher
              label="Learning language"
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
          Your profile is saved locally so the learner can continue without
          internet access.
        </p>
      </section>
    </main>
  );
}
