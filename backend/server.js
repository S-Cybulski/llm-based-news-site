import express from "express";
import dotenv from "dotenv";
import { connectDB } from './config/db.js';
import { getArticles } from './config/newsAPI.js'

dotenv.config();

const app = express();

app.get("/feed", async (req,res) => {
    const articles = await getArticles();
    res.send(articles);
});

app.listen(5000, () => {
    connectDB();
    console.log("Server started at http://localhost:5000");
});

