import { ArrowRight, BookOpen, Calculator, LockKeyhole } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Badge, Card } from "../../components/ui";
import { Grid, PageContainer } from "../../components/layout";
import useAuth from "../auth/useAuth";

const subjects = [
  {
    id: "evs",
    name: "Environmental Studies",
    code: "EVS",
    description: "Learn about water, plants, animals, people, and the world around you.",
    icon: BookOpen,
    available: true,
    path: "/student/subjects/evs",
  },
  {
    id: "math",
    name: "Mathematics",
    code: "Math",
    description: "Build confidence with numbers, shapes, patterns, and calculations.",
    icon: Calculator,
    available: true,
    path: "/student/subjects/math",
  },
];

export default function StudentSubjects() {
  const navigate = useNavigate();
  const { user } = useAuth();

  return (
    <PageContainer
      title="My Subjects"
      description={`Grade ${user?.grade || 3} learning subjects available on this device.`}
    >
      <Grid columns={2}>
        {subjects.map(
          ({ id, name, code, description, icon: Icon, available, path }) => (
            <Card
              key={id}
              padding="lg"
              className={`student-subject-card ${
                !available ? "student-subject-card--locked" : ""
              }`}
              onClick={() => available && navigate(path)}
            >
              <div className="student-subject-card__icon">
                <Icon size={30} />
              </div>
              <Badge>{code}</Badge>
              <h2>{name}</h2>
              <p>{description}</p>

              <div className="student-subject-card__footer">
                {available ? (
                  <>
                    <span>Start learning</span>
                    <ArrowRight size={20} />
                  </>
                ) : (
                  <>
                    <span>Coming soon</span>
                    <LockKeyhole size={20} />
                  </>
                )}
              </div>
            </Card>
          ),
        )}
      </Grid>
    </PageContainer>
  );
}
