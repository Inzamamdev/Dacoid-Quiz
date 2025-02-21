import mongoose from "mongoose";

const attemptSchema = new mongoose.Schema({
  userId: mongoose.Schema.Types.ObjectId, // Reference to user
  quizId: mongoose.Schema.Types.ObjectId, // Reference to quiz
  answers: [
    {
      questionId: mongoose.Schema.Types.ObjectId,
      answer: mongoose.Schema.Types.Mixed,
    },
  ],
  timestamp: { type: Date, default: Date.now },
});

export const Attempt = mongoose.model("Attempt", attemptSchema);
