import { ArrowRight, GraduationCap, School } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button, Card } from "../../components/ui";
import useAuth from "./useAuth";

const roles = [
  {
    id: "teacher",
    title: "I am a Teacher",
    description: "Create learning activities and help students learn offline.",
    icon: School,
    path: "/auth/teacher-setup",
  },
  {
    id: "student",
    title: "I am a Student",
    description: "Learn lessons, practise quizzes, and track your progress.",
    icon: GraduationCap,
    path: "/auth/student-setup",
  },
];

export default function RoleSelection() {
  const navigate = useNavigate();
  const { loginAsRole } = useAuth();

  const handleSelect = (role, path) => {
    loginAsRole(role);
    navigate(path);
  };

  return (
    <main className="auth-page auth-page--selection">
      <section className="auth-page__panel">
        <span className="auth-eyebrow">Step 1 of 2</span>
        <h1>Who are you?</h1>
        <p className="auth-page__description">
          Choose how you want to use SIH 26042 on this device.
        </p>

        <div className="auth-role-grid">
          {roles.map(({ id, title, description, icon: Icon, path }) => (
            <Card
              key={id}
              className="auth-role-card"
              padding="lg"
              onClick={() => handleSelect(id, path)}
            >
              <div className="auth-role-card__icon" aria-hidden="true">
                <Icon size={30} />
              </div>
              <div>
                <h2>{title}</h2>
                <p>{description}</p>
              </div>
              <ArrowRight className="auth-role-card__arrow" size={22} />
            </Card>
          ))}
        </div>

        <Button variant="ghost" onClick={() => navigate("/")}>
          Back
        </Button>
      </section>
    </main>
  );
}
