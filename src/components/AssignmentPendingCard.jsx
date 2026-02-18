import { useNavigate, useParams } from "react-router-dom";
import "../styles/assignmentPending.css";

export default function AssignmentPendingCard({
  id,
  img,
  title,
  teacher,
  deadline,
}) {
  const navigate = useNavigate();
  const { subjectId } = useParams(); // 👈 get subject id from URL

  const handleClick = () => {
    navigate(`/subjects/${subjectId}/assignments/${id}`);
  };

  return (
    <div className="assignmentPendingCard" onClick={handleClick}>
      {img && (
        <img
          className="assignmentPendingCard__img"
          src={img}
          alt={title}
        />
      )}
      <div className="assignmentPendingCard__info">
        <h4 className="assignmentPendingCard__title">
          {title}
        </h4>
        {teacher && (
          <p className="assignmentPendingCard__teacher">
            {teacher}
          </p>
        )}
        <p className="assignmentPendingCard__deadline">
          {deadline}
        </p>
      </div>
    </div>
  );
}
