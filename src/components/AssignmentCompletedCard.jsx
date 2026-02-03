import "../styles/assignmentPending.css";

export default function AssignmentCompletedCard({ img, title, teacher, completedDate }) {
  return (
    <div className="assignmentCompletedCard">
      <div className="assignmentCompletedCard__imgWrap">
        <img className="assignmentCompletedCard__img" src={img} alt={title} />
        <span className="assignmentCompletedCard__badge">✓</span>
      </div>
      <div className="assignmentCompletedCard__info">
        <h4 className="assignmentCompletedCard__title">{title}</h4>
        <p className="assignmentCompletedCard__teacher">{teacher}</p>
        <p className="assignmentCompletedCard__date">{completedDate}</p>
      </div>
    </div>
  );
}
