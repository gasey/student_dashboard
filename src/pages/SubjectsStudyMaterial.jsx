import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import SubjectCard from "../components/SubjectCard";
import "../styles/subjects.css";

export default function SubjectsStudyMaterial() {
  const navigate = useNavigate();

  // State for data (future backend data)
  const [subjectData, setSubjectData] = useState([]);

  // Mock data (simulates backend response)
  useEffect(() => {
    const mockSubjectData = [
      {
        id: 1,
        img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
      {
        id: 2,
        img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
      {
        id: 3,
        img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
      {
        id: 4,
        img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
      {
        id: 5,
        img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
      {
        id: 6,
        img: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
      {
        id: 7,
        img: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
      {
        id: 8,
        img: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
    ];

{/*  // example for backend //

  useEffect(() => {
  fetch("/api/subjects-study-material")
    .then((res) => res.json())
    .then((data) => setSubjectData(data));
}, []);

*/}

    setSubjectData(mockSubjectData);
  }, []);

  const handleSubjectClick = (id) => {
    navigate(`/subjects/study-material/${id}`);
  };

  return (
    <div className="subjectsPage">
      <div className="subjectsBox">
        <div className="subjectsHeader">
          <h2 className="subjectsTitle">Subjects (Study Material)</h2>

          <div className="subjectsSearch">
            <input placeholder="Search..." />
            <span className="subjectsSearchIcon">🔍</span>
          </div>
        </div>

        <div className="subjectsGrid">
          {subjectData.map((item) => (
            <SubjectCard
              key={item.id}
              {...item}
              onClick={() => handleSubjectClick(item.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}