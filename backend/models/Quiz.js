import mongoose from "mongoose";

const quizSchema = new mongoose.Schema({
  question: String,
  options: {
    type: [String], // Store options only if the question is MCQ
    default: undefined,
  },
  correctAnswer: mongoose.Schema.Types.Mixed,
  type: { type: String, enum: ["MCQ", "Integer"], required: true },
});

export const Quiz = mongoose.model("Quiz", quizSchema);
