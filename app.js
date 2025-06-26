const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const rewardRoutes = require('./routes/rewardRoutes');
const userRoutes = require('./routes/userRoutes');

dotenv.config();

const app = express();

app.use(express.json());


app.use('/auth', authRoutes);
app.use('/rewards', rewardRoutes);
app.use('/users', userRoutes);

app.get('/', (req, res) => {
  res.send('LoyalBox API is running...');
});

module.exports = app;

