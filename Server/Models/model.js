const mongoose = require('mongoose');
const { Schema } = mongoose;
require('dotenv').config();

const userSchema = new Schema({
    user_name: {
      type: String,
      required: true,
      unique: true
    },
    phone: { 
      type: String,
      required: true
    },
    email: { 
      type: String,
      required: true
    },
    password: { 
      type: String,
      required: true
    }
});
const Users = mongoose.model('Users', userSchema);
const connectToDatabase = async () => {
  const uri = process.env.URI;
  if (!uri) {
      console.error('Database URI is not defined in environment variables');
      return;
  }
  try {
      await mongoose.connect(uri);
      console.log("Connected to database successfully"); 
      // return Users;
  } catch (error) {
      console.error("Error connecting to the database:", error);
  }
};

module.exports = {
  Users,
  connectToDatabase
};