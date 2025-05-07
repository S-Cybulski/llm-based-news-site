import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

export const getContent = async (url) => {
    return puppeteer.launch({ headless: true }).then(async (browser) => {
        const page = await browser.newPage();
        await page.goto(url);
        const hostname = new URL(url).hostname.replace("www.", "").split(".")[0];
        let selectors = "p, div";

        switch (hostname) {
            case "bbc":
                selectors = "article p, main p";
                break;
            case "independent":
                selectors = "#main p";
                break;
            case "cbc":
                selectors = ".story p, p#MainContentDescription";
                break;
            default:
                break;
        }

        const pageContent = await page.evaluate((selectors) => {
            const paragraphs = document.querySelectorAll(selectors);
            return Array.from(paragraphs)
                .map((p) => p.innerText)
                .join(" ");
        }, selectors);

        await browser.close();
        return pageContent.toString();
    });
};