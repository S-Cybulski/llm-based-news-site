import express from "express";
import {
    createArticles,
    getArticles,
} from "../controllers/article.controller.js";
import { createSummary } from "../controllers/summary.controller.js";

const router = express.Router();

router.post("/summarise", async (req, res) => {
    try {
        const { url } = req.body;

        if (!url || typeof url !== "string" || !url.startsWith("http")) {
            return res.status(400).json({ error: "Invalid or missing URL" });
        }

        console.log("Received request to summarise:", req.body);
        const summary = await createSummary(url);
        res.status(200).json({ summary });
    } catch (error) {
        console.error("Error in summarising article:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/", createArticles);
router.get("/", getArticles);

export default router;