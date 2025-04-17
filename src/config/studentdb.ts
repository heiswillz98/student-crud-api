import { Pool } from "pg";
import logger from "../utils/logger";
import dotenv from "dotenv";

dotenv.config();

export const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.HOST,
  database: process.env.DB_NAME,
  password: process.env.PASSWORD,
  port: 5432,
});

const connectToPostgresDatabase = async () => {
  try {
    await pool.query("SELECT 1"); // simple test query
    logger.info("✅ Connected to PostgreSQL database successfully");
  } catch (error) {
    logger.error("❌ Failed to connect to PostgreSQL database: " + error);
    process.exit(1); // stop the app if DB connection fails
  }
};

export default connectToPostgresDatabase;
