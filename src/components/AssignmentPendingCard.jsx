import { useNavigate } from "react-router-dom";
import "../styles/assignmentPending.css";

export default function AssignmentPendingCard({ id, img, title, teacher, deadline }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/subjects/assignments/${id || 1}`);
  };

  return (
    <div className="assignmentPendingCard" onClick={handleClick}>
      <img className="assignmentPendingCard__img" src={img} alt={title} />
      <div className="assignmentPendingCard__info">
        <h4 className="assignmentPendingCard__title">{title}</h4>
        <p className="assignmentPendingCard__teacher">{teacher}</p>
        <p className="assignmentPendingCard__deadline">{deadline}</p>
      </div>
    </div>
  );
}
