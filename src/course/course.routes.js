import { Router } from "express";
import { createCourse, getCoursesByTeacher, updateCourse, deleteCourse, assignCourseToStudent } from "./course.controller.js";

const router = Router();

router.post(
  "/createCourse", createCourse
);
router.get(
  "/coursesByTeacher/:teacherId", getCoursesByTeacher
);
router.put(
  "/updateCourse/:courseId", updateCourse
);
router.delete(
  "/deleteCourse/:courseId", deleteCourse
);

router.post(
  "/assignCourse/:uid", assignCourseToStudent
);

export default router;
