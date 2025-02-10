import Course from "./course.model.js";
import User from "../user/user.model.js";

export const createCourse = async (req, res) => {
  try {
    const { name, description, teacher } = req.body; 

    const teacherCourses = await Course.find({ teacher });
    if (teacherCourses.length >= 3) {
      return res.status(400).json({
        success: false,
        message: "Teacher cannot have more than 3 courses.",
      });
    }

    const course = new Course({
      name,
      description,
      teacher,
    });

    await course.save();

    return res.status(201).json({
      success: true,
      message: "Course created successfully.",
      course,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error creating course",
      error: err.message,
    });
  }
};

export const getCoursesByTeacher = async (req, res) => {
  try {
    const { teacherId } = req.params;

    const courses = await Course.find({ teacher: teacherId });

    return res.status(200).json({
      success: true,
      courses,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error fetching courses",
      error: err.message,
    });
  }
};

export const updateCourse = async (req, res) => {
  try {
    const { courseId } = req.params;
    const { name, description } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    course.name = name || course.name;
    course.description = description || course.description;

    await course.save();

    return res.status(200).json({
      success: true,
      message: "Course updated successfully",
      course,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error updating course",
      error: err.message,
    });
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { courseId } = req.params;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    await User.updateMany(
      { assignedCourses: courseId },
      { $pull: { assignedCourses: courseId } }
    );

    await Course.findByIdAndDelete(courseId);

    return res.status(200).json({
      success: true,
      message: "Course deleted successfully.",
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error deleting course",
      error: err.message,
    });
  }
};

export const assignCourseToStudent = async (req, res) => {
  try {
    const { uid } = req.params;
    const { courseId } = req.body;

    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({
        success: false,
        message: "Course not found",
      });
    }

    const student = await User.findById(uid);
    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    // Check if student has already 3 courses
    if (student.assignedCourses.length >= 3) {
      return res.status(400).json({
        success: false,
        message: "Student can only be assigned to 3 courses.",
      });
    }

    if (student.assignedCourses.includes(courseId)) {
      return res.status(400).json({
        success: false,
        message: "This course is already assigned to the student.",
      });
    }

    student.assignedCourses.push(courseId);
    await student.save();

    course.assignedStudents.push(uid);
    await course.save();

    return res.status(200).json({
      success: true,
      message: "Course assigned to student successfully.",
      course,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: "Error assigning course",
      error: err.message,
    });
  }
};
