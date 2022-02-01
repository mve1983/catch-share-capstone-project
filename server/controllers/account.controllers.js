import { CatchCard, Marker } from "../models/catchCard.model.js";

const getAllUserCatchCards = async (req, res) => {
  const foundCatchCards = await CatchCard.find({ name: req.params.name });
  res.json(foundCatchCards);
};

const deleteOneCatchCard = async (req, res) => {
  const catchCard = await CatchCard.findById(req.params.id);

  try {
    await Marker.deleteOne(catchCard.latlng._id);
    await CatchCard.findByIdAndDelete(req.params.id);
    res.json({ done: true, message: "Fangmeldung gelöscht." });
  } catch (error) {
    res.json({ done: false, message: error.message });
  }
};

export { getAllUserCatchCards, deleteOneCatchCard };
