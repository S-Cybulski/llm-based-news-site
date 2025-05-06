import { query, localSummarise } from "../config/huggingFaceAPI.js";
import { getContent } from "../config/webScraper.js";

const chunkSize = 4096;

export const createSummary = async (url) => {
    const content = await getContent(url);
    //must split into chunks otherwise content will exceed size limit
    const chunks = await splitIntoChunks(content);
    const summarisedChunks = [];

    for (const chunk of chunks) {
        let summary = await localSummarise(chunk);
        console.log(summary);
        summarisedChunks.push(summary);
        console.log("Summarising chunk: Success")
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