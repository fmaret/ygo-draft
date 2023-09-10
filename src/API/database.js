export const cards = require("./database/dbCards.json").data;
export const sets = require("./database/dbSets.json");

/*const cardsLOB = cards.filter(card => {
  return card.card_sets?.some(set => set.set_code.includes("LOB"));
});*/

export function getRandomCard() {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}

export function getCardById(id) {
  return cards.find(card => card.id === id);
}

export function get100Cards() {
  return cards.slice(0, 100);
}

export function getBoosterNbOfCards() {
  return 9;
}

export function getCardsOfSet(setCode) {
  return cards.filter(card => {
    return card.card_sets?.some(set => set.set_code.includes(setCode))
  }).map((card) => ({
    ...card,
    chosenSet: card.card_sets.find(set => set.set_code.includes(setCode))
  }))
}


function pickRandomCardInListEquiprobe(cardsList, rarity) {
  const cardsListByRarity = cardsList.filter((card) => card.chosenSet.set_rarity == rarity)
  const randomIndex = Math.floor(Math.random() * cardsListByRarity.length);
  return cardsListByRarity[randomIndex];
}

export function getRandomCardInList(cardsList, rarity) {
  // Probabilités de rarities
  const probCommune = 29/30;
  const probSecretRare = 1/23;
  const probUltraRare = 1/12;
  const probSuperRare = 1/4;
  const probRare = 1 - (probSuperRare + probUltraRare + probSecretRare);
  
  const r = Math.random();
  if (rarity == "Common") {
     if (r <= probCommune) {
      console.log("coucou")
      return pickRandomCardInListEquiprobe(cardsList, "Common")
     } else {
      console.log("azeaze")
      return pickRandomCardInListEquiprobe(cardsList, "Short Print")
     }
  } else if (rarity == "Rare") {
    if (r <= probRare) {
      return pickRandomCardInListEquiprobe(cardsList, "Rare")
    } else if (r <= probRare+probSuperRare) {
      return pickRandomCardInListEquiprobe(cardsList, "Super Rare")
    } else if (r <= probRare+probSuperRare+probUltraRare) {
      return pickRandomCardInListEquiprobe(cardsList, "Ultra Rare")
    } else {
      return pickRandomCardInListEquiprobe(cardsList, "Secret Rare")
    }
  }
}

export default { cards, sets, getRandomCard, getBoosterNbOfCards, getCardsOfSet }