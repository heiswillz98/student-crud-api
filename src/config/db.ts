import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const dbUrl = process.env.MONGODB_URL;

export const connectToDatabase = async () => {
  try {
    mongoose.connect(dbUrl as string);
    console.log("connected to db sucessfully");
  } catch (error) {
    console.log(error);
  }
};
