import express from "express";
import connectDb from "./database.js";
import dotenv from "dotenv";
dotenv.config();

const app = express();
app.use(express.json());

connectDb()
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.log("Failed to connect to MongoDB:", err));
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
