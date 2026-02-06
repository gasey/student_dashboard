import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/header.css";

const DEFAULT_AVATAR = "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100";

export default function Header() {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [selectedCourse, setSelectedCourse] = useState("Select Course");

  // Avatar and student info state
  const [avatar, setAvatar] = useState(null);
  const [avatarType, setAvatarType] = useState(null);
  const [studentName, setStudentName] = useState("Irene");

  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const courses = ["Class 8", "Class 9", "Class 10", "Class 11", "Class 12"];

  // Load avatar and student info from localStorage
  const loadProfileData = () => {
    const savedAvatar = localStorage.getItem("studentAvatar");
    const savedAvatarType = localStorage.getItem("studentAvatarType");
    const savedStudentInfo = localStorage.getItem("studentInfo");

    if (savedAvatar && savedAvatarType) {
      setAvatar(savedAvatar);
      setAvatarType(savedAvatarType);
    } else {
      setAvatar(null);
      setAvatarType(null);
    }

    if (savedStudentInfo) {
      const info = JSON.parse(savedStudentInfo);
      setStudentName(info.name || "Irene");
    }
  };

  // Load on mount and listen for storage changes
  useEffect(() => {
    loadProfileData();

    // Listen for storage changes (when profile is updated)
    const handleStorageChange = (e) => {
      if (e.key === "studentAvatar" || e.key === "studentAvatarType" || e.key === "studentInfo") {
        loadProfileData();
      }
    };

    window.addEventListener("storage", handleStorageChange);

    // Also check periodically for same-tab updates
    const interval = setInterval(loadProfileData, 1000);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  // close dropdown when clicking outside
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpen(false);
      }
      if (profileRef.current && !profileRef.current.contains(e.target)) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleOutsideClick);
    return () => document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  const handleSelect = (course) => {
    setSelectedCourse(course);
    setOpen(false);
  };

  const handleProfileClick = () => {
    setProfileOpen(false);
    navigate("/profile");
  };

  const handleChangePasswordClick = () => {
    setProfileOpen(false);
    navigate("/change-password");
  };

  // Render avatar helper
  const renderAvatar = (size = "small") => {
    const isSmall = size === "small";

    if (avatar && avatarType === "emoji") {
      return (
        <span className={isSmall ? "header__avatarEmoji" : "header__profileEmoji"}>
          {avatar}
        </span>
      );
    } else if (avatar && avatarType === "image") {
      return (
        <img
          src={avatar}
          alt="Profile"
          className={isSmall ? "header__avatarImg" : "header__profileImg"}
        />
      );
    } else {
      return (
        <img
          src={DEFAULT_AVATAR}
          alt="Profile"
          className={isSmall ? "header__avatarImg" : "header__profileImg"}
        />
      );
    }
  };

  return (
    <header className="header">
      <div className="header__left">
        <h3 className="header__title">Welcome Back {studentName}</h3>
        <p className="header__subtitle">Let's learn something new today</p>
      </div>

      {/* CENTER dropdown */}
      <div className="header__courseWrap" ref={dropdownRef}>
        <button
          className="header__btn"
          onClick={() => setOpen((prev) => !prev)}
        >
          {selectedCourse}
          <span className={`header__chevron ${open ? "header__chevron--up" : ""}`}>
            <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </button>

        {open && (
          <div className="header__dropdown">
            {courses.map((course) => (
              <div
                key={course}
                className="header__dropdownItem"
                onClick={() => handleSelect(course)}
              >
                {course}
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="header__right" ref={profileRef}>
        <div
          className="header__avatar"
          onClick={() => setProfileOpen((prev) => !prev)}
        >
          {renderAvatar("small")}
        </div>

        {profileOpen && (
          <div className="header__profileDropdown">
            <div className="header__profileHeader">
              <p className="header__profileName">{studentName}</p>
              <div className="header__profileImgWrap">
                {renderAvatar("large")}
              </div>
            </div>
            <div className="header__profileDivider"></div>
            <div className="header__profileMenu">
              <div className="header__profileItem" onClick={handleProfileClick}>
                <span>Profile</span>
                <span className="header__profileArrow">
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                    <path d="M1.5 1L6.5 6L1.5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              <div className="header__profileItem" onClick={handleChangePasswordClick}>
                <span>Change Password</span>
                <span className="header__profileArrow">
                  <svg width="8" height="12" viewBox="0 0 8 12" fill="none">
                    <path d="M1.5 1L6.5 6L1.5 11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </span>
              </div>
              <div className="header__profileItem header__profileLogout">
                <span>Logout</span>
                <span className="header__logoutIcon">⊳</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}