import { embedSentence } from "./config/huggingFaceAPI.js";
import { getNewsArticles } from "./config/newsAPI.js";

//const sentences = await getNewsArticles();
const sentences = [ "Marine Le Pen found guilty in EU funding embezzlement case", "Marine Le Pen charged in EU funding embezzlement case" ];
//const titles = sentences.map((sentence) => sentence.title);
const source_sentence = "Marine Le Pen found guilty in EU funding embezzlement case";

const test = await embedSentence(sentences, source_sentence);



console.log(test);