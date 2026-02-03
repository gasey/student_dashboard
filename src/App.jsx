import { BrowserRouter, Routes, Route } from "react-router-dom";
import StudentLayout from "./layout/StudentLayout";

import Dashboard from "./pages/Dashboard";
import Subjects from "./pages/Subjects";
import SubjectsAssignments from "./pages/SubjectsAssignments";
import SubjectsQuiz from "./pages/SubjectsQuiz";
import SubjectsRecordings from "./pages/SubjectsRecordings";
import SubjectsStudyMaterial from "./pages/SubjectsStudyMaterial";
import AssignmentDetail from "./pages/AssignmentDetail";

import LiveSessions from "./pages/LiveSessions";
import Quiz from "./pages/Quiz";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<StudentLayout />}>
          <Route index element={<Dashboard />} />

          <Route path="subjects" element={<Subjects />} />
          <Route path="subjects/assignments" element={<SubjectsAssignments />} />
          <Route path="subjects/assignments/:id" element={<AssignmentDetail />} />
          <Route path="subjects/quiz" element={<SubjectsQuiz />} />
          <Route path="subjects/recordings" element={<SubjectsRecordings />} />
          <Route path="subjects/study-material" element={<SubjectsStudyMaterial />} />

          <Route path="live-sessions" element={<LiveSessions />} />
          <Route path="quiz" element={<Quiz />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
