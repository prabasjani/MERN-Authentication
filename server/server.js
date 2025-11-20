import express from "express";
import cors from "cors";
import { configDotenv } from "dotenv";
import { connectDB } from "./config/connectDB.js";
import { AuthRoute } from "./routes/Auth.routes.js";
import cookieParser from "cookie-parser";

configDotenv();

const app = express();
const PORT = process.env.PORT || 3000;

// Common Middlewares
app.use(express.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(cookieParser());

app.use("/api/v1/auth", AuthRoute);

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log("Server Running on PORT: " + PORT);
  });
});
