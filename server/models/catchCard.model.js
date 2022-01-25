import mongoose from "mongoose";

const markerSchema = new mongoose.Schema({
  lat: Number,
  lng: Number,
});

const catchCardSchema = new mongoose.Schema({
  name: String,
  fishtype: String,
  date: String,
  time: String,
  length: Number,
  weight: Number,
  latlng: markerSchema,
  depth: Number,
  bait: String,
  tackle: String,
  img: String,
});

const CatchCard = mongoose.model("CatchCard", catchCardSchema);
const Marker = mongoose.model("Marker", markerSchema);

export { CatchCard, Marker };
