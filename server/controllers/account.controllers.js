import { CatchCard, Marker } from "../models/catchCard.model.js";
import User from "../models/user.model.js";

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

const deleteUserAndAllData = async (req, res) => {
  const user = await User.findById(req.params.id);
  const userCatchCards = await CatchCard.find({ name: user.name });
  const allUserMarkerIDs = userCatchCards.map((card) => card.latlng._id);

  try {
    await Marker.deleteMany({ $in: allUserMarkerIDs });
    await CatchCard.deleteMany({ name: user.name });
    await User.deleteOne(user);
    res.json({ done: true, message: "Account gelöscht." });
  } catch (error) {
    res.json({ done: false, message: error.message });
  }
};

export { getAllUserCatchCards, deleteOneCatchCard, deleteUserAndAllData };
