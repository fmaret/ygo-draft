export const cards = require("./database/dbCards.json").data;
export const sets = require("./database/dbSets.json");

//CARDS
export function getAllCards() {
  return cards;
}

export function getCardById(id) {
  return cards.find((card) => card.id === id);
}

export function getCardsOfSet(setCode) {
  return cards
    .filter((card) => {
      return card.card_sets?.some((set) => set.set_code.includes(setCode));
    })
    .map((card) => ({
      ...card,
      chosenSet: card.card_sets.find((set) => set.set_code.includes(setCode)),
    }));
}

export function getRandomCard() {
  const randomIndex = Math.floor(Math.random() * cards.length);
  return cards[randomIndex];
}

function pickRandomCardInListEquiprobe(cardsList, rarity) {
  const cardsListByRarity = cardsList.filter(
    (card) => card.chosenSet.set_rarity == rarity
  );
  const randomIndex = Math.floor(Math.random() * cardsListByRarity.length);
  return cardsListByRarity[randomIndex];
}

export function getRandomCardInList(cardsList, rarity, betterRarities = false) {
  // Probabilités de rarities
  const probCommune = 29 / 30;
  const probSecretRare = 1 / 23;
  const probUltraRare = 1 / 12;
  const probSuperRare = 1 / 4;
  const probCommune6th = 1 - (probSuperRare + probUltraRare + probSecretRare);

  const r = Math.random();

  function pickCommonCard() {
    if (r <= probCommune) {
      return pickRandomCardInListEquiprobe(cardsList, "Common");
    } else {
      return pickRandomCardInListEquiprobe(cardsList, "Short Print");
    }
  }

  if (!betterRarities) {
    if (rarity == "Common") return pickCommonCard();
    return pickRandomCardInListEquiprobe(cardsList, rarity);
  } 

  // betterRarities only works for common cards (for 6th card)

  if (r <= probCommune6th) {
    return pickCommonCard();
  } else if (r <= probCommune6th + probSuperRare) {
    return pickRandomCardInListEquiprobe(cardsList, "Super Rare");
  } else if (r <= probCommune6th + probSuperRare + probUltraRare) {
    return pickRandomCardInListEquiprobe(cardsList, "Ultra Rare");
  } else {
    return pickRandomCardInListEquiprobe(cardsList, "Secret Rare");
  }
}

//SETS
export function getAllSets() {
  return sets;
}

export function getSetById(id) {
  return sets.find((set) => set.id === id);
}

//OTHERS
export function getBoosterNbOfCards() {
  return 9;
}
