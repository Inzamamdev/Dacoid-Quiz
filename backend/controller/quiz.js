import { Quiz } from "../models/Quiz.js";

export const getQuiz = async (req, res) => {
  try {
    const updateResult = await Quiz.updateMany(
      { type: "Integer", options: { $exists: true } }, // Only update if 'options' exists
      { $unset: { options: [] } }
    );

    // Fetch the updated documents
    const questions = await Quiz.find();

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching quiz questions" });
  }
};
