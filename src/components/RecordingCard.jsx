import "../styles/recordings.css";

export default function RecordingCard({ img, subject, sessionTitle, teacher, sessionDate, onClick }) {
  return (
    <div className="recordingCard" onClick={onClick}>
      <img className="recordingCard__img" src={img} alt={subject} />
      <div className="recordingCard__info">
        <h4 className="recordingCard__subject">{subject}</h4>
        <p className="recordingCard__session">{sessionTitle}</p>
        <p className="recordingCard__teacher">{teacher}</p>
        <p className="recordingCard__date">{sessionDate}</p>
      </div>
    </div>
  );

}
