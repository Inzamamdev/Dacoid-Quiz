import { Quiz } from "../models/Quiz.js";

export const getQuiz = async (req, res) => {
  try {
    const updateResult = await Quiz.updateMany(
      { type: "Integer", options: { $exists: true } }, // Only update if 'options' exists
      { $unset: { options: [] } }
    );

    console.log("Update Result:", updateResult); // Log update result to check matched & modified counts

    // Fetch the updated documents
    const questions = await Quiz.find();

    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Error fetching quiz questions" });
  }
};
