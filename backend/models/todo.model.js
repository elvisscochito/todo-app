import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  completed: {
    type: Boolean
  },
  dueDate: {
    type: Date
  },
  removed: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

const todo = mongoose.model("Todo", todoSchema);

export default todo;
