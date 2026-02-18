import { useState, useEffect } from "react";
import api from "../api/apiClient";
import "../styles/profile.css";

export default function Profile() {
  const [loading, setLoading] = useState(true);
  const [avatar, setAvatar] = useState(null);
  const [avatarType, setAvatarType] = useState(null);
  const [tempAvatar, setTempAvatar] = useState(null);
  const [tempAvatarType, setTempAvatarType] = useState(null);
  const [tempAvatarFile, setTempAvatarFile] = useState(null);
  const [showPicker, setShowPicker] = useState(false);

  const [studentInfo, setStudentInfo] = useState(null);
  const [courses, setCourses] = useState([]);

  const [isEditing, setIsEditing] = useState(false);
  const [editValues, setEditValues] = useState({
    name: "",
    phone: "",
  });

  const emojis = ["😀", "😎", "🤓", "😊", "🥳", "😇", "🤩", "😍"];

  // ===============================
  // FETCH PROFILE FROM BACKEND
  // ===============================
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await api.get("/accounts/me/");
      const data = res.data;

      setStudentInfo({
        name: data.profile.full_name,
        email: data.email,
        studentId: data.profile.student_id,
        phone: data.profile.phone,
      });

      setAvatar(data.profile.avatar);
      setAvatarType(data.profile.avatar_type);
      setCourses(data.enrollments || []);
    } catch (err) {
      console.error("Failed to load profile", err);
    } finally {
      setLoading(false);
    }
  };

  // ===============================
  // PROFILE EDIT
  // ===============================
  const handleEditClick = () => {
    setEditValues({
      name: studentInfo.name,
      phone: studentInfo.phone,
    });
    setIsEditing(true);
  };

  const handleEditSave = async () => {
    try {
      const res = await api.patch("/accounts/me/", {
        username: editValues.name,
        profile: {
          full_name: editValues.name,
          phone: editValues.phone,
        },
      });

      setStudentInfo({
        name: res.data.profile.full_name,
        email: res.data.email,
        studentId: res.data.profile.student_id,
        phone: res.data.profile.phone,
      });

      setIsEditing(false);
    } catch (err) {
      console.error("Profile update failed", err);
    }
  };

  // ===============================
  // AVATAR HANDLING
  // ===============================
  const handleOpenPicker = () => {
    setTempAvatar(avatar);
    setTempAvatarType(avatarType);
    setShowPicker(true);
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setTempAvatarFile(file);
    setTempAvatar(URL.createObjectURL(file));
    setTempAvatarType("image");
  };

  const handleEmojiSelect = (emoji) => {
    setTempAvatar(emoji);
    setTempAvatarType("emoji");
  };

  const handleAvatarSave = async () => {
    try {
      if (tempAvatarType === "emoji") {
        await api.patch("/accounts/me/", {
          profile: { avatar_emoji: tempAvatar },
        });
      }

      if (tempAvatarType === "image") {
        const formData = new FormData();
        formData.append("avatar_image", tempAvatarFile);

        await api.patch("/accounts/me/", formData, {
          headers: { "Content-Type": "multipart/form-data" },
        });
      }

      await fetchProfile();
      setShowPicker(false);
    } catch (err) {
      console.error("Avatar update failed", err);
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <div className="profilePage">
      <div className="profileCard">
        <div className="profileCard__content">

          {/* AVATAR */}
          <div className="profileCard__avatarWrap">
            <div className="profileCard__avatar" onClick={handleOpenPicker}>
              {avatar ? (
                avatarType === "emoji" ? (
                  <span className="profileCard__emoji">{avatar}</span>
                ) : (
                  <img src={avatar} alt="avatar" />
                )
              ) : (
                <span>+</span>
              )}
            </div>
          </div>

          {/* INFO */}
          <div className="profileCard__info">
            {isEditing ? (
              <>
                <input
                  value={editValues.name}
                  onChange={(e) =>
                    setEditValues({ ...editValues, name: e.target.value })
                  }
                />
                <input
                  value={editValues.phone}
                  onChange={(e) =>
                    setEditValues({ ...editValues, phone: e.target.value })
                  }
                />
              </>
            ) : (
              <>
                <h2>{studentInfo.name}</h2>
                <p>{studentInfo.email}</p>
                <p>Student ID - {studentInfo.studentId}</p>
                <p>{studentInfo.phone}</p>
              </>
            )}
          </div>
        </div>

        {isEditing ? (
          <>
            <button onClick={() => setIsEditing(false)}>Cancel</button>
            <button onClick={handleEditSave}>Save</button>
          </>
        ) : (
          <button onClick={handleEditClick}>Edit</button>
        )}
      </div>

      {/* COURSES */}
      <div className="coursesSection">
        <h3>Courses Enrolled</h3>
        {courses.map((item) => (
          <div key={item.id} className="coursesSection__row">
            <span>{item.course_title}</span>
            <span>{item.batch_code}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
