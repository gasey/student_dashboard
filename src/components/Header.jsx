import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCourse } from "../contexts/CourseContext";
import { useAuth } from "../contexts/AuthContext";
import "../styles/header.css";

const DEFAULT_AVATAR =
  "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100";

export default function Header() {
  const navigate = useNavigate();
  const dropdownRef = useRef(null);
  const profileRef = useRef(null);

  const { courses, selectedCourseId, selectCourse } = useCourse();
  const { user, logout } = useAuth();

  const [open, setOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  // ===============================
  // OUTSIDE CLICK HANDLER
  // ===============================
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
    return () =>
      document.removeEventListener("mousedown", handleOutsideClick);
  }, []);

  // ===============================
  // HELPERS
  // ===============================

  const selectedCourse = courses.find(
    (c) => c.id === selectedCourseId
  );

  const renderAvatar = () => {
    if (user?.profile?.avatar_type === "emoji") {
      return (
        <span className="header__avatarEmoji">
          {user.profile.avatar}
        </span>
      );
    }

    if (user?.profile?.avatar_type === "image") {
      return (
        <img
          src={user.profile.avatar}
          alt="Profile"
          className="header__avatarImg"
        />
      );
    }

    return (
      <img
        src={DEFAULT_AVATAR}
        alt="Profile"
        className="header__avatarImg"
      />
    );
  };

  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  // ===============================
  // RENDER
  // ===============================

  return (
    <header className="header">
      <div className="header__left">
        <h3 className="header__title">
          Welcome Back {user?.profile?.full_name || user?.email}
        </h3>
        <p className="header__subtitle">
          Let's learn something new today
        </p>
      </div>

      {/* COURSE DROPDOWN */}
      <div className="header__courseWrap" ref={dropdownRef}>
        <button
          className="header__btn"
          onClick={() => setOpen((prev) => !prev)}
        >
          {selectedCourse?.title || "Select Course"}
          <span
            className={`header__chevron ${
              open ? "header__chevron--up" : ""
            }`}
          >
            ▼
          </span>
        </button>

        {open && (
          <div className="header__dropdown">
            {courses.map((course) => (
              <div
                key={course.id}
                className="header__dropdownItem"
                onClick={() => {
                  selectCourse(course.id);
                  setOpen(false);
                }}
              >
                {course.title}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* PROFILE */}
      <div className="header__right" ref={profileRef}>
        <div
          className="header__avatar"
          onClick={() => setProfileOpen((prev) => !prev)}
        >
          {renderAvatar()}
        </div>

        {profileOpen && (
          <div className="header__profileDropdown">
            <div className="header__profileMenu">
              <div
                className="header__profileItem"
                onClick={() => navigate("/profile")}
              >
                Profile
              </div>

              <div
                className="header__profileItem"
                onClick={() => navigate("/change-password")}
              >
                Change Password
              </div>

              <div
                className="header__profileItem header__profileLogout"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
