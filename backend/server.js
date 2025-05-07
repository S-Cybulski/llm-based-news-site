import express from "express";
import dotenv from "dotenv";
import articleRoutes from "./routes/article.route.js";
import cron from "node-cron";
import cors from "cors";
import authRoutes from "./routes/auth.route.js";
import { connectDB } from "./config/db.js";
import { createArticles } from "./controllers/article.controller.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/articles", articleRoutes);
app.use(cors());
app.use('/api/auth', authRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
    setTimeout(() => {
        createArticles();
    }, 60_000);
    cron.schedule("30 * * * *", () => {
        createArticles();
    });
});

