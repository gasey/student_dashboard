import { useNavigate } from "react-router-dom";
import { useCourse } from "../contexts/CourseContext";

export default function Subjects() {
  const { subjects, loading } = useCourse();
  const navigate = useNavigate();

  if (loading) return <div>Loading subjects...</div>;

  return (
    <div>
      <h2>Subjects</h2>

      {subjects.length === 0 && <div>No subjects found.</div>}

      {subjects.map((subject) => (
        <div
          key={subject.id}
          onClick={() => navigate(`/subjects/${subject.id}`)}
          style={{
            padding: "12px",
            marginBottom: "10px",
            background: "#eee",
            cursor: "pointer",
          }}
        >
          {subject.name}
        </div>
      ))}
    </div>
  );
}
