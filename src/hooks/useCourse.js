import { useContext } from "react";
import { CourseContext } from "../context/CourseContext";

export default function useCourse() {
  return useContext(CourseContext);
}
