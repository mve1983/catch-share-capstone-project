import express from "express";
import { getAllUserCatchCards } from "../controllers/account.controllers.js";

const router = express.Router();

router.get("/catchcards/:name", getAllUserCatchCards);

export default router;
