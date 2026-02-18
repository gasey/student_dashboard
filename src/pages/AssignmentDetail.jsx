import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../api/apiClient";

export default function AssignmentDetail() {
  const { subjectId, assignmentId } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function fetchDetail() {
      try {
        const res = await api.get(
          `/assignments/${assignmentId}/`
        );
        setAssignment(res.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchDetail();
  }, [assignmentId]);

  async function handleSubmit() {
    if (!selectedFile) return;

    try {
      setSubmitting(true);

      const formData = new FormData();
      formData.append("file", selectedFile);

      await api.post(
        `/assignments/${assignmentId}/submit/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Refresh detail after submit
      const res = await api.get(
        `/assignments/${assignmentId}/`
      );
      setAssignment(res.data);
      setSelectedFile(null);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  }

  if (loading) return <div>Loading...</div>;
  if (!assignment) return <div>Assignment not found.</div>;

  const expired =
    new Date(assignment.due_date) < new Date();

  return (
    <div className="assignmentDetailPage">
      <button onClick={() => navigate(-1)}>
        &lt; Back
      </button>

      <h2>{assignment.title}</h2>

      <p>{assignment.description}</p>

      <p>
        Due:{" "}
        {new Date(
          assignment.due_date
        ).toLocaleString()}
      </p>

      {assignment.attachment && (
        <a
          href={assignment.attachment}
          target="_blank"
          rel="noreferrer"
        >
          Download Attachment
        </a>
      )}

      <hr />

      <h3>Status: {assignment.submission_status}</h3>

      {assignment.submitted_file && (
        <div>
          <p>
            Submitted at:{" "}
            {new Date(
              assignment.submitted_at
            ).toLocaleString()}
          </p>
          <a
            href={assignment.submitted_file}
            target="_blank"
            rel="noreferrer"
          >
            View Submitted File
          </a>
        </div>
      )}

      {!expired &&
        assignment.submission_status !==
          "SUBMITTED" && (
          <div>
            <input
              type="file"
              onChange={(e) =>
                setSelectedFile(e.target.files[0])
              }
            />
            <button
              onClick={handleSubmit}
              disabled={submitting}
            >
              {submitting
                ? "Submitting..."
                : "Submit Assignment"}
            </button>
          </div>
        )}

      {expired && (
        <div style={{ color: "red" }}>
          Assignment expired.
        </div>
      )}
    </div>
  );
}
