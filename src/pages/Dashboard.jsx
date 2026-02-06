import { useState, useEffect } from "react";
import SessionCard from "../components/SessionCard";
import AssignmentCard from "../components/AssignmentCard";
import NotificationCard from "../components/NotificationCard";
import DropdownMenu from "../components/DropdownMenu";
import "../styles/dashboard.css";

export default function Dashboard() {
  const [showAllSessions, setShowAllSessions] = useState(false);
  const [notificationFilter, setNotificationFilter] = useState("All");
  const [scheduleFilter, setScheduleFilter] = useState("All");

  // State for data (future backend data)
  const [sessions, setSessions] = useState([]);
  const [assignments, setAssignments] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [notifications, setNotifications] = useState([]);
  const [schedule, setSchedule] = useState([]);

 // --- CALENDAR LOGIC STATE ---
  const today = new Date();
  const [currMonth, setCurrMonth] = useState(today.getMonth());
  const [currYear, setCurrYear] = useState(today.getFullYear());

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const years = Array.from({ length: 81 }, (_, i) => 1970 + i);

  // Helper to get days in month
  const daysInMonth = new Date(currYear, currMonth + 1, 0).getDate();
  
  // Helper to find starting day (Adjusted for Monday start: 0=Mo, 6=Su)
  const firstDayIndex = new Date(currYear, currMonth, 1).getDay();
  const startOffset = firstDayIndex === 0 ? 6 : firstDayIndex - 1;

  const goToPrevMonth = () => {
    if (currMonth === 0) {
      setCurrMonth(11);
      setCurrYear(currYear - 1);
    } else {
      setCurrMonth(currMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (currMonth === 11) {
      setCurrMonth(0);
      setCurrYear(currYear + 1);
    } else {
      setCurrMonth(currMonth + 1);
    }
  };

  // Mock data (simulates backend response)
  useEffect(() => {
    const mockSessions = [
      {
        img: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=400",
        subject: "Subject Name",
        topic: "Session Title/Topic",
        teacher: "Teacher Name",
        dateTime: "Session date",
      },
      {
        img: "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=400",
        subject: "Subject Name",
        topic: "Session Title/Topic",
        teacher: "Teacher Name",
        dateTime: "Session date",
      },
      {
        img: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400",
        subject: "Subject Name",
        topic: "Session Title/Topic",
        teacher: "Teacher Name",
        dateTime: "Session date",
      },
      {
        img: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400",
        subject: "Subject Name",
        topic: "Session Title/Topic",
        teacher: "Teacher Name",
        dateTime: "Session date",
      },
      {
        img: "https://images.unsplash.com/photo-1544717305-2782549b5136?w=400",
        subject: "Subject Name",
        topic: "Session Title/Topic",
        teacher: "Teacher Name",
        dateTime: "Session date",
      },
      {
        img: "https://images.unsplash.com/photo-1454165205744-3b78555e5572?w=400",
        subject: "Subject Name",
        topic: "Session Title/Topic",
        teacher: "Teacher Name",
        dateTime: "Session date",
      },
    ];

    const mockAssignments = [
      { title: "Mathematics chapter 1 algebra", teacher: "Sir Zothana", due: "23/01/2026 (Fri)" },
      { title: "English chapter 1 Poem", teacher: "Miss Ruaifeli", due: "02/02/2026 (Tue)" },
      { title: "English chapter 1 Poem", teacher: "Miss Ruaifeli", due: "02/02/2026 (Tue)" },
    ];

    const mockQuizzes = [
      { title: "Science chapter 1 Biology", teacher: "Miss Ruaifeli", due: "23/01/2026 (Friday)" },
      { title: "Science chapter 1 Biology", teacher: "Miss Ruaifeli", due: "23/01/2026 (Friday)" },
    ];

    const mockNotifications = [
      {
        title: "New Assignment updated",
        subject: "Mathematics chapter 1 algebra",
        teacher: "Teacher: Sir Zothana",
        time: "Due Date: 23/01/2026 (Fri)",
        type: "Assignments",
      },
      {
        title: "New Live Session date updated",
        subject: "Mathematics chapter 1 algebra",
        teacher: "Teacher: Sir Zothana",
        time: "Time: 1:00pm to 2:00pm",
        type: "Live Sessions",
      },
      {
        title: "New Quiz updated",
        subject: "Science chapter 1 Biology",
        teacher: "Teacher: Miss Ruaifeli",
        time: "Time: 1:00pm to 2:00pm",
        type: "Quiz",
      },
      {
        title: "New Assignment updated",
        subject: "Mathematics chapter 1 algebra",
        teacher: "Teacher: Sir Zothana",
        time: "Due Date: 23/01/2026 (Fri)",
        type: "Assignments",
      },
    ];

    const mockSchedule = [
      {
        date: "21/01/2026 (Wed)",
        title: "Live Session",
        subject: "Mathematics chapter 1 algebra",
        teacher: "Teacher: Sir Zothana",
        time: "Time: 3:00pm to 4:00pm",
        type: "Live Sessions",
      },
      {
        date: "21/01/2026 (Wed)",
        title: "Due Assignments",
        subject: "Mathematics chapter 1 algebra",
        teacher: "Teacher: Sir Zothana",
        time: "Due Date: 23/01/2026",
        type: "Assignments",
      },
      {
        date: "21/01/2026 (Wed)",
        title: "Quiz",
        subject: "Science chapter 1 Chemistry",
        teacher: "Teacher: Miss Ruaifeli",
        time: "Time: 10:00am to 12:00pm",
        type: "Quiz",
      },
      {
        date: "23/01/2026 (Fri)",
        title: "Due Assignments",
        subject: "Mathematics chapter 1 algebra",
        teacher: "Teacher: Sir Zothana",
        time: "Due Date: 23/01/2026",
        type: "Assignments",
      },
      {
        date: "29/01/2026 (Thu)",
        title: "Live Session",
        subject: "Science chapter 1 Biology",
        teacher: "Teacher: Sir Zothana",
        time: "Time: 2:00pm to 3:00pm",
        type: "Live Sessions",
      },
    ];

{/*   // example for backend //

  useEffect(() => {
  fetch("/api/dashboard")
    .then((res) => res.json())
    .then((data) => {
      setSessions(data.sessions);
      setAssignments(data.assignments);
      setQuizzes(data.quizzes);
      setNotifications(data.notifications);
      setSchedule(data.schedule);
    });
}, []);

*/}

    setSessions(mockSessions);
    setAssignments(mockAssignments);
    setQuizzes(mockQuizzes);
    setNotifications(mockNotifications);
    setSchedule(mockSchedule);
  }, []);

  const collapsedSessions = sessions.slice(0, 3);

  const filteredNotifications =
    notificationFilter === "All"
      ? notifications
      : notifications.filter((n) => n.type === notificationFilter);

  const filteredSchedule =
    scheduleFilter === "All"
      ? schedule
      : schedule.filter((s) => s.type === scheduleFilter);

  return (
    <div className="dashExact">
      {/* Top Section */}
      <div className="dashExact__top">
        {/* Upcoming sessions */}
        <div className="whiteCard">
          <div className="cardHeader">
            <h3>Upcoming Live Sessions</h3>

            <button
              className="arrowBtn"
              onClick={() => setShowAllSessions(!showAllSessions)}
            >
              {showAllSessions ? "˄" : "˅"}
            </button>
          </div>

          <div className={showAllSessions ? "sessionsGridExpanded" : "sessionsGridCollapsed"}>
            {(showAllSessions ? sessions : collapsedSessions).map((s, idx) => (
              <SessionCard key={idx} {...s} />
            ))}
          </div>
        </div>

        {/* CALENDAR SECTION */}
        <div className="calendarBox">
          <div className="calendarHeader">
            <span style={{ cursor: "pointer" }} onClick={goToPrevMonth}>◀</span>
            <div className="calendarHeader__mid">
              <select className="calendarSelect" value={currMonth} onChange={(e) => setCurrMonth(parseInt(e.target.value))}>
                {months.map((m, i) => (
                  <option key={m} value={i}>{m.substring(0, 3)}</option>
                ))}
              </select>
              <select className="calendarSelect" value={currYear} onChange={(e) => setCurrYear(parseInt(e.target.value))}>
                {years.map((y) => (
                  <option key={y} value={y}>{y}</option>
                ))}
              </select>
            </div>
            <span style={{ cursor: "pointer" }} onClick={goToNextMonth}>▶</span>
          </div>

          <div className="calendarGrid">
            {["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"].map((d) => (
              <div key={d} className="calDayName">{d}</div>
            ))}

            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="calDate" style={{ visibility: "hidden" }}></div>
            ))}

            {Array.from({ length: daysInMonth }, (_, i) => {
              const day = i + 1;
              const isToday = 
                day === today.getDate() && 
                currMonth === today.getMonth() && 
                currYear === today.getFullYear();

              return (
                <div key={day} className={`calDate ${isToday ? "calRed" : ""}`}>
                  {day}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Section */}
      {!showAllSessions && (
        <div className="dashExact__bottom">
          {/* Left column: Assignment + Quiz */}
          <div className="dashExact__leftCol">
            <div className="whiteCard">
              <div className="cardHeader">
                <h3>Assignment</h3>
                <span className="miniArrow">˅</span>
              </div>

              <div className="listBody">
                {assignments.map((a, idx) => (
                  <AssignmentCard key={idx} {...a} />
                ))}
              </div>
            </div>

            <div className="whiteCard">
              <div className="cardHeader">
                <h3>Quiz</h3>
                <span className="miniArrow">˅</span>
              </div>

              <div className="listBody">
                {quizzes.map((q, idx) => (
                  <AssignmentCard key={idx} {...q} />
                ))}
              </div>
            </div>
          </div>

          {/* Middle: Notification */}
          <div className="whiteCard">
            <div className="cardHeader">
              <h3>Notification</h3>
              <DropdownMenu value={notificationFilter} onChange={setNotificationFilter} />
            </div>

            <div className="notifBody">
              {filteredNotifications.map((n, idx) => (
                <NotificationCard key={idx} {...n} />
              ))}
            </div>
          </div>

          {/* Right: Schedule */}
          <div className="whiteCard">
            <div className="cardHeader">
              <h3>8 Jan 2026</h3>
              <DropdownMenu value={scheduleFilter} onChange={setScheduleFilter} />
            </div>

            <div className="scheduleList">
              {filteredSchedule.map((item, idx) => (
                <div key={idx} className="scheduleItem">
                  <p className="scheduleDate">{item.date}</p>
                  <p className="scheduleTitle">{item.title}</p>
                  <p className="scheduleSub">{item.subject}</p>
                  <p className="scheduleSub">{item.teacher}</p>
                  <p className="scheduleSub">{item.time}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}