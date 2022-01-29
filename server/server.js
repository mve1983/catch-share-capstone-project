import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import path from "path";
import { notFound, errorHandler } from "./middlewares/errorMiddlewares.js"
import MapRoutes from "./routes/map.routes.js";
import UserRoutes from "./routes/user.routes.js"

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

server.post("/api/image",uploadImage, (req, res) => {
  if (req.file)
    return res.json({ message: "Upload ok", photoPath: req.file.path });
  res.send("Upload failed");
});

server.use("/api", [UserRoutes, MapRoutes]);

server.use(express.static(path.join(__dirname, "./client/dist")));
server.get("/*", (_req, res) => {
  res.sendFile(path.join(__dirname, "./client/dist", "index.html"));
});

server.use(notFound)
server.use(errorHandler)

server.listen(PORT, () => {
  console.log("CatchandShare Server is up and running on port " + PORT);
});
