import { Router } from "express";
import { createStudent } from "../controller/studentController.js";

const router = Router();

// POST /api/students
router.post("/create", createStudent);

export default router;
