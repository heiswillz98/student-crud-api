import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import studentRoute from "./routes/sudent.route";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const timestamp = new Date();
const dbUrl = process.env.MONGODB_URL;

app.use(express.json());

const connectToDatabase = async () => {
  try {
    mongoose.connect(dbUrl as string);
    console.log("connected to db sucessfully");
  } catch (error) {
    console.log(error);
  }
};

app.get("/", (req, res) => {
  res.send("Welcome ");
});

app.use("/student/api", studentRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port} at ${timestamp}`);
  connectToDatabase();
});
