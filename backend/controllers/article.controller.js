import { query } from "../config/huggingFaceAPI.js";
import { getNewsArticles } from "../config/newsAPI.js";
import Article from "../models/article.model.js";

export const createArticles = async (req, res) => {

    try {
        const articles = await getNewsArticles();

        for (const article of articles) {
            const existingArticle = await Article.findOne({
                title: article.title,
            });

            if (!existingArticle) {
                const newArticle = new Article(article);

                // if(newArticle.content == null){
                //     continue;
                // }

                console.log(newArticle);

                //let summary = await query(newArticle.content);

                //newArticle.content = summary[0].summary_text;

                //console.log(summary[0].summary_text);

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
