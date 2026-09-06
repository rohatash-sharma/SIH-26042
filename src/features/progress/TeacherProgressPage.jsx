import { useEffect, useState } from "react";
import { BarChart3, Users } from "lucide-react";
import db from "../../db/database";
import { EmptyState, LoadingScreen, ErrorState } from "../../components/common";
import { calculateScorePercentage } from "./progressService";

export default function TeacherProgressPage() {
  const [records, setRecords] = useState([]);
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function load() {
      setLoading(true);
      setError("");

      try {
        const [progress, users] = await Promise.all([
          db.progress.toArray(),
          db.users.where("role").equals("student").toArray(),
        ]);

        if (active) {
          setRecords(progress);
          setStudents(users);
        }
      } catch (err) {
        if (active) setError(err?.message || "Unable to load student progress.");
      } finally {
        if (active) setLoading(false);
      }
    }

    load();
    return () => {
      active = false;
    };
  }, []);

  if (loading) return <LoadingScreen message="Loading student progress..." />;
  if (error) return <ErrorState message={error} />;

  const studentRows = students.map((student) => {
    const studentRecords = records.filter(
      (record) => record.studentId === student.id,
    );
    const scored = studentRecords.filter(
      (record) => Number(record.total) > 0,
    );
    const average = scored.length
      ? Math.round(
          scored.reduce(
            (sum, record) =>
              sum + calculateScorePercentage(record.score, record.total),
            0,
          ) / scored.length,
        )
      : 0;

    return {
      ...student,
      completed: studentRecords.length,
      average,
    };
  });

  return (
    <main className="progress-page">
      <header className="progress-page__header">
        <span className="eyebrow">
          <BarChart3 size={16} />
          Teacher Analytics
        </span>
        <h1>Student Progress</h1>
        <p>Review locally stored learning activity from students on this device.</p>
      </header>

      {!students.length ? (
        <EmptyState
          title="No students found"
          description="Student profiles and their local progress will appear here once they are created."
          icon={Users}
        />
      ) : (
        <section className="teacher-progress-table">
          <div className="teacher-progress-table__header">
            <span>Student</span>
            <span>Grade</span>
            <span>Activities</span>
            <span>Average</span>
          </div>

          {studentRows.map((student) => (
            <div className="teacher-progress-table__row" key={student.id}>
              <strong>{student.name || "Student"}</strong>
              <span>{student.grade || "—"}</span>
              <span>{student.completed}</span>
              <span>{student.average}%</span>
            </div>
          ))}
        </section>
      )}

      <p className="progress-local-note">
        Progress is stored locally using IndexedDB. No student data is sent to
        a remote server.
      </p>
    </main>
  );
}
