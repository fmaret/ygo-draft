const puppeteer = require('puppeteer');

async function exportOtkExpertDeckFromUrl(url) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const res = await page.evaluate(() => {
        // let page = document.querySelector('.demi_page');
        // let cards = Array.from(page.querySelectorAll('.tabcard'));
        let aTags = Array.from(document.querySelectorAll('.tabcard a'));
        const cards = aTags.map((a)=>{
            const list = a ? a.getAttribute('href').split("/") : null;
            const labelSplit = a.querySelector("span").textContent.split(" ");
            const count = parseInt(labelSplit[0]);
            const name = labelSplit.slice(1, labelSplit.length).join(" ");
            return {
                code: list[list.length-2],
                name: name,
                count: count
            }
        });
        const deckName = document.querySelector("h1").textContent;
        return {
            name: deckName,
            cards: cards
        }
    });
    browser.close();
    return res;
}

const fs = require('fs');

function writeToFile(obj, fileName){
    fileName = "database/" + fileName;
    fs.exists(fileName, function(exists) {
        if (exists) {
            let decks = JSON.parse(fs.readFileSync(fileName));
            decks.push(obj);
            fs.writeFileSync(fileName, JSON.stringify(decks));
        } else {    
            let json = JSON.stringify([obj]);
            fs.writeFileSync(fileName, json);
        }
    });
    
}

const cards = require("./database/dbCards.json");

function convertResInFile(res) {
    const deck = res.cards.map((card) => {
        const cardName = card.name;
        let cardCode = card.code;
        let res = null;
        try {
            cardCode = cardCode.split("-")[0] + "-EN" + "0".repeat(3-cardCode.split("-")[1].length) + cardCode.split("-")[1];
            res = cards.filter((c)=> {
                return c?.card_sets?.some((set)=>set.set_code == cardCode);
            })[0]
        } catch(error) {
            res = null;
        }
        if(!res) {
            res = cards.filter((c)=> c?.name == cardName)[0];
        }
        return {
            id: res?.id,
            count: card?.count,
            name: card?.name
        }
    })
    writeToFile({
        name: res.name,
        deck,
    }, "prebuiltDecks.json")
}


async function getDecksUrls() {
    const url = "https://www.otk-expert.fr/yugioh/decks/?dpage=1&action=decks-populaires"
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);
    const res = await page.evaluate(() => {
        return Array.from(document.querySelectorAll("#main-content .box")).map(e=>e.querySelector("a").href);
    })
    return res
}

async function scrapeDecks() {
    const urls = await getDecksUrls()
    for(let i=0;i<urls.length;i++){
        console.log("Téléchargement du deck :", urls[i])
        const res = await exportOtkExpertDeckFromUrl(urls[i]);
        convertResInFile(res);
    }
}

scrapeDecks().then(()=>{})