import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import path from "path";
import multer from "multer";
import { CatchCard, Marker } from "./models/catchCard.model.js";
import fs from "fs";

dotenv.config();

const __dirname = process.cwd();
const server = express();

const PORT = process.env.PORT || 4000;

const dbUser = process.env.DB_USER;
const dbPw = process.env.DB_PW;
const dbHost = process.env.DB_HOST;
const dbName = process.env.DB_NAME;

mongoose.connect(
  `mongodb+srv://${dbUser}:${dbPw}@${dbHost}/${dbName}?retryWrites=true&w=majority`
);

server.use(express.json());
server.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: `${__dirname}/uploads`,
  filename: (_req, file, cb) => {
    const fileName = `${Date.now()}${file.originalname}`;
    cb(null, fileName);
  },
});

const uploadImage = multer({ storage }).single("catchPhoto");

server.post("/image", uploadImage, (req, res) => {
  if (req.file)
    return res.json({ message: "Upload ok", photoPath: req.file.path });
  res.send("Upload failed");
});

server.get("/api/catchcards/markers", async (_req, res) => {
  const allMarkers = await Marker.find();
  res.json(allMarkers);
});

server.get("/api/catchcards/onmarker/:markerlatlng", async (req, res) => {
  let splitter = req.params.markerlatlng.indexOf("_")
  let searchlat = req.params.markerlatlng.substring(0,splitter)
  let searchlng = req.params.markerlatlng.substring(splitter+1,req.params.markerlatlng.length)
  const foundCatchCards = await CatchCard.find({ "latlng.lat": searchlat, "latlng.lng": searchlng });
 res.json(foundCatchCards);
 console.log(foundCatchCards);
});

server.post("/api/catchcards", async (req, res) => {
  let newMarker = new Marker({
    lat: req.body.latlng.lat,
    lng: req.body.latlng.lng,
  });

  let newCatch;
  if (req.body.img.length > 1) {
    newCatch = new CatchCard({
      name: req.body.name,
      fishtype: req.body.fishtype,
      datetime: req.body.datetime,
      length: req.body.length,
      weight: req.body.weight,
      latlng: req.body.latlng,
      bait: req.body.bait,
      depth: req.body.depth,
      tackle: req.body.tackle,
      img: {
        data: fs.readFileSync(req.body.img),
        contentType: "image/*",
      },
    });
  } else {
    newCatch = new CatchCard({
      name: req.body.name,
      fishtype: req.body.fishtype,
      datetime: req.body.datetime,
      length: req.body.length,
      weight: req.body.weight,
      latlng: req.body.latlng,
      bait: req.body.bait,
      depth: req.body.depth,
      tackle: req.body.tackle,
    });
  }
  try {
    const result = await newCatch.save();
    await newMarker.save();
    res.json(result);
  } catch (error) {
    res.json(error.message);
  }
});

server.use(express.static(path.join(__dirname, "./client/dist")));
server.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

server.listen(PORT, () => {
  console.log("Fish-Finder Server is up and running on port " + PORT);
});
