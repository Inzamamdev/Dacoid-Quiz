import express from "express";
import { getQuiz } from "../controller/quiz.js";

const router = express.Router();

router.get("/quizzes", getQuiz);
export default router;
