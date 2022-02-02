import { CatchCard } from "../models/catchCard.model.js";

const getThreeNewestCatchCards = async (_req, res) => {
  const foundCatchCards = await CatchCard.find({}).sort({ _id: -1 }).limit(3);
  res.json(foundCatchCards);
};

export { getThreeNewestCatchCards };
