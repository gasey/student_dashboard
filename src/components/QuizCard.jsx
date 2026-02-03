import "../styles/quiz.css";

export default function QuizCard({ img, title, teacher, deadline, onClick }) {
  return (
    <div className="quizCard" onClick={onClick}>
      <div className="quizCard__imgWrap">
        <img src={img} alt={title} className="quizCard__img" />
      </div>
      <div className="quizCard__info">
        <h3 className="quizCard__title">{title}</h3>
        <p className="quizCard__teacher">{teacher}</p>
        <p className="quizCard__deadline">{deadline}</p>
      </div>
    </div>
  );
}