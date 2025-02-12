import express from "express";
import {
    createArticles,
    getArticles,
} from "../controllers/article.controller.js";

const router = express.Router();

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
