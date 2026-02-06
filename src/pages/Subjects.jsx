import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import SubjectCard from "../components/SubjectCard";
import "../styles/subjects.css";

export default function Subjects() {
  const navigate = useNavigate();

  // State (future backend data)
  const [subjects, setSubjects] = useState([]);

  // Mock data (simulates backend response)
  useEffect(() => {
    const mockSubjects = [
      {
        img: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
      {
        img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
      {
        img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
      {
        img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
      {
        img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
      {
        img: "https://images.unsplash.com/photo-1517486808906-6ca8b3f04846?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
      {
        img: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
      {
        img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=600",
        subject: "Subject Name",
        teacher: "Teacher Name",
      },
    ];


{/*   // example for backend //
  
  useEffect(() => {
  fetch("/api/subjects")
    .then((res) => res.json())
    .then((data) => setSubjects(data));
}, []);

*/}

    setSubjects(mockSubjects);
  }, []);

  // Navigation stays generic (no hard dependency on data shape)
  const handleSubjectClick = (id) => {
    navigate(`/subjects/${id}`);
  };

  return (
    <div className="subjectsPage">
      <div className="subjectsBox">
        <div className="subjectsHeader">
          <h2 className="subjectsTitle">Subjects</h2>

          <div className="subjectsSearch">
            <input placeholder="Search..." />
            <span className="subjectsSearchIcon">🔍</span>
          </div>
        </div>

        <div className="subjectsGrid">
          {subjects.map((item, index) => (
            <SubjectCard
              key={index}               // frontend-only key
              img={item.img}
              subject={item.subject}
              teacher={item.teacher}
              onClick={() => handleSubjectClick(index)}
            />
          ))}
        </div>

        {/*  // example for backend //
        
            {subjects.map((item) => (
              <SubjectCard
                key={item.id}
                img={item.thumbnail}
                subject={item.name}
                teacher={item.teacher}
                onClick={() => navigate(`/subjects/${item.id}`)}
              />
            ))}
        */}

      </div>
    </div>
  );
}

