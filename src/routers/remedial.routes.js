import { Router } from "express";
import { getRemedialTask } from "../controller/remedialcontroller.js";

const router = Router();

router.post("/get-remedial", getRemedialTask);

export default router;
