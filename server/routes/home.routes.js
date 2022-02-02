import express from "express";
import { getThreeNewestCatchCards } from "../controllers/home.controller.js";

const router = express.Router();

router.get("/catchcards/threenewest", getThreeNewestCatchCards);

export default router;
