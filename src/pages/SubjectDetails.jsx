import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import api from "../api/apiClient";
import "../styles/subjectDetails.css";

export default function SubjectDetails() {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const [subjectDetails, setSubjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchSubject() {
      try {
        setLoading(true);
        const res = await api.get(`/subjects/${subjectId}/`);
        setSubjectDetails(res.data);
      } catch (err) {
        console.error("Failed to load subject", err);
        setError("Failed to load subject.");
      } finally {
        setLoading(false);
      }
    }

    if (subjectId) {
      fetchSubject();
    }
  }, [subjectId]);

  if (loading) return <div>Loading subject...</div>;
  if (error) return <div>{error}</div>;
  if (!subjectDetails) return <div>No subject found</div>;

  return (
    <div className="subjectDetailsPage">
      <div className="subjectDetailsBox">

        {/* Top bar */}
        <div className="subjectDetailsTop">
          <button className="backBtn" onClick={() => navigate(-1)}>
            ← Back
          </button>
        </div>

        {/* Title */}
        <h1 className="subjectNameTitle">
          {subjectDetails.name}
        </h1>

        {/* TOP GRID */}
        <div className="topGrid">

          {/* Teacher Card */}
          <div className="teacherDetailsCard">
            <div className="teacherLeft">
              <h3 className="teacherName">
                {subjectDetails.teacher_name}
              </h3>

              <div className="teacherInfoGrid">
                <div className="teacherInfoRow">
                  <span className="label">Course:</span>
                  <span className="value">
                    {subjectDetails.course_name}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Recordings */}
          <div className="miniStatCard">
            <h3 className="miniStatTitle">
              Session Recordings
            </h3>
            <div className="miniStatNumber">
              {subjectDetails.recordings_count || 0}
            </div>
            <div className="miniStatText">
              Recordings
            </div>
          </div>

        </div>

        {/* SECOND GRID */}
        <div className="secondGrid">

          {/* Study Materials */}
          <div className="miniStatCard">
            <h3 className="miniStatTitle">
              Study Materials
            </h3>
            <div className="miniStatNumber">
              {subjectDetails.study_material_count || 0}
            </div>
            <div className="miniStatText">
              Documents
            </div>
          </div>

        </div>

        {/* BOTTOM GRID */}
        <div className="bottomGrid">

          {/* Assignments */}
          <div
            className="assignQuizCard clickableCard"
            onClick={() =>
              navigate(`/subjects/${subjectId}/assignments`)
            }
          >
            <h2 className="assignQuizCardTitle">
              Assignments
            </h2>

            <div className="metricsRow">
              <div className="metricCol">
                <div className="metricNum blueBig">
                  {subjectDetails.assignments_pending || 0}
                </div>
                <div className="metricText">Pending</div>
              </div>

              <div className="metricCol">
                <div className="metricNum blueBig">
                  {subjectDetails.assignments_completed || 0}
                </div>
                <div className="metricText">Completed</div>
              </div>

              <div className="metricCol">
                <div className="metricNum blueBig">
                  {subjectDetails.assignments_total || 0}
                </div>
                <div className="metricText">Total</div>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <div className="assignQuizCard">
            <h2 className="assignQuizCardTitle">
              Quiz
            </h2>

            <div className="metricsRow">
              <div className="metricCol">
                <div className="metricNum blueBig">
                  {subjectDetails.quiz_pending || 0}
                </div>
                <div className="metricText">Pending</div>
              </div>

              <div className="metricCol">
                <div className="metricNum blueBig">
                  {subjectDetails.quiz_completed || 0}
                </div>
                <div className="metricText">Completed</div>
              </div>

              <div className="metricCol">
                <div className="metricNum blueBig">
                  {subjectDetails.quiz_total || 0}
                </div>
                <div className="metricText">Total</div>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
