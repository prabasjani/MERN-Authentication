import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { connectDB } from "./config/connectDB.js";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3001;

// Common Middlewares
app.use(express.json());
app.use(cors());

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server Running on PORT: " + PORT);
  });
});
