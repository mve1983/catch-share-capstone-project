import express from "express";
import {
  getAllMarkers,
  getCatchcardsOnMarker,
  saveNewCatchCard,
} from "../controllers/map.controllers.js";

const router = express.Router();

router.get("/api/catchcards/markers", getAllMarkers);
router.get("/api/catchcards/onmarker/:markerlatlng", getCatchcardsOnMarker);
router.post("/api/catchcards", saveNewCatchCard);

export default router;
