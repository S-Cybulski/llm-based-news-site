import mongoose from "mongoose";
import { getNewsArticles } from '../config/newsAPI.js';
import Article from "../models/article.model.js";

export const createArticles = async (req,res) => {

    // will be used for generating summarised articles later.
    try {
        const articles = await getNewsArticles();

        articles.forEach(article => {
            const newArticle = new Article(article);

            newArticle.save();
        });

        res.status(201).json({ success: true, data: articles});
    }
    catch (error) {
        console.error("Error in saving article:", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
};

export const getArticles = async (req, res) => {
    try {
        const articles = await Article.find({});
        res.status(200).json({ success: true, data: articles});
    } catch (error) {
        console.log("error in fetching articles:", error.message);
        res.status(500).json({ success: false, message: "Server Error"});
    }
};