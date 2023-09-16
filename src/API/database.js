export const cards = require("./database/dbCards.json").data;
export const sets = require("./database/dbSets.json");


export const setsNames = {
  "LOB": "La Légende du Dragon Blanc aux Yeux Bleus",
  "MRD": "Métal Raiders",
  "SRL": "Le Maitre des Magies",
  "PGD": "Serviteur du Pharaon",
  "LON": "Labyrinthe des Cauchemars",
  "LOD": "La Crise des Ténèbres",
  "IOC": "Invasion des Ténèbres",
  "AST": "Sanctuaire Ancestral",
  "SOD": "L'Âme du Duelliste",
  "RDS": "Avènement du Destin",
  "FET": "Eternité Brûlante",
  "DR1": "Sombre Révélation Volume 1",
  "TLM": "Le Millénaire Perdu",
  "DB2": "Genèse Ténébreuse 2",
  "CRV": "Révolution Cybernétique",
  "DR2": "Sombre Révélation Volume 2",
  "EEN": "Energie Elémentaire",
  "SOI": "L'Ombre de l'Infini",
  "EOJ": "Ennemi du Bien",
  "POTD": "Puissance du Duelliste",
  "CDIP": "L'Impact des Cyberténèbres",
  "DR3": "Sombre Révélation Volume 3",
  "STON": "L'Attaque de Néos",
  "FOTB": "Force du Destructeur",
}


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
