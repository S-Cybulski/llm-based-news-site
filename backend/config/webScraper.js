import puppeteer from "puppeteer-extra";
import StealthPlugin from "puppeteer-extra-plugin-stealth";

puppeteer.use(StealthPlugin());

export const getContent = async (url) => {
    return puppeteer.launch({ headless: true }).then(async (browser) => {
        const page = await browser.newPage();
        await page.goto(url);
        const hostname = new URL(url).hostname
            .replace("www.", "")
            .split(".")[0];
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
            case "theguardian":
                selectors = "div.article-body-commercial-selector p";
                break;
            case "nytimes":
                selectors = "section[name='articleBody'] p";
                break;
            case "aljazeera":
                selectors = "div.wysiwyg p";
                break;
            case "msn":
                selectors = "article p";
                break;
            case "sky":
                selectors = "div.sdc-article-body p";
                break;
            default:
                selectors = "p, div";
                break;
        }

        const pageContent = await page.evaluate((selectors) => {
            const paragraphs = document.querySelectorAll(selectors);
            return Array.from(paragraphs)
                .map((p) => p.innerText)
                .join(" ");
        }, selectors);

        await browser.close();
        return pageContent;
    });
};
