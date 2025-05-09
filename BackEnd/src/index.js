import express from 'express';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

import {connectDB} from "./lib/db.js";

import authRoutes from "../src/routes/auth.route.js";
import messageRoutes from "../src/routes/message.route.js";

dotenv.config();
const app = express();

const PORT = process.env.PORT;


app.use(express.json());//önemli unutmuşum
app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);
app.use(cookieParser());

app.listen(5001,() => {
    console.log('Server started on port:'+PORT);
    connectDB();
});