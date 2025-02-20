import express from "express";
import { validate } from "../middleware/validation.js";
import { signupSchema } from "../validation/authSchema.js";
import { signup } from "../controller/auth.js";
import { loginSchema } from "../validation/authSchema.js";
import { login } from "../controller/auth.js";
const router = express.Router();

router.post("/signup", validate(signupSchema), signup);
router.post("/login", validate(loginSchema), login);
export default router;
