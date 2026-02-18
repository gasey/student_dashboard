import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/apiClient";
import AssignmentPendingCard from "../components/AssignmentPendingCard";
import AssignmentCompletedCard from "../components/AssignmentCompletedCard";
import "../styles/assignmentPending.css";

export default function SubjectsAssignments() {
  const { subjectId } = useParams();
  const navigate = useNavigate();

  const [activeTab, setActiveTab] = useState("pending");
  const [pendingData, setPendingData] = useState([]);
  const [completedData, setCompletedData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchAssignments() {
      try {
        setLoading(true);
        const res = await api.get(
          `/assignments/subjects/${subjectId}/`
        );

        const pending = [];
        const completed = [];

        res.data.forEach((assignment) => {
          if (assignment.status === "SUBMITTED") {
            completed.push(assignment);
          } else {
            pending.push(assignment);
          }
        });

        setPendingData(pending);
        setCompletedData(completed);
      } catch (err) {
        console.error(err);
        setError("Failed to load assignments.");
      } finally {
        setLoading(false);
      }
    }

    fetchAssignments();
  }, [subjectId]);

  if (loading) return <div>Loading assignments...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="assignmentPage">
      <div className="assignmentBox">
        <button
          className="assignmentBack"
          onClick={() => navigate(-1)}
        >
          &lt; Back
        </button>

        <h2 className="assignmentSubjectTitle">
          Assignments
        </h2>

        <div className="assignmentHeader">
          <div className="assignmentTabs">
            <button
              className={`assignmentTab ${
                activeTab === "pending"
                  ? "assignmentTab--active"
                  : ""
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pending ({pendingData.length})
            </button>

            <button
              className={`assignmentTab ${
                activeTab === "completed"
                  ? "assignmentTab--active"
                  : ""
              }`}
              onClick={() => setActiveTab("completed")}
            >
              Completed ({completedData.length})
            </button>
          </div>
        </div>

        <div className="assignmentGrid">
          {activeTab === "pending" &&
            (pendingData.length === 0 ? (
              <div>No pending assignments.</div>
            ) : (
              pendingData.map((item) => (
                <AssignmentPendingCard
                  key={item.id}
                  title={item.title}
                  deadline={new Date(
                    item.due_date
                  ).toLocaleString()}
                  onClick={() =>
                    navigate(
                      `/subjects/${subjectId}/assignments/${item.id}`
                    )
                  }
                />
              ))
            ))}

          {activeTab === "completed" &&
            (completedData.length === 0 ? (
              <div>No completed assignments.</div>
            ) : (
              completedData.map((item) => (
                <AssignmentCompletedCard
                  key={item.id}
                  title={item.title}
                  completedDate="Submitted"
                  onClick={() =>
                    navigate(
                      `/subjects/${subjectId}/assignments/${item.id}`
                    )
                  }
                />
              ))
            ))}
        </div>
      </div>
    </div>
  );
}
