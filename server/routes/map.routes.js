import express from "express";
import {
  getAllMarkers,
  getCatchcardsOnMarker,
  saveNewCatchCard,
} from "../controllers/map.controllers.js";

const router = express.Router();

router.get("/catchcards/markers", getAllMarkers);
router.get("/catchcards/onmarker/:markerlatlng", getCatchcardsOnMarker);
router.post("/catchcards", saveNewCatchCard);

export default router;
