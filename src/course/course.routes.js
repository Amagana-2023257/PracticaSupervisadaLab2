import { Router } from "express";
import {createCourse,getCoursesByTeacher,updateCourse,deleteCourse,assignCourseToStudent,} from "./courses.controller.js";
import { validateRole } from "../middlewares/role-validator.js";

const router = Router();

router.post(
  "/createCourse",validateRole("TEACHER_ROLE"),createCourse
);
router.get(
  "/coursesByTeacher",validateRole("TEACHER_ROLE"), getCoursesByTeacher
);
router.put(
  "/updateCourse/:courseId",validateRole("TEACHER_ROLE"),updateCourse
);
router.delete(
  "/deleteCourse/:courseId", validateRole("TEACHER_ROLE"),deleteCourse
);

router.post(
  "/assignCourse/:uid", validateRole("STUDENT_ROLE"),assignCourseToStudent
);

export default router;
