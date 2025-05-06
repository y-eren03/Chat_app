import express from "express";
import authRoutes from "./routes/auth.route.js";
import dotenv from "dotenv";
dotenv.config();
import { connectDB } from "./lib/db.js";

const PORT = process.env.PORT;

const app = express();

app.use("/api/auth", authRoutes);
app.use(express.json());

app.listen(PORT , () => {
    console.log("server bu portta calisiyor => " + PORT);
    connectDB();
});