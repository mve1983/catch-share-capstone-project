import mongoose from "mongoose";

const catchCardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  fishtype: {
    type: String,
    required: true,
  },
  datetime: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  weight: {
    type: Number,
    required: true,
  },
  lat: {
    type: Number,
    required: true,
  },
  lng: {
    type: Number,
    required: true,
  },
  depth: Number,
  bait: String,
  tackle: String,
  img: {
    data: Buffer,
    contentType: String,
  },
});

const CatchCard = mongoose.model("CatchCard", catchCardSchema);

export default CatchCard;
