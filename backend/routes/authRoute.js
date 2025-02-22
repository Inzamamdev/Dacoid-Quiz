import express from "express";
import { validate } from "../middleware/validation.js";
import { signupSchema } from "../validation/authSchema.js";
import { signup } from "../controller/auth.js";
import { loginSchema } from "../validation/authSchema.js";
import { login } from "../controller/auth.js";
import { verifyToken } from "../middleware/verifyToken.js";

const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
router.get("/user", verifyToken, (req, res) => {
  const user = req.user;
  res.json({ name: user.name, id: user.id });
});
router.post("/logout", (req, res) => {
  res.clearCookie("token").json({ message: "Logged out" });
});
export default router;
