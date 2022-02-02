import express from "express";
import {
  getAllUserCatchCards,
  deleteOneCatchCard,
  deleteUserAndAllData,
} from "../controllers/account.controllers.js";

const router = express.Router();

router.get("/catchcards/:name", getAllUserCatchCards);
router.post("/catchcards/:id", deleteOneCatchCard);
router.post("/user/:id", deleteUserAndAllData);

export default router;
