require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const userRoutes = require('./routes/users');

const app = express();
app.use(cors());
app.use(express.json());

// routes
app.use('/api/users', userRoutes);

// connect to DB & start
const PORT = process.env.PORT || 5000;
const MONGO = process.env.MONGODB_URI;

mongoose.connect(MONGO, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
})
.catch(err => {
  console.error('DB connection error:', err.message);
  process.exit(1);
});
