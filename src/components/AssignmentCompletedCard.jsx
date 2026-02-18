import { useNavigate, useParams } from "react-router-dom";
import "../styles/assignmentPending.css";

export default function AssignmentCompletedCard({
  id,
  img,
  title,
  teacher,
  completedDate,
}) {
  const navigate = useNavigate();
  const { subjectId } = useParams();

  const handleClick = () => {
    navigate(`/subjects/${subjectId}/assignments/${id}`);
  };

  return (
    <div
      className="assignmentCompletedCard"
      onClick={handleClick}
      style={{ cursor: "pointer" }}
    >
      {img && (
        <div className="assignmentCompletedCard__imgWrap">
          <img
            className="assignmentCompletedCard__img"
            src={img}
            alt={title}
          />
          <span className="assignmentCompletedCard__badge">
            ✓
          </span>
        </div>
      )}

      <div className="assignmentCompletedCard__info">
        <h4 className="assignmentCompletedCard__title">
          {title}
        </h4>
        {teacher && (
          <p className="assignmentCompletedCard__teacher">
            {teacher}
          </p>
        )}
        <p className="assignmentCompletedCard__date">
          {completedDate}
        </p>
      </div>
    </div>
  );
}
