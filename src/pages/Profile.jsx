import { useState, useEffect } from "react";
import "../styles/profile.css";

export default function Profile() {
  const [avatar, setAvatar] = useState(null);
  const [avatarType, setAvatarType] = useState(null);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [tempAvatarType, setTempAvatarType] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  // Student info state
  const [studentInfo, setStudentInfo] = useState({
    name: "Irene",
    email: "Irene@gmail.com",
    studentId: "123A",
    phone: "+91 9837645730",
  });

  // Edit mode state
  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  // Load saved data from localStorage on mount
  useEffect(() => {
    const savedAvatar = localStorage.getItem("studentAvatar");
    const savedAvatarType = localStorage.getItem("studentAvatarType");
    if (savedAvatar && savedAvatarType) {
      setAvatar(savedAvatar);
      setAvatarType(savedAvatarType);
    }

    const savedStudentInfo = localStorage.getItem("studentInfo");
    if (savedStudentInfo) {
      setStudentInfo(JSON.parse(savedStudentInfo));
    }
  }, []);

  const emojis = [
    "😀", "😎", "🤓", "😊", "🥳", "😇", "🤩", "😍",
    "🦊", "🐱", "🐶", "🐼", "🦁", "🐯", "🐻", "🐨",
    "👨‍🎓", "👩‍🎓", "👨‍💻", "👩‍💻", "🧑‍🎨", "👨‍🔬", "👩‍🔬", "🧑‍🚀",
    "⭐", "🌟", "✨", "💫", "🔥", "💎", "🎯", "🎨",
    "🌈", "🌸", "🍀", "🌺", "🌻", "🌙", "☀️", "🌊"
  ];

  const handleOpenPicker = () => {
    setTempAvatar(avatar);
    setTempAvatarType(avatarType);
    setShowPicker(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setTempAvatar(reader.result);
        setTempAvatarType("image");
      };
      reader.readAsDataURL(file);
    }
  };

  const handleEmojiSelect = (emoji) => {
    setTempAvatar(emoji);
    setTempAvatarType("emoji");
  };

  const handleSave = () => {
    if (tempAvatar && tempAvatarType) {
      setAvatar(tempAvatar);
      setAvatarType(tempAvatarType);
      localStorage.setItem("studentAvatar", tempAvatar);
      localStorage.setItem("studentAvatarType", tempAvatarType);
    }
    setShowPicker(false);
    setTempAvatar(null);
    setTempAvatarType(null);
  };

  const handleCancel = () => {
    setShowPicker(false);
    setTempAvatar(null);
    setTempAvatarType(null);
  };

  // Edit profile handlers
  const handleEditClick = () => {
    setEditValues({
      name: studentInfo.name,
      email: studentInfo.email,
      phone: studentInfo.phone,
    });
    setIsEditing(true);
  };

  const handleEditChange = (field, value) => {
    setEditValues((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleEditSave = () => {
    const updatedInfo = {
      ...studentInfo,
      name: editValues.name,
      email: editValues.email,
      phone: editValues.phone,
    };
    setStudentInfo(updatedInfo);
    localStorage.setItem("studentInfo", JSON.stringify(updatedInfo));
    setIsEditing(false);
  };

  const handleEditCancel = () => {
    setIsEditing(false);
    setEditValues({
      name: "",
      email: "",
      phone: "",
    });
  };

  const coursesEnrolled = [
    { course: "Class 8", batchCode: "ABUDYGWGU" },
    { course: "Class 9", batchCode: "AJDNIND8" },
    { course: "Class 10", batchCode: "JKWDNAWODAL 8" },
    { course: "Class 11 (Arts)", batchCode: "WDAWDUN 8" },
    { course: "Class 11 (Science)", batchCode: "WDAWDAWD" },
    { course: "Class 11 (Commerce)", batchCode: "WDAWDAWD" },
    { course: "Class 12 (Arts)", batchCode: "AWDWDAWD" },
    { course: "Class 12 (Science)", batchCode: "AWDAWDAWD" },
    { course: "Class 12 (Commerce)", batchCode: "ADWAWDAD" },
  ];

  return (
    <div className="profilePage">
      {/* Student Info Card */}
      <div className="profileCard">
        <div className="profileCard__content">
          <div className="profileCard__avatarWrap">
            <div
              className="profileCard__avatar"
              onClick={handleOpenPicker}
            >
              {avatar ? (
                <>
                  {avatarType === "emoji" ? (
                    <span className="profileCard__emoji">{avatar}</span>
                  ) : (
                    <img src={avatar} alt={studentInfo.name} />
                  )}
                  <div className="profileCard__avatarOverlay">
                    <span className="profileCard__avatarEdit">Edit</span>
                  </div>
                </>
              ) : (
                <div className="profileCard__addImage">
                  <span className="profileCard__addIcon">+</span>
                  <span className="profileCard__addText">Add Image</span>
                </div>
              )}
            </div>

            {showPicker && (
              <div className="profileCard__picker">
                <div className="profileCard__pickerHeader">
                  <span>{avatar ? "Change Avatar" : "Choose Avatar"}</span>
                  <button
                    className="profileCard__pickerClose"
                    onClick={handleCancel}
                  >
                    ×
                  </button>
                </div>

                {/* Preview Section */}
                <div className="profileCard__pickerPreview">
                  <div className="profileCard__previewCircle">
                    {tempAvatar ? (
                      tempAvatarType === "emoji" ? (
                        <span className="profileCard__previewEmoji">{tempAvatar}</span>
                      ) : (
                        <img src={tempAvatar} alt="Preview" className="profileCard__previewImg" />
                      )
                    ) : (
                      <span className="profileCard__previewPlaceholder">Preview</span>
                    )}
                  </div>
                </div>

                <div className="profileCard__pickerSection">
                  <p className="profileCard__pickerLabel">Upload Image</p>
                  <label className="profileCard__uploadBtn">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      hidden
                    />
                    Choose File
                  </label>
                </div>

                <div className="profileCard__pickerSection">
                  <p className="profileCard__pickerLabel">Or Select Emoji</p>
                  <div className="profileCard__emojiGrid">
                    {emojis.map((emoji, idx) => (
                      <button
                        key={idx}
                        className={`profileCard__emojiBtn ${tempAvatar === emoji ? "profileCard__emojiBtn--selected" : ""}`}
                        onClick={() => handleEmojiSelect(emoji)}
                      >
                        {emoji}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Save/Cancel Buttons */}
                <div className="profileCard__pickerActions">
                  <button
                    className="profileCard__cancelBtn"
                    onClick={handleCancel}
                  >
                    Cancel
                  </button>
                  <button
                    className="profileCard__saveBtn"
                    onClick={handleSave}
                    disabled={!tempAvatar}
                  >
                    Save
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="profileCard__info">
            {isEditing ? (
              <>
                <input
                  type="text"
                  className="profileCard__input profileCard__input--name"
                  value={editValues.name}
                  onChange={(e) => handleEditChange("name", e.target.value)}
                  placeholder="Name"
                />
                <div className="profileCard__detail">
                  <span className="profileCard__icon">✉</span>
                  <input
                    type="email"
                    className="profileCard__input"
                    value={editValues.email}
                    onChange={(e) => handleEditChange("email", e.target.value)}
                    placeholder="Email"
                  />
                </div>
                <div className="profileCard__detail">
                  <span className="profileCard__icon">◉</span>
                  <span>Student ID- {studentInfo.studentId}</span>
                </div>
                <div className="profileCard__detail">
                  <span className="profileCard__icon">✆</span>
                  <input
                    type="tel"
                    className="profileCard__input"
                    value={editValues.phone}
                    onChange={(e) => handleEditChange("phone", e.target.value)}
                    placeholder="Phone"
                  />
                </div>
              </>
            ) : (
              <>
                <h2 className="profileCard__name">{studentInfo.name}</h2>
                <div className="profileCard__detail">
                  <span className="profileCard__icon">✉</span>
                  <span>{studentInfo.email}</span>
                </div>
                <div className="profileCard__detail">
                  <span className="profileCard__icon">◉</span>
                  <span>Student ID- {studentInfo.studentId}</span>
                </div>
                <div className="profileCard__detail">
                  <span className="profileCard__icon">✆</span>
                  <span>{studentInfo.phone}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <div className="profileCard__editActions">
            <button className="profileCard__editCancelBtn" onClick={handleEditCancel}>
              Cancel
            </button>
            <button className="profileCard__editSaveBtn" onClick={handleEditSave}>
              Save
            </button>
          </div>
        ) : (
          <button className="profileCard__editBtn" onClick={handleEditClick}>
            EDIT
          </button>
        )}
      </div>

      {/* Courses Enrolled Section */}
      <div className="coursesSection">
        <div className="coursesSection__table">
          <div className="coursesSection__header">
            <span className="coursesSection__headerItem">COURSES ENROLLED</span>
            <span className="coursesSection__headerItem">BATCH CODE</span>
          </div>
          <div className="coursesSection__body">
            {coursesEnrolled.map((item, index) => (
              <div key={index} className="coursesSection__row">
                <span className="coursesSection__course">{item.course}</span>
                <span className="coursesSection__batch">{item.batchCode}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}