import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/assignmentDetail.css";

export default function AssignmentDetail() {
  const navigate = useNavigate();

  // BEFORE submit
  const [uploadedFile, setUploadedFile] = useState(null);

  // AFTER submit
  const [isSubmitted, setIsSubmitted] = useState(false);

  // submission time (for display)
  const [submittedAt, setSubmittedAt] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = () => {
    if (!uploadedFile) return;

    // UI state
    const now = new Date();
    setSubmittedAt(now);
    setIsSubmitted(true);
  };

  const handleOpenFile = () => {
    if (!uploadedFile) return;
    alert(`Opening file: ${uploadedFile.name}`);
  };

  const formatSubmittedTop = (dateObj) => {
    if (!dateObj) return "";
    const options = { day: "2-digit", month: "short", year: "numeric" };
    const d = dateObj.toLocaleDateString("en-GB", options);
    const t = dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
    return `Submitted: ${d} / ${t}`;
  };

  const formatSmallDate = (dateObj) => {
    if (!dateObj) return "";
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return dateObj.toLocaleDateString("en-GB", options);
  };

  return (
    <div className="assignmentDetailPage">
      {/* Top fixed bar inside page */}
      <div className="assignmentTopBar">
        <button className="assignmentBack" onClick={() => navigate(-1)}>
          &lt; Back
        </button>
      </div>

      {/* Main white container */}
      <div className="assignmentDetailBox">
        {/* Subject + Search row */}
        <div className="assignmentDetailHeader">
          <h2 className="assignmentDetailSubject">Subject Name</h2>
          <div className="assignmentSearch">
            <input placeholder="Search..." />
            <span className="assignmentSearchIcon">🔍</span>
          </div>
        </div>

        {/* Light grey assignment container */}
        <div className="assignmentDetailContent">
          {/* LEFT: Assignment information */}
          <div className="assignmentDetailLeft">
            <div className="assignmentTitleRow">
              <h3 className="assignmentDetailTitle">Assignment No. X</h3>

              {/* shown only after submit */}
              {isSubmitted && (
                <p className="submittedTopText">
                  {formatSubmittedTop(submittedAt)}
                </p>
              )}
            </div>

            <p className="assignmentDetailMeta">Miss Ruaifeli - 21 Jan 2026</p>
            <p className="assignmentDetailDue">Due Date: 24 Jan 2026</p>

            <div className="assignmentDetailDivider"></div>

            <p className="assignmentDetailLabel">Title: Biology chapter 1</p>
            <p className="assignmentDetailDesc">
              Description: Answer all the questions on the attached file
            </p>

            {/* Attached file strip */}
            <div className="fileStrip">
              <div className="fileStripIcon">
                <svg
                  width="22"
                  height="22"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z"
                    stroke="#444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M14 2V8H20"
                    stroke="#444"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>

              <div className="fileStripName">
                Science biology assignment [file name]
              </div>
            </div>
          </div>

          {/* RIGHT: Your Work card */}
          <div className="assignmentDetailRight">
            <div className="yourWorkTop">
              <h4 className="assignmentDetailWorkTitle">Your Work</h4>

              {/* after submit small date on right */}
              {isSubmitted && (
                <span className="yourWorkDate">{formatSmallDate(submittedAt)}</span>
              )}
            </div>

            {/* BEFORE SUBMIT */}
            {!isSubmitted && (
              <>
                <label className="assignmentDetailUploadBtn">
                  <input type="file" onChange={handleFileUpload} hidden />
                  [Upload File]
                </label>

                <button
                  className="assignmentDetailSubmitBtn"
                  onClick={handleSubmit}
                  disabled={!uploadedFile}
                >
                  Submit
                </button>
              </>
            )}

            {/* AFTER SUBMIT */}
            {isSubmitted && (
              <>
                <button className="openFileBtn" onClick={handleOpenFile}>
                  [Open File]
                </button>

                <button className="submittedBtn" disabled>
                  Submitted
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
