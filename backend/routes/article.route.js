import express from "express";
import { createArticles, getArticles } from "../controllers/article.controller.js";

const router = express.Router();

router.post("/", createArticles);
router.get("/", getArticles);

export default router;