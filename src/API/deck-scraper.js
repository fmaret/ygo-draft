const { cards } = require('@/API/database');

const puppeteer = require('puppeteer');

async function exportOtkExpertDeckFromUrl(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const res = await page.evaluate(() => {
        // let page = document.querySelector('.demi_page');
        // let cards = Array.from(page.querySelectorAll('.tabcard'));
        let as = Array.from(document.querySelectorAll('.tabcard a'));
        return as.map((a)=>{
            const list = a ? a.getAttribute('href').split("/") : null
            return list[list.length-2]
        });
    });
    browser.close();
    return res;
}

const url = "https://www.otk-expert.fr/yugioh/decks/ailes-noires-ultimes/"
// exportOtkExpertDeckFromUrl(url).then((res)=> {
//     console.log(res)
// });

const a = cards[0]
console.log(a)