import { localSummarise } from "./config/huggingFaceAPI.js";

const url = "https://www.bbc.co.uk/news/articles/ce848g8l8vro";
const url2 = "https://www.theguardian.com/business/2025/may/07/danish-firm-shelves-huge-uk-windfarm-project-over-rising-costs";
const url3 = "https://www.bbc.co.uk/news/articles/cly3807exyno";

const summary1 = await localSummarise(url);
const summary2 = await localSummarise(url2);
const summary3 = await localSummarise(url3);

console.log("Summary 1: ", summary1);
console.log("\nSummary 2: ", summary2);
console.log("\nSummary 3: ", summary3);