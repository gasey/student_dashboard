import { useNavigate } from "react-router-dom";
import "../styles/liveSessionDetail.css";

export default function LiveSessionDetail() {
  const navigate = useNavigate();
  return (
    <div className="liveSessionDetailPage">
      <div className="liveSessionDetailBox">
        {/* Top Row: Back + Search */}
        <div className="liveSessionTopRow">
          <button className="liveSessionBackBtn" onClick={() => navigate(-1)}>
            &lt; Back
          </button>

          <div className="liveSessionSearch">
            <input placeholder="Search..." />
            <span className="liveSessionSearchIcon">🔍</span>
          </div>
        </div>

        {/* Title */}
        <h2 className="liveSessionTitle">Subject Name #Session ID</h2>

        {/* Video Box */}
        <div className="liveSessionVideoBox"></div>

        {/* Bottom info row */}
        <div className="liveSessionInfoRow">
          {/* Left info */}
          <div className="liveSessionLeftInfo">
            <p className="infoText">
              [Title] “Linear Equations”
            </p>

            <div className="byBox">
              <p className="byText">By:</p>
              <p className="byName">Sir Zodina</p>
            </div>
          </div>

          {/* Right info */}
          <div className="liveSessionRightInfo">
            <p className="dateText">22 Jan 2026</p>
            <p className="timeText">Wednesday, 1:00 pm (IST)</p>
          </div>
        </div>
      </div>
    </div>
  );
}
