import { useState } from "react";
import { useNavigate } from "react-router-dom";
import AssignmentPendingCard from "../components/AssignmentPendingCard";
import AssignmentCompletedCard from "../components/AssignmentCompletedCard";
import "../styles/assignmentPending.css";

export default function SubjectsAssignments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("pending");

  const pendingData = [
    {
      id: 1,
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
      title: "Asgn./Quiz - X",
      teacher: "Teacher Name",
      deadline: "Date & Time (Deadline)",
    },
    {
      id: 2,
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
      title: "Asgn./Quiz - X",
      teacher: "Teacher Name",
      deadline: "Date & Time (Deadline)",
    },
    {
      id: 3,
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
      title: "Asgn./Quiz - X",
      teacher: "Teacher Name",
      deadline: "Date & Time (Deadline)",
    },
    {
      id: 4,
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
      title: "Asgn./Quiz - X",
      teacher: "Teacher Name",
      deadline: "Date & Time (Deadline)",
    },
    {
      id: 5,
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
      title: "Asgn./Quiz - X",
      teacher: "Teacher Name",
      deadline: "Date & Time (Deadline)",
    },
    {
      id: 6,
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
      title: "Asgn./Quiz - X",
      teacher: "Teacher Name",
      deadline: "Date & Time (Deadline)",
    },
    {
      id: 7,
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
      title: "Asgn./Quiz - X",
      teacher: "Teacher Name",
      deadline: "Date & Time (Deadline)",
    },
  ];

  const completedData = [
    {
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
      title: "Asgn./Quiz - X",
      teacher: "Teacher Name",
      completedDate: "Date & Time (Completed)",
    },
    {
      img: "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=600",
      title: "Asgn./Quiz - X",
      teacher: "Teacher Name",
      completedDate: "Date & Time (Completed)",
    },
    {
      img: "https://images.unsplash.com/photo-1497633762265-9d179a990aa6?w=600",
      title: "Asgn./Quiz - X",
      teacher: "Teacher Name",
      completedDate: "Date & Time (Completed)",
    },
    {
      img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
      title: "Asgn./Quiz - X",
      teacher: "Teacher Name",
      completedDate: "Date & Time (Completed)",
    },
    {
      img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=600",
      title: "Asgn./Quiz - X",
      teacher: "Teacher Name",
      completedDate: "Date & Time (Completed)",
    },
  ];

  return (
    <div className="assignmentPage">
      <div className="assignmentBox">
        {/* Back Button */}
        <button className="assignmentBack" onClick={() => navigate(-1)}>
          &lt; Back
        </button>

        {/* Subject Title */}
        <h2 className="assignmentSubjectTitle">Subject Name</h2>

        {/* Tabs and Search Row */}
        <div className="assignmentHeader">
          <div className="assignmentTabs">
            <button
              className={`assignmentTab ${activeTab === "pending" ? "assignmentTab--active" : ""}`}
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </button>
            <button
              className={`assignmentTab ${activeTab === "completed" ? "assignmentTab--active" : ""}`}
              onClick={() => setActiveTab("completed")}
            >
              Completed
            </button>
          </div>

          <div className="assignmentSearch">
            <input placeholder="Search..." />
            <span className="assignmentSearchIcon">🔍</span>
          </div>
        </div>

        {/* Assignment Cards Grid */}
        <div className="assignmentGrid">
          {activeTab === "pending" &&
            pendingData.map((item) => (
              <AssignmentPendingCard key={item.id} {...item} />
            ))}
          {activeTab === "completed" &&
            completedData.map((item, idx) => (
              <AssignmentCompletedCard key={idx} {...item} />
            ))}
        </div>
      </div>
    </div>
  );
}
