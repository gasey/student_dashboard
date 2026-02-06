import { useEffect, useRef, useState } from "react";
import "../styles/dropdown.css";

export default function DropdownMenu({ value = "All", onChange }) {
  const [open, setOpen] = useState(false);
  const boxRef = useRef(null);

  const options = ["All", "Assignments", "Live Sessions", "Quiz"];

  useEffect(() => {
    const handler = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) {
        setOpen(false);
      }
    };
    window.addEventListener("mousedown", handler);
    return () => window.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="dd" ref={boxRef}>
      <button className="dd__btn" onClick={() => setOpen(!open)}>
        <span className="dd__value">{value}</span>
        <span className={`dd__arrow ${open ? "dd__arrow--up" : ""}`}>
          <svg width="12" height="8" viewBox="0 0 12 8" fill="none">
            <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </span>
      </button>

      {open && (
        <div className="dd__menu">
          {options.map((opt) => (
            <button
              key={opt}
              className={`dd__item ${value === opt ? "active" : ""}`}
              onClick={() => {
                onChange?.(opt);
                setOpen(false);
              }}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}