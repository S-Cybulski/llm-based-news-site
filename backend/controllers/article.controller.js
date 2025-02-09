import { getNewsArticles } from "../config/newsAPI.js";
import Article from "../models/article.model.js";
import { createSummary } from "./summary.controller.js";

export const createArticles = async (req, res) => {

    try {
        const articles = await getNewsArticles();

        for (const article of articles) {
            const existingArticle = await Article.findOne({
                title: article.title,
            });

            if (!existingArticle) {
                const newArticle = new Article(article);

                console.log(newArticle);

                newArticle.summary = await createSummary(article.url);

                await newArticle.save();
            }
        }

        res.status(201).json({ success: true, data: articles });
    } catch (error) {
        console.error("Error in saving article:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};

export const getArticles = async (req, res) => {
    try {
        const articles = await Article.find({});
        res.status(200).json({ success: true, data: articles });
    } catch (error) {
        console.log("error in fetching articles:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
