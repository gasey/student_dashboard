import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import "../styles/subjectDetails.css";

export default function SubjectDetails() {
  const navigate = useNavigate();
  const { subjectId } = useParams(); // 👈 future backend id

  /* ===============================
     STATE
  =============================== */
  const [subjectDetails, setSubjectDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  /* ===============================
     FETCH SUBJECT DETAILS (BACKEND READY)
  =============================== */
  useEffect(() => {
    // 🔹 MOCK BACKEND RESPONSE (remove later)
    const mockSubjectDetails = {
      name: "Subject Name",
      teacher: {
        name: "Ms. Ruatfeli",
        subjects: "Maths & Science",
        qualification: "M.Sc",
        role: "Teaching/Lo pu tu",
        rating: "TBA Letter",
        about: "-",
        photo:
          "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
      },
      recordingsCount: 12,
      upcomingSessions: [
        {
          title: "Cell Division & Mitosis",
          date: "Thursday, 28 Jan",
          time: "10:00 am – 12:00 pm",
        },
        {
          title: "Genetics Basics",
          date: "Friday, 29 Jan",
          time: "11:00 am – 1:00 pm",
        },
        {
          title: "Photosynthesis",
          date: "Monday, 1 Feb",
          time: "9:00 am – 11:00 am",
        },
        {
          title: "Human Anatomy",
          date: "Wednesday, 3 Feb",
          time: "10:00 am – 12:00 pm",
        },
      ],
      studyMaterialsCount: 8,
      assignments: {
        pending: 4,
        completed: 12,
        total: 16,
      },
      quizzes: {
        pending: 6,
        completed: 8,
        total: 14,
      },
    };

    /*
    // 🔌 REAL BACKEND (use later)
    fetch(`/api/subjects/${subjectId}`)
      .then((res) => res.json())
      .then((data) => setSubjectDetails(data))
      .finally(() => setLoading(false));
    */
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

    setSubjectDetails(mockSubjectDetails);
    setLoading(false);
  }, [subjectId]);

  if (loading) return <div>Loading...</div>;
  if (!subjectDetails) return <div>No data found</div>;

  /* ===============================
     UI (UNCHANGED STRUCTURE)
  =============================== */
  return (
    <div className="subjectDetailsPage">
      <div className="subjectDetailsBox">
        {/* Top bar */}
        <div className="subjectDetailsTop">
          <button className="backBtn" onClick={() => navigate(-1)}>
            &larr; Back
          </button>
        </div>

        {/* Title */}
        <h1 className="subjectNameTitle">{subjectDetails.name}</h1>

        {/* TOP GRID */}
        <div className="topGrid">
          {/* Teacher card */}
          <div className="teacherDetailsCard">
            <div className="teacherLeft">
              <h3 className="teacherName">
                {subjectDetails.teacher?.name}
              </h3>

              <div className="teacherInfoGrid">
                <div className="teacherInfoRow">
                  <span className="label">Subjects:</span>
                  <span className="value">
                    {subjectDetails.teacher?.subjects}
                  </span>
                </div>

                <div className="teacherInfoRow">
                  <span className="label">Qualification:</span>
                  <span className="value">
                    {subjectDetails.teacher?.qualification}
                  </span>
                </div>

                <div className="teacherInfoRow">
                  <span className="label">Role:</span>
                  <span className="value">
                    {subjectDetails.teacher?.role}
                  </span>
                </div>

                <div className="teacherInfoRow">
                  <span className="label">Rating:</span>
                  <span className="value">
                    {subjectDetails.teacher?.rating}
                  </span>
                </div>

                <div className="teacherInfoRow">
                  <span className="label">About:</span>
                  <span className="value">
                    {subjectDetails.teacher?.about}
                  </span>
                </div>
              </div>
            </div>

            <div className="teacherRight">
              <img
                src={subjectDetails.teacher?.photo}
                alt={subjectDetails.teacher?.name}
                className="teacherPhoto"
              />
            </div>
          </div>

          {/* Recordings */}
          <div className="miniStatCard">
            <h3 className="miniStatTitle">Session Recordings</h3>
            <div className="miniStatNumber">
              {subjectDetails.recordingsCount}
            </div>
            <div className="miniStatText">Recordings</div>
          </div>
        </div>

        {/* SECOND GRID */}
        <div className="secondGrid">
          {/* Upcoming sessions */}
          <div className="liveSessionsCard">
            <h3 className="cardTitleMain">Upcoming Live Sessions</h3>

            <div className="sessionsGridInside">
              {subjectDetails.upcomingSessions.map((session, index) => (
                <div className="sessionItem" key={index}>
                  <h4 className="sessionItemTitle">{session.title}</h4>
                  <p className="sessionItemText">{session.date}</p>
                  <p className="sessionItemText">{session.time}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Study materials */}
          <div className="miniStatCard">
            <h3 className="miniStatTitle">Study Materials</h3>
            <div className="miniStatNumber">
              {subjectDetails.studyMaterialsCount}
            </div>
            <div className="miniStatText">Documents</div>
          </div>
        </div>

        {/* BOTTOM GRID */}
        <div className="bottomGrid">
          {/* Assignments */}
          <div className="assignQuizCard">
            <h2 className="assignQuizCardTitle">Assignments</h2>

            <div className="metricsRow">
              <div className="metricCol">
                <div className="metricNum blueBig">
                  {subjectDetails.assignments.pending}
                </div>
                <div className="metricText">Pending</div>
              </div>

              <div className="metricCol">
                <div className="metricNum blueBig">
                  {subjectDetails.assignments.completed}
                </div>
                <div className="metricText">Completed</div>
              </div>

              <div className="metricCol">
                <div className="metricNum blueBig">
                  {subjectDetails.assignments.total}
                </div>
                <div className="metricText">Total</div>
              </div>
            </div>
          </div>

          {/* Quiz */}
          <div className="assignQuizCard">
            <h2 className="assignQuizCardTitle">Quiz</h2>

            <div className="metricsRow">
              <div className="metricCol">
                <div className="metricNum blueBig">
                  {subjectDetails.quizzes.pending}
                </div>
                <div className="metricText">Pending</div>
              </div>

              <div className="metricCol">
                <div className="metricNum blueBig">
                  {subjectDetails.quizzes.completed}
                </div>
                <div className="metricText">Completed</div>
              </div>

              <div className="metricCol">
                <div className="metricNum blueBig">
                  {subjectDetails.quizzes.total}
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
