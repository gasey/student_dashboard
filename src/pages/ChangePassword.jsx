import { useState } from "react";
import "../styles/changePassword.css";

export default function ChangePassword() {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [validation, setValidation] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecial: false,
    hasLower: false,
    hasUpper: false,
  });

  const handleChange = (field, value) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));

    if (field === "newPassword") {
      setValidation({
        minLength: value.length >= 8,
        hasNumber: /[0-9]/.test(value),
        hasSpecial: /[!@#$%^&*(),.?":{}|<>]/.test(value),
        hasLower: /[a-z]/.test(value),
        hasUpper: /[A-Z]/.test(value),
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const allValid = Object.values(validation).every((v) => v);
    if (!allValid) {
      alert("Please meet all password requirements");
      return;
    }

    if (formData.newPassword !== formData.confirmPassword) {
      alert("Passwords do not match");
      return;
    }

    if (!formData.oldPassword) {
      alert("Please enter your old password");
      return;
    }

    alert("Password changed successfully!");
    setFormData({
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
    setValidation({
      minLength: false,
      hasNumber: false,
      hasSpecial: false,
      hasLower: false,
      hasUpper: false,
    });
  };

  return (
    <div className="changePassword">
      <div className="changePassword__card">
        <h2 className="changePassword__title">Change Password</h2>

        <form onSubmit={handleSubmit} className="changePassword__form">
          <div className="changePassword__field">
            <label className="changePassword__label">Old Password</label>
            <input
              type="password"
              className="changePassword__input"
              value={formData.oldPassword}
              onChange={(e) => handleChange("oldPassword", e.target.value)}
            />
          </div>

          <div className="changePassword__field">
            <label className="changePassword__label">New Password</label>
            <input
              type="password"
              className="changePassword__input"
              value={formData.newPassword}
              onChange={(e) => handleChange("newPassword", e.target.value)}
            />
            <ul className="changePassword__requirements">
              <li className={validation.minLength ? "valid" : ""}>
                Must be at least 8 character
              </li>
              <li className={validation.hasNumber ? "valid" : ""}>
                Must contain number (eg. 0-9)
              </li>
              <li className={validation.hasSpecial ? "valid" : ""}>
                Must contain character (eg. @#$%)
              </li>
              <li className={validation.hasLower ? "valid" : ""}>
                Must contain at least lowercase letter
              </li>
              <li className={validation.hasUpper ? "valid" : ""}>
                Must contain at least uppercase letter
              </li>
            </ul>
          </div>

          <div className="changePassword__field">
            <label className="changePassword__label">Confirm Password</label>
            <input
              type="password"
              className="changePassword__input"
              value={formData.confirmPassword}
              onChange={(e) => handleChange("confirmPassword", e.target.value)}
            />
          </div>

          <button type="submit" className="changePassword__btn">
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
}