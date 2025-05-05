import { getNewsArticles } from "../config/newsAPI.js";
import Article from "../models/article.model.js";
import { createSummary } from "./summary.controller.js";
import { classifyArticle } from "../config/huggingFaceAPI.js";

let isProcessing = false;

export const createArticles = async (req, res) => {

    if(isProcessing) {
        return;
    }

    isProcessing = true;
    console.log("Fetching Articles");

    try {
        let articles;

        articles = await getNewsArticles();
        
        for (const article of articles) {
            try {
                const existingArticle = await Article.findOne({
                    title: article.title,
                });
                
                if (!existingArticle) {
                    const newArticle = new Article(article);
    
                    newArticle.category = await classifyArticle(newArticle.description);
                    //newArticle.summary = await createSummary(article.url);
                    
                    await newArticle.save();
                }
            } catch (error) {
                console.log("Error saving article: ", error.message);
                continue;
            }
        }

        //res.status(201).json({ success: true, data: articles });
    } catch (error) {
        console.error("Error in saving articles:", error.message);
    }

    isProcessing = false;
};

export const getArticles = async (req, res) => {
    try {
        const category = req.path.slice(1);
        let articles;
        switch (category) {
            case "business":
                articles = await Article.find({category: "business"});
                break;
            case "entertainment":
                articles = await Article.find({category: "entertainment"});
                break;
            case "health":
                articles = await Article.find({category: "health"});
                break;
            case "politics":
                articles = await Article.find({category: "politics"});
                break;
            case "science":
                articles = await Article.find({category: "science"});
                break;
            case "sports":
                articles = await Article.find({category: "sports"});
                break;
            case "technology":
                articles = await Article.find({category: "technology"});
                break;
            case "world-news":
                articles = await Article.find({category: "world news"});
                break;
            default:
                articles = await Article.find({});
                break;
        }
        res.status(200).json({ success: true, data: articles });
    } catch (error) {
        console.log("Error in fetching articles:", error.message);
        res.status(500).json({ success: false, message: "Server Error" });
    }
};
