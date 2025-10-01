require('dotenv').config();
const mongoose = require('mongoose');
const User = require('./models/User');

const users = [
  { firstName: 'Aman', lastName: 'Sharma', email: 'aman@example.com', phone: '9876543210', role: 'Admin', address: 'Delhi' },
  { firstName: 'Ravi', lastName: 'Kumar', email: 'ravi@example.com', phone: '9123456780', role: 'User', address: 'Mumbai' },
  { firstName: 'Priya', lastName: 'Singh', email: 'priya@example.com', phone: '9988776655', role: 'User', address: 'Bengaluru' }
];

const run = async () => {
  await mongoose.connect(process.env.MONGODB_URI);
  await User.deleteMany({});
  await User.insertMany(users);
  console.log('Seed done');
  mongoose.disconnect();
};

run().catch(console.error);
