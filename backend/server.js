import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import articleRoutes from "./routes/article.route.js";
import { createArticles } from "./controllers/article.controller.js";
import cron from "node-cron";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/articles", articleRoutes);

app.listen(PORT, () => {
    connectDB();
    console.log("Server started at http://localhost:" + PORT);
    createArticles();
    cron.schedule("30 * * * *", () => {
        createArticles();
    });
});

