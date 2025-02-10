import { Schema, model } from "mongoose";

const userSchema = Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      maxLength: [25, "Name cannot exceed 25 characters"],
    },
    surname: {
      type: String,
      required: [true, "Surname is required"],
      maxLength: [25, "Surname cannot exceed 25 characters"],
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
    },
    profilePicture: {
      type: String,
    },
    phone: {
      type: String,
      minLength: 8,
      maxLength: 8,
      required: true,
    },
    role: {
      type: String,
      required: true,
      enum: ["TEACHER_ROLE", "STUDENT_ROLE"],
      default: "STUDENT_ROLE", 
    },
    status: {
      type: Boolean,
      default: true,
    },
    assignedCourses: {
      type: [{ type: Schema.Types.ObjectId, ref: "Course" }],
      validate: [
        (val) => val.length <= 3,
        "A student can only be assigned to 3 courses.",
      ],
    },
  },
  {
    versionKey: false,
    timestamps: true,
  }
);

userSchema.methods.toJSON = function () {
  const { password, _id, ...user } = this.toObject();
  user.uid = _id;
  return user;
};

export default model("User", userSchema);
