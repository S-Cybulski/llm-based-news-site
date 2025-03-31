import express from "express";
import {
    createArticles,
    getArticles,
} from "../controllers/article.controller.js";
import { createSummary } from "../controllers/summary.controller.js";

const router = express.Router();

router.post("/summarise", async (req, res) => {
    try {
        console.log("Received request to summarise:", req.body);
        const { url }   = req.body;
        const summary = await createSummary(url);

        res.status(200).json({ summary });
    } catch (error) {
        console.error("Error in summarising article:", error);
        res.status(500).json({ error: "Internal server error" });
    }
});

router.post("/", createArticles);
router.get("/", getArticles);

router.post("/business", createArticles);
router.get("/business", getArticles);

router.post("/entertainment", createArticles);
router.get("/entertainment", getArticles);

router.post("/health", createArticles);
router.get("/health", getArticles);

router.post("/politics", createArticles);
router.get("/politics", getArticles);

router.post("/science", createArticles);
router.get("/science", getArticles);

router.post("/sports", createArticles);
router.get("/sports", getArticles);

router.post("/technology", createArticles);
router.get("/technology", getArticles);

router.post("/world-news", createArticles);
router.get("/world-news", getArticles);

export default router;
