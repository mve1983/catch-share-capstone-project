import { CatchCard } from "../models/catchCard.model.js";

const getAllUserCatchCards = async (req, res) => {
  const foundCatchCards = await CatchCard.find({ name: req.params.name });
  res.json(foundCatchCards);
};

export { getAllUserCatchCards };
