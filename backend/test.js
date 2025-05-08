// import { compareArticles } from "./config/huggingFaceAPI.js";
// import { createSummary } from "./controllers/summary.controller.js";


// const article1 = await createSummary("https://www.bbc.co.uk/news/articles/ce848g8l8vro");
// console.log(article1);
// const article2 = await createSummary("https://www.bbc.co.uk/news/uk-england-norfolk-66267860");
// console.log(article2);

// const comparisonResult = await compareArticles(article1, article2);
// console.log(comparisonResult);

import { classifyArticle, classifyArticleLocal } from "./config/huggingFaceAPI.js";

const data = await classifyArticleLocal("Cristiano's Ronaldo's eldest son is called up to the Portugal Under-15…");

console.log(data);