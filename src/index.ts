import express from "express";
import dotenv from "dotenv";
import studentRoute from "./routes/student.route";
import connectToPostgresDatabase from "./config/studentdb";
// import { connectToDatabase } from "./config/db";

dotenv.config();

const app = express();
const port = process.env.PORT || 3001;
const timestamp = new Date();

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Welcome ");
});

app.use("/api/v1", studentRoute);

// if (process.env.NODE_ENV !== "test") {
app.listen(port, () => {
  console.log(`Server is running on port ${port} at ${timestamp}`);
  connectToPostgresDatabase();
  // connectToDatabase();
});
// }

export default app;
