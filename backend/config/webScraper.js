import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";
import { query } from "../config/huggingFaceAPI.js";

puppeteer.use(StealthPlugin());

export const getContent = async (url) => {
    return puppeteer.launch({ headless: true }).then(async (browser) => {
        const page = await browser.newPage();
        await page.goto(url);

        const pageContent = await page.evaluate(() => {
            const paragraphs = document.querySelectorAll("article p, main p");
            return Array.from(paragraphs)
                .map((p) => p.innerText)
                .join(" ");
        });

        await browser.close();
        return pageContent;
    });
};