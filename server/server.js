import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import { dirname } from "./lib/pathHelpers.js";
import path from "path";
import multer from "multer";

dotenv.config();

const __dirname = dirname(import.meta.url);
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
  filename: (req, file, cb) => {
    const fileName = `${Date.now()}${path.extname(file.originalname)};`;
    cb(null, fileName);
  },
});

const uploadImage = multer({ storage }).single("catchPhoto");

server.post("/image", uploadImage, (req, res) => {
  console.log(req.file);
  if (req.file)
    return res.json({ message: "Upload ok", photoPath: req.file.path });
  res.send("Upload failed");
});

server.get("/api", (_req, res) => {
  res.json({ message: "Hello World" });
});

server.use(express.static(path.join(__dirname, "../client/dist")));
server.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "../client/dist", "index.html"));
});

server.listen(PORT, () => {
  console.log("Fish-Finder Server is up and running on port " + PORT);
});
