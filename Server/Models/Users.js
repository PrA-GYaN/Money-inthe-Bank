const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config();

const userSchema = new Schema({
  user_name: {
    type: String,
    required: true,
    unique: true,
  },
  phone: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  balance: { type: Number, default: 0.0 },
  pin: { type: String, required: true, trim: true }
},{
  timestamps:true
});
const Users = mongoose.model('Users', userSchema);

module.exports = Users;