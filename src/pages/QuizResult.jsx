import { useNavigate, useParams } from "react-router-dom";
import "../styles/quiz.css";

export default function QuizResult() {
  const navigate = useNavigate();
  const { quizId } = useParams();

  const quizData = {
    id: quizId,
    title: "Quiz (ID or number)",
    teacher: "Miss Ruatfeli",
    dateCreated: "21 Jan 2026",
    dueDate: "24 Jan 2026",
    submittedDate: "22 Jan 2026 (7:00 PM)",
    score: 4,
    totalQuestions: 5,
    questions: [
      {
        id: 1,
        question: "What is . . .",
        options: ["answer 1", "answer 2", "answer 3", "answer 4"],
        selectedAnswer: 0,
        correctAnswer: 0,
        correctAnswerText: "Answer 1",
      },
      {
        id: 2,
        question: "What is . . .",
        options: ["answer 1", "answer 2", "answer 3", "answer 4"],
        selectedAnswer: 2,
        correctAnswer: 2,
        correctAnswerText: "Answer 3",
      },
      {
        id: 3,
        question: "What is . . .",
        options: ["answer 1", "answer 2", "answer 3", "answer 4"],
        selectedAnswer: 1,
        correctAnswer: 1,
        correctAnswerText: "Answer 2",
      },
      {
        id: 4,
        question: "What is . . .",
        options: ["answer 1", "answer 2", "answer 3", "answer 4"],
        selectedAnswer: 1,
        correctAnswer: 1,
        correctAnswerText: "Answer 2",
      },
      {
        id: 5,
        question: "What is . . .",
        options: ["answer 1", "answer 2", "answer 3", "answer 4"],
        selectedAnswer: 3,
        correctAnswer: 2,
        correctAnswerText: "Answer 4",
      },
    ],
  };

  return (
    <div className="quizDetailPage">
      <div className="quizDetailBox">
        {/* Back Button */}
        <button className="quizDetailBack" onClick={() => navigate(-1)}>
          &lt; Back
        </button>

        {/* Header with Title and Search */}
        <div className="quizDetailHeader">
          <h2 className="quizDetailTitle">Subject Name</h2>
          <div className="quizDetailSearch">
            <input placeholder="Search..." />
            <span className="quizDetailSearchIcon">🔍</span>
          </div>
        </div>

        {/* Quiz Content */}
        <div className="quizDetailContent">
          {/* Quiz Info */}
          <div className="quizDetailInfo quizDetailInfo--result">
            <div className="quizDetailInfoLeft">
              <h3 className="quizDetailInfoTitle">{quizData.title}</h3>
              <p className="quizDetailInfoMeta">
                {quizData.teacher} - {quizData.dateCreated}
              </p>
              <p className="quizDetailInfoDue">Due Date: {quizData.dueDate}</p>
            </div>
            <div className="quizDetailInfoRight">
              <p className="quizDetailInfoSubmitted">
                Submitted: {quizData.submittedDate}
              </p>
            </div>
          </div>

          {/* Questions with Answers */}
          <div className="quizDetailQuestions">
            {quizData.questions.map((q, index) => (
              <div key={q.id} className="quizDetailQuestion quizDetailQuestion--result">
                <div className="quizDetailQuestionRow">
                  <p className="quizDetailQuestionText">
                    {index + 1}. {q.question}
                  </p>
                  <p className="quizDetailQuestionAnswer">
                    Ans: {q.correctAnswerText}
                  </p>
                </div>
                <div className="quizDetailOptions quizDetailOptions--disabled">
                  {q.options.map((option, optIndex) => (
                    <label
                      key={optIndex}
                      className={`quizDetailOption ${
                        q.selectedAnswer === optIndex ? "quizDetailOption--selected" : ""
                      }`}
                    >
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={q.selectedAnswer === optIndex}
                        disabled
                        readOnly
                      />
                      <span className="quizDetailOptionRadio"></span>
                      <span className="quizDetailOptionText">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Score */}
          <div className="quizDetailScore">
            <p className="quizDetailScoreText">
              Score: {quizData.score}/{quizData.totalQuestions}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}