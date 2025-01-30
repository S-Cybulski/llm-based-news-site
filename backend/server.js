import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import articleRoutes from "./routes/article.route.js";

dotenv.config();

const app = express();

app.use("/api/articles", articleRoutes);

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});

