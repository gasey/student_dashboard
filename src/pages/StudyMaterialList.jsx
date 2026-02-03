import { useNavigate } from "react-router-dom";
import "../styles/studyMaterial.css";

export default function StudyMaterialList() {
  const navigate = useNavigate();

  const chaptersData = [
    { id: 1, name: "Chapter 1", date: "21/01/26", fileUrl: "#" },
    { id: 2, name: "Chapter 2", date: "22/01/26", fileUrl: "#" },
    { id: 3, name: "Chapter 3", date: "23/01/26", fileUrl: "#" },
    { id: 4, name: "Chapter 4", date: "26/01/26", fileUrl: "#" },
    { id: 5, name: "Chapter 5", date: "26/01/26", fileUrl: "#" },
  ];

  const handleView = (chapter) => {
    // Open file in new tab for viewing
    window.open(chapter.fileUrl, "_blank");
  };

  const handleDownload = (chapter) => {
    // Trigger download
    const link = document.createElement("a");
    link.href = chapter.fileUrl;
    link.download = `${chapter.name}.pdf`;
    link.click();
  };

  return (
    <div className="studyMaterialPage">
      <div className="studyMaterialBox">
        {/* Back Button */}
        <button className="studyMaterialBack" onClick={() => navigate(-1)}>
          &lt; Back
        </button>

        {/* Header with Title and Search */}
        <div className="studyMaterialHeader">
          <h2 className="studyMaterialTitle">Subject Name</h2>
          <div className="studyMaterialSearch">
            <input placeholder="Search..." />
            <span className="studyMaterialSearchIcon">🔍</span>
          </div>
        </div>

        {/* Chapters Table */}
        <div className="studyMaterialContent">
          <div className="studyMaterialTableWrap">
            <table className="studyMaterialTable">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Date</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {chaptersData.map((chapter) => (
                  <tr key={chapter.id}>
                    <td>{chapter.name}</td>
                    <td>{chapter.date}</td>
                    <td className="studyMaterialActions">
                      <button
                        className="studyMaterialViewBtn"
                        onClick={() => handleView(chapter)}
                      >
                        View
                      </button>
                      <button
                        className="studyMaterialDownloadBtn"
                        onClick={() => handleDownload(chapter)}
                      >
                        Download
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );

}

