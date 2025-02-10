import { Schema, model } from "mongoose";

const courseSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Course name is required"],
      maxLength: [50, "Course name cannot exceed 50 characters"],
    },
    description: {
      type: String,
      required: [true, "Course description is required"],
    },
    teacher: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: [true, "Course must have a teacher"],
    },
    assignedStudents: {
      type: [{ type: Schema.Types.ObjectId, ref: "User" }],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

courseSchema.methods.toJSON = function () {
  const { __v, ...course } = this.toObject();
  return course;
};

export default model("Course", courseSchema);
