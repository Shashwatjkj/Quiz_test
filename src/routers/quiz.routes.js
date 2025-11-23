import { Router } from "express";
import { serveQuiz } from "../controller/quizController.js";
import { submitQuiz } from "../controller/quizController.js";

const router = Router();

// POST /api/students
router.get("/get-quiz", serveQuiz);
router.post("/submit-quiz",submitQuiz);

export default router;