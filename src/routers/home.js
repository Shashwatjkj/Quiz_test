import { Router } from "express";
import { homeController } from "../controller/home.controller.js";

const router = Router();

router.get("/", homeController);

export default router;