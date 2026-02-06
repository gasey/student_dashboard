import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import RecordingCard from "../components/RecordingCard";
import "../styles/recordings.css";

export default function RecordingsList() {
  const navigate = useNavigate();
  const { id: subjectId } = useParams();

  // State for data (future backend data)
  const [recordingsData, setRecordingsData] = useState([]);

  // Mock data (simulates backend response)
  useEffect(() => {
    const mockRecordingsData = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
      subject: "Subject Name",
      sessionTitle: "Session Title/Topic",
      teacher: "Teacher Name",
      sessionDate: "Date & Time (Session date)",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
      subject: "Subject Name",
      sessionTitle: "Session Title/Topic",
      teacher: "Teacher Name",
      sessionDate: "Date & Time (Session date)",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
      subject: "Subject Name",
      sessionTitle: "Session Title/Topic",
      teacher: "Teacher Name",
      sessionDate: "Date & Time (Session date)",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
      subject: "Subject Name",
      sessionTitle: "Session Title/Topic",
      teacher: "Teacher Name",
      sessionDate: "Date & Time (Session date)",
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
      subject: "Subject Name",
      sessionTitle: "Session Title/Topic",
      teacher: "Teacher Name",
      sessionDate: "Date & Time (Session date)",
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
      subject: "Subject Name",
      sessionTitle: "Session Title/Topic",
      teacher: "Teacher Name",
      sessionDate: "Date & Time (Session date)",
    },
    {
      id: 7,
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
      subject: "Subject Name",
      sessionTitle: "Session Title/Topic",
      teacher: "Teacher Name",
      sessionDate: "Date & Time (Session date)",
    },
    {
      id: 8,
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
      subject: "Subject Name",
      sessionTitle: "Session Title/Topic",
      teacher: "Teacher Name",
      sessionDate: "Date & Time (Session date)",
    },
  ];

    setRecordingsData(mockRecordingsData);
  }, []);

  return (
    <div className="recordingsPage">
      <div className="recordingsBox">
        {/* Back Button */}
        <button className="recordingsBack" onClick={() => navigate(-1)}>
          &lt; Back
        </button>

        {/* Subject Title */}
        <h2 className="recordingsSubjectTitle">Subject Name</h2>

        {/* Recordings Grid */}
        <div className="recordingsGrid">
          {recordingsData.map((item) => (
            <RecordingCard
              key={item.id}
              {...item}
              onClick={() => navigate(`/subjects/recordings/${subjectId}/video/${item.id}`)}
            />
          ))}
        </div>
      </div>
    </div>
  );

}

