import { useNavigate, useParams } from "react-router-dom";
import "../styles/recordingDetail.css";

export default function RecordingDetail() {
  const navigate = useNavigate();
  const { videoId } = useParams();

  // Sample video data - in real app this would come from API
  const videoData = {
    title: "Linear Equations",
    teacher: "Sir Zodina",
    dateRecorded: "22 Jan 2026",
    dayTime: "Wednesday, 1:00 pm (IST)",
    duration: "1:40:26",
    videoUrl: "", // Would be actual video URL
  };

  return (
    <div className="recordingDetailPage">
      <div className="recordingDetailBox">
        {/* Back Button */}
        <button className="recordingDetailBack" onClick={() => navigate(-1)}>
          &lt; Back
        </button>

        {/* Header with Title and Search */}
        <div className="recordingDetailHeader">
          <h2 className="recordingDetailTitle">Subject Name - Record ID</h2>
          <div className="recordingDetailSearch">
            <input placeholder="Search..." />
            <span className="recordingDetailSearchIcon">🔍</span>
          </div>
        </div>

        {/* Video Player */}
        <div className="recordingDetailPlayer">
          <div className="recordingDetailVideo">
            {/* Video element - replace with actual video player */}
            <video
              controls
              className="recordingDetailVideoElement"
              poster="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800"
            >
              <source src={videoData.videoUrl} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        {/* Video Info */}
        <div className="recordingDetailInfo">
          <div className="recordingDetailInfoLeft">
            <p className="recordingDetailInfoTitle">
              [Title] "{videoData.title}"
            </p>
            <p className="recordingDetailInfoTeacher">
              By:<br />
              {videoData.teacher}
            </p>
          </div>
          <div className="recordingDetailInfoRight">
            <p className="recordingDetailInfoDate">
              Date Recorded:<br />
              {videoData.dateRecorded}<br />
              {videoData.dayTime}
            </p>
            <p className="recordingDetailInfoDuration">
              Video Duration:<br />
              {videoData.duration}
            </p>
          </div>
        </div>
      </div>
    </div>
  );

}

