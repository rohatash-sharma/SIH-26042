import { ArrowRight, BookOpen, GraduationCap, WifiOff } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../../components/ui";
import { APP_DESCRIPTION, APP_NAME } from "../../constants/app";

export default function WelcomePage() {
  const navigate = useNavigate();

  return (
    <main className="auth-page auth-page--welcome">
      <section className="auth-hero">
        <div className="auth-brand">
          <div className="auth-brand__icon" aria-hidden="true">
            <BookOpen size={30} />
          </div>
          <span>{APP_NAME}</span>
        </div>

        <div className="auth-hero__content">
          <span className="auth-eyebrow">Offline-first learning</span>
          <h1>Learning that keeps going, even without the internet.</h1>
          <p>{APP_DESCRIPTION}</p>

          <div className="auth-feature-row">
            <div className="auth-feature">
              <WifiOff size={20} />
              <span>Works offline</span>
            </div>
            <div className="auth-feature">
              <GraduationCap size={20} />
              <span>Teacher & student modes</span>
            </div>
          </div>

          <Button
            size="lg"
            rightIcon={<ArrowRight size={20} />}
            onClick={() => navigate("/auth/role")}
          >
            Get started
          </Button>
        </div>
      </section>

      <section className="auth-page__panel">
        <Card padding="lg">
          <h2>Built for real classrooms</h2>
          <p>
            Your learning profiles, lessons, quizzes, flashcards, and progress
            can stay on the device.
          </p>
        </Card>
      </section>
    </main>
  );
}
