import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/quiz.css";

export default function QuizDetail() {
  const navigate = useNavigate();
  const { quizId } = useParams();
  const [answers, setAnswers] = useState({});

  const quizData = {
    id: quizId,
    title: "Quiz (ID or number)",
    teacher: "Miss Ruatfeli",
    dateCreated: "21 Jan 2026",
    dueDate: "24 Jan 2026",
    questions: [
      {
        id: 1,
        question: "What is . . .",
        options: ["answer 1", "answer 2", "answer 3", "answer 4"],
      },
      {
        id: 2,
        question: "What is . . .",
        options: ["answer 1", "answer 2", "answer 3", "answer 4"],
      },
      {
        id: 3,
        question: "What is . . .",
        options: ["answer 1", "answer 2", "answer 3", "answer 4"],
      },
      {
        id: 4,
        question: "What is . . .",
        options: ["answer 1", "answer 2", "answer 3", "answer 4"],
      },
      {
        id: 5,
        question: "What is . . .",
        options: ["answer 1", "answer 2", "answer 3", "answer 4"],
      },
    ],
  };

  const handleAnswerChange = (questionId, optionIndex) => {
    setAnswers((prev) => ({
      ...prev,
      [questionId]: optionIndex,
    }));
  };

  const handleSubmit = () => {
    // In real app, submit answers to API
    console.log("Submitted answers:", answers);
    // Navigate to result page
    navigate(`/subjects/quiz/1/result/${quizId}`, { state: { answers } });
  };

  const allAnswered = quizData.questions.every((q) => answers[q.id] !== undefined);

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
          <div className="quizDetailInfo">
            <h3 className="quizDetailInfoTitle">{quizData.title}</h3>
            <p className="quizDetailInfoMeta">
              {quizData.teacher} - {quizData.dateCreated}
            </p>
            <p className="quizDetailInfoDue">Due Date: {quizData.dueDate}</p>
          </div>

          {/* Questions */}
          <div className="quizDetailQuestions">
            {quizData.questions.map((q, index) => (
              <div key={q.id} className="quizDetailQuestion">
                <p className="quizDetailQuestionText">
                  {index + 1}. {q.question}
                </p>
                <div className="quizDetailOptions">
                  {q.options.map((option, optIndex) => (
                    <label key={optIndex} className="quizDetailOption">
                      <input
                        type="radio"
                        name={`question-${q.id}`}
                        checked={answers[q.id] === optIndex}
                        onChange={() => handleAnswerChange(q.id, optIndex)}
                      />
                      <span className="quizDetailOptionRadio"></span>
                      <span className="quizDetailOptionText">{option}</span>
                    </label>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Submit Button */}
          <div className="quizDetailSubmitWrap">
            <button
              className="quizDetailSubmit"
              onClick={handleSubmit}
              disabled={!allAnswered}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}