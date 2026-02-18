import { createContext, useEffect, useState, useContext } from "react";
import api from "../api/apiClient";
import { useAuth } from "../hooks/useAuth";

export const CourseContext = createContext();

export const CourseProvider = ({ children }) => {
  const { user } = useAuth();

  const [courses, setCourses] = useState([]);
  const [activeCourse, setActiveCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;
    fetchCourses();
  }, [user]);

  const fetchCourses = async () => {
    try {
      const res = await api.get("student/my-courses/");
      setCourses(res.data);

      if (res.data.length > 0) {
        setActiveCourse(res.data[0]);
      }
    } catch (err) {
      console.error("Failed to fetch courses");
    } finally {
      setLoading(false);
    }
  };

  const selectCourse = (courseId) => {
    const selected = courses.find((c) => c.id === courseId);
    if (selected) {
      setActiveCourse(selected);
    }
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
};

export const useCourse = () => {
  return useContext(CourseContext);
};
