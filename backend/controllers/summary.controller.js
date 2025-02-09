import { query } from "../config/huggingFaceAPI.js";
import { getContent } from "../config/webScraper.js";

const chunkSize = 4096;

export const createSummary = async (url) => {
    const content = await getContent(url);
    const chunks = await splitIntoChunks(content);
    const summarisedChunks = [];

    for (const chunk of chunks) {
        let summary = await query(chunk);
        summarisedChunks.push(summary[0].summary_text);
    }

    return summarisedChunks.join("\n\n");

};

const splitIntoChunks = async (content) => {
    const chunks = [];
    let startIndex = 0;

    while (startIndex < content.length) {
        let endIndex = startIndex + chunkSize;

        if(endIndex > content.length) {
            endIndex = content.length;
        }

        chunks.push(content.slice(startIndex, endIndex));

        startIndex = endIndex;
    }

    return chunks
};

console.log(await createSummary("https://www.bbc.co.uk/news/articles/c805mjxe2y9o"));

console.log(await createSummary("https://www.bbc.co.uk/news/articles/c4g3yyv4egeo"));

console.log(await createSummary("https://www.bbc.co.uk/news/articles/c9d528g755qo"));