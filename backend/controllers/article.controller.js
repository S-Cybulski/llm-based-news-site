import { getNewsArticles } from "../config/newsAPI.js";
import Article from "../models/article.model.js";
import { createSummary } from "./summary.controller.js";
import { classifyArticle } from "../config/huggingFaceAPI.js";

export const createArticles = async (req, res) => {

    try {
        let articles;

        articles = await getNewsArticles();

        for (const article of articles) {
            const existingArticle = await Article.findOne({
                title: article.title,
            });

            if (!existingArticle) {
                const newArticle = new Article(article);

                newArticle.category = await classifyArticle(newArticle.description);
                newArticle.summary = await createSummary(article.url);
                
                await newArticle.save();

                console.log(article.title + ": Successful \n\n");
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
