import express from "express";
import { getAllUserCatchCards, deleteOneCatchCard } from "../controllers/account.controllers.js";

const router = express.Router();

router.get("/catchcards/:name", getAllUserCatchCards);
router.post("/catchcards/:id", deleteOneCatchCard)

export default router;
