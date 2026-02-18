import { createContext, useContext, useEffect, useState } from "react";
import api from "../api/apiClient";
import { useAuth } from "./AuthContext";

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const { user, loading: authLoading } = useAuth();

  const [courses, setCourses] = useState([]);
  const [activeCourse, setActiveCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }

    fetchCourses();
  }, [user, authLoading]);

  const fetchCourses = async () => {
    try {
      const res = await api.get("/my/");
      setCourses(res.data);

      if (res.data.length > 0) {
        setActiveCourse(res.data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch courses", err);
    } finally {
      setLoading(false);
    }
  };

  const selectCourse = (courseId) => {
    const selected = courses.find((c) => c.id === courseId);
    if (selected) setActiveCourse(selected);
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        activeCourse,
        selectCourse,
        loading,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourse must be used inside CourseProvider");
  }
  return context;
}
