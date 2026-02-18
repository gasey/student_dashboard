import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/apiClient";

export default function SubjectsAssignments() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        const res = await api.get(
          `/assignments/subjects/${subjectId}/`
        );
        setAssignments(res.data);
      } catch (err) {
        console.error("Failed to load assignments", err);
      } finally {
        setLoading(false);
      }
    }

    fetchAssignments();
  }, [subjectId]);

  if (loading) return <div>Loading assignments...</div>;

  return (
    <div>
      <button onClick={() => navigate(-1)}>← Back</button>
      <h2>Assignments</h2>

      {assignments.length === 0 && (
        <div>No assignments found.</div>
      )}

      {assignments.map((a) => (
        <div
          key={a.id}
          onClick={() =>
            navigate(
              `/subjects/${subjectId}/assignments/${a.id}`
            )
          }
          style={{
            padding: "12px",
            marginBottom: "10px",
            background: "#eee",
            cursor: "pointer",
          }}
        >
          <h4>{a.title}</h4>
          <p>Due: {new Date(a.due_date).toLocaleString()}</p>
        </div>
      ))}
    </div>
  );
}
