const Reward = require('../models/Reward');
const User = require('../models/User');

const getAllRewards = async (req, res) => {
  const rewards = await Reward.find();
  res.json(rewards);
};

const createReward = async (req, res) => {
  const { title, pointsRequired } = req.body;
  const reward = await Reward.create({ title, pointsRequired });
  res.status(201).json(reward);
};

const updateReward = async (req, res) => {
  const { id } = req.params;
  const reward = await Reward.findByIdAndUpdate(id, req.body, { new: true });
  if (!reward) return res.status(404).json({ message: 'Reward not found' });
  res.json(reward);
};

const deleteReward = async (req, res) => {
  const { id } = req.params;
  const reward = await Reward.findByIdAndDelete(id);
  if (!reward) return res.status(404).json({ message: 'Reward not found' });
  res.json({ message: 'Reward deleted' });
};

const redeemReward = async (req, res) => {
  const { userId } = req.user;
  const { rewardId } = req.body;

  const reward = await Reward.findById(rewardId);
  const user = await User.findById(userId);

  if (!reward || !user) return res.status(404).json({ message: 'Invalid user or reward' });
  if (user.points < reward.pointsRequired)
    return res.status(400).json({ message: 'Not enough points' });

  user.points -= reward.pointsRequired;
  await user.save();

  res.json({ message: 'Reward redeemed', remainingPoints: user.points });
};

module.exports = {
  getAllRewards,
  createReward,
  updateReward,
  deleteReward,
  redeemReward,
};
