import { CatchCard, Marker } from "../models/catchCard.model.js";
import fs from "fs";

const getAllMarkers = async (_req, res) => {
  const allMarkers = await Marker.find();
  res.json(allMarkers);
};

const getCatchcardsOnMarker = async (req, res) => {
  let splitter = req.params.markerlatlng.indexOf("_");
  let searchlat = req.params.markerlatlng.substring(0, splitter);
  let searchlng = req.params.markerlatlng.substring(
    splitter + 1,
    req.params.markerlatlng.length
  );
  const foundCatchCards = await CatchCard.find({
    "latlng.lat": searchlat,
    "latlng.lng": searchlng,
  });
  res.json(foundCatchCards);
};

const saveNewCatchCard = async (req, res) => {
  let newMarker = new Marker({
    markerOwner: req.body.name,
    lat: req.body.latlng.lat,
    lng: req.body.latlng.lng,
  });

  function imageInBase64(image) {
    if (image.length === 0) return "";
    let image64 = fs.readFileSync(image, { encoding: "base64" });
    return image64;
  }
  let img64 = imageInBase64(req.body.img);

  let newCatch = new CatchCard({
    name: req.body.name,
    fishtype: req.body.fishtype,
    date: req.body.date,
    time: req.body.time,
    length: req.body.length,
    weight: req.body.weight,
    latlng: req.body.latlng,
    bait: req.body.bait,
    depth: req.body.depth,
    tackle: req.body.tackle,
    img: img64,
  });

  try {
    await newCatch.save();
    await newMarker.save();
    res.json({ done: true, message: "Fangmeldung erstellt." });
  } catch (error) {
    res.json({ done: false, message: error.message });
  }
};

export { getAllMarkers, getCatchcardsOnMarker, saveNewCatchCard };
