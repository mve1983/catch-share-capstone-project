import mongoose from "mongoose";

const catchCardSchema = new mongoose.Schema({
  name: String,
  fishtype: String,
  datetime: String,
  length: Number,
  weight: Number,
  latlng: {
    type: [Number],
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
