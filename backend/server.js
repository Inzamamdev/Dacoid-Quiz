import express from "express";
import connectDb from "./database.js";
import dotenv from "dotenv";
import authRouter from "./routes/authRoute.js";
import quizRouter from "./routes/quizRoute.js";
dotenv.config();

const app = express();
app.use(express.json());

connectDb()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));

app.use("/api/auth", authRouter);
app.use("/api/user", quizRouter);
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
