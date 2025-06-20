const User = require('../models/User');

const getAllUsers = async (req, res) => {
  const users = await User.find({}, 'name email points role');
  res.json(users);
};

const promoteToAdmin = async (req, res) => {
  const { userId } = req.params;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  user.role = 'admin';
  await user.save();

  res.json({ message: 'User promoted to admin' });
};

const earnPoints = async (req, res) => {
  const { userId } = req.user;
  const { amount } = req.body;

  const user = await User.findById(userId);
  if (!user) return res.status(404).json({ message: 'User not found' });

  const earned = amount * 10;
  user.points += earned;
  await user.save();

  res.json({ message: 'Points added', earned, totalPoints: user.points });
};

const getProfile = async (req, res) => {
  const { userId } = req.user;
  const user = await User.findById(userId, 'name email role points');
  res.json(user);
};

module.exports = {
  getAllUsers,
  promoteToAdmin,
  earnPoints,
  getProfile,
};
