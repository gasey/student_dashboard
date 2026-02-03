import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/assignmentDetail.css";

export default function AssignmentDetail() {
  const navigate = useNavigate();
  const [uploadedFile, setUploadedFile] = useState(null);

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedFile(file);
    }
  };

  const handleSubmit = () => {
    if (uploadedFile) {
      alert(`Assignment submitted with file: ${uploadedFile.name}`);
      // Handle actual submission logic here
    } else {
      alert("Please upload a file first");
    }
  };

  return (
    <div className="assignmentDetailPage">
      <div className="assignmentDetailBox">
        {/* Back Button */}
        <button className="assignmentBack" onClick={() => navigate(-1)}>
          &lt; Back
        </button>

        {/* Subject Title and Search */}
        <div className="assignmentDetailHeader">
          <h2 className="assignmentDetailSubject">Subject Name</h2>
          <div className="assignmentSearch">
            <input placeholder="Search..." />
            <span className="assignmentSearchIcon">🔍</span>
          </div>
        </div>

        {/* Assignment Content */}
        <div className="assignmentDetailContent">
          {/* Left Section - Assignment Info */}
          <div className="assignmentDetailLeft">
            <h3 className="assignmentDetailTitle">Assignment No. X</h3>
            <p className="assignmentDetailMeta">
              Miss Ruatfeli - 21 Jan 2026
            </p>
            <p className="assignmentDetailDue">Due Date: 24 Jan 2026</p>

            <div className="assignmentDetailDivider"></div>

            <p className="assignmentDetailLabel">Title: Biology chapter 1</p>
            <p className="assignmentDetailDesc">
              Description: Answer all the questions on the attached file
            </p>

            <div className="assignmentDetailDivider"></div>

            {/* Attached File */}
            <div className="assignmentDetailFile">
              <div className="assignmentDetailFileIcon">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14 2H6C5.46957 2 4.96086 2.21071 4.58579 2.58579C4.21071 2.96086 4 3.46957 4 4V20C4 20.5304 4.21071 21.0391 4.58579 21.4142C4.96086 21.7893 5.46957 22 6 22H18C18.5304 22 19.0391 21.7893 19.4142 21.4142C19.7893 21.0391 20 20.5304 20 20V8L14 2Z" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M14 2V8H20" stroke="#333" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <span className="assignmentDetailFileName">
                Science biology assignment [file name]
              </span>
            </div>

            <div className="assignmentDetailDivider"></div>
          </div>

          {/* Right Section - Your Work */}
          <div className="assignmentDetailRight">
            <h4 className="assignmentDetailWorkTitle">Your Work</h4>

            <label className="assignmentDetailUploadBtn">
              <input
                type="file"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              [Upload File]
            </label>

            {uploadedFile && (
              <p className="assignmentDetailUploadedFile">
                {uploadedFile.name}
              </p>
            )}

            <button className="assignmentDetailSubmitBtn" onClick={handleSubmit}>
              Submit
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
