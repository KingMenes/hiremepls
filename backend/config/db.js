// Used to connect to MongoDB

// const mongoose = require("mongoose");
import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DB_CONNECTION);
    console.log(
      `Successfully connected to MongoDB: ${conn.connection.host}`
    );
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default connectDB
// module.exports = connectDB;
