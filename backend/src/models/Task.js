import mongoose from "mongoose";

const taskSchema = new mongoose.Schema(
  {
    title: { 
        type: String, 
        required: true 
    },
    completed: { 
        type: Boolean, 
        default: false 
    },
    dueDate: {
        type: Date,
        default: null
    },
    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }
  },
  { timestamps: true }
);

export default mongoose.model("Task", taskSchema);