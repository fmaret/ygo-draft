const cardsFr = require("./database/dbCardsFrench.json").data;
const cardsEn = require("./database/dbCardsEnglish.json").data;

fs = require("fs");

let cards = cardsFr;

Object.keys(cardsEn).forEach((cardIndex)=>{
    const card = cardsEn[cardIndex];
    if (!cards.some(c=>c.id==card.id)) {
        console.log(card.name)
        cards.push(card);
    }
})

function writeToFile(obj, fileName){
    fileName = "database/" + fileName;
    fs.exists(fileName, function(exists) {
        if (exists) {
            let decks = JSON.parse(fs.readFileSync(fileName));
            decks.push(obj);
            fs.writeFileSync(fileName, JSON.stringify(decks));
        } else {    
            let json = JSON.stringify(obj);
            fs.writeFileSync(fileName, json);
        }
    });
    
}

writeToFile(cards, "dbCards.json");