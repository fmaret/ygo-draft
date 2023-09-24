export const cards = require("./database/dbCards.json");

export const sets = require("./database/dbSets.json");  
export const prebuiltDecks = require("./database/prebuiltDecks.json");

export const setsNames = {
  LOB: "La Légende du Dragon Blanc aux Yeux Bleus",
  MRD: "Métal Raiders",
  SRL: "Le Maitre des Magies",
  PGD: "Serviteur du Pharaon",
  LON: "Labyrinthe des Cauchemars",
  LOD: "La Crise des Ténèbres",
  IOC: "Invasion des Ténèbres",
  AST: "Sanctuaire Ancestral",
  SOD: "L'Âme du Duelliste",
  RDS: "Avènement du Destin",
  FET: "Eternité Brûlante",
  DR1: "Sombre Révélation Volume 1",
  TLM: "Le Millénaire Perdu",
  DB2: "Genèse Ténébreuse 2",
  CRV: "Révolution Cybernétique",
  DR2: "Sombre Révélation Volume 2",
  EEN: "Energie Elémentaire",
  SOI: "L'Ombre de l'Infini",
  EOJ: "Ennemi du Bien",
  POTD: "Puissance du Duelliste",
  CDIP: "L'Impact des Cyberténèbres",
  DR3: "Sombre Révélation Volume 3",
  STON: "L'Attaque de Néos",
  FOTB: "Force du Destructeur",
};

export const races = {
  Aqua: "Aqua",
  Beast: "Bête",
  "Beast-Warrior": "Bête-Guerrier",
  "Creator-God": "Dieu Créateur",
  Cyberse: "Cyberse",
  Dinosaur: "Dinosaure",
  "Divine-Beast": "Bête Divine",
  Dragon: "Dragon",
  Fairy: "Féerie",
  Fiend: "Démon",
  Fish: "Poisson",
  Insect: "Insecte",
  Machine: "Machine",
  Plant: "Plante",
  Psychic: "Psychique",
  Pyro: "Pyro",
  Reptile: "Reptile",
  Rock: "Rocher",
  "Sea Serpent": "Serpent de Mer",
  Spellcaster: "Magicien",
  Thunder: "Tonnerre",
  Warrior: "Guerrier",
  "Winged Beast": "Bête Ailée",
  Wyrm: "Wyrm",
  Zombie: "Zombie",
  Normal: "Normal",
  Field: "Terrain",
  Equip: "Équipement",
  Continuous: "Continu",
  "Quick-Play": "Jeu Rapide",
  Ritual: "Rituel",
  Counter: "Contre",
};

export const attributes = {
  DARK: "TÉNÈBRES",
  EARTH: "TERRE",
  FIRE: "FEU",
  LIGHT: "LUMIÈRE",
  WATER: "EAU",
  WIND: "VENT",
  DIVINE: "DIVIN",
};

export const types = {
  "Effect Monster": "Effet",
  "Flip Effect Monster": "Effet",
  "Flip Tuner Effect Monster": "Effet / Flip / Syntoniseur",
  "Gemini Monster": "Gemini",
  "Normal Monster": "Normal",
  "Normal Tuner Monster": "Normal / Syntoniseur",
  "Pendulum Effect Monster": "Pendule / Effet",
  "Pendulum Effect Ritual Monster": "Pendule / Effet / Rituel",
  "Pendulum Flip Effect Monster": "Pendule / Effet / Flip",
  "Pendulum Normal Monster": "Pendule / Normal",
  "Pendulum Tuner Effect Monster": "Pendule / Syntoniseur / Effet",
  "Ritual Effect Monster": "Rituel / Effet",
  "Ritual Monster": "Rituel",
  "Spell Card": "Magie",
  "Spirit Monster": "Esprit",
  "Toon Monster": "Toon",
  "Trap Card": "Piège",
  "Tuner Monster": "Syntoniseur",
  "Union Effect Monster": "Union / Effet",
  "Fusion Monster": "Fusion",
  "Link Monster": "Lien",
  "Pendulum Effect Fusion Monster": "Pendule / Effet / Fusion",
  "Synchro Monster": "Synchro",
  "Synchro Pendulum Effect Monster": "Synchro / Pendule / Effet",
  "Synchro Tuner Monster": "Synchro / Syntoniseur",
  "XYZ Monster": "XYZ",
  "XYZ Pendulum Effect Monster": "XYZ / Pendule / Effet",
  "Skill Card": "Compétence",
  Token: "Jeton",
};

export const typeFrame = {
  normal: "Normal",
  effect: "Effet",
  ritual: "Rituel",
  fusion: "Fusion",
  synchro: "Synchro",
  xyz: "XYZ",
  link: "Lien",
  normal_pendulum: " Normal Pendule",
  effect_pendulum: "Effet Pendule",
  ritual_pendulum: "Rituel Pendule",
  fusion_pendulum: "Fusion Pendule",
  synchro_pendulum: "Synchro Pendule",
  xyz_pendulum: "XYZ Pendule",
  spell: "Magie",
  trap: "Piège",
  token: "Jeton",
  skill: "Compétence",
};

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
      return card.card_sets?.some(
        (set) => set.set_code.split("-")[0] == setCode
      );
    })
    .map((card) => ({
      ...card,
      chosenSet: card.card_sets.find(
        (set) => set.set_code.split("-")[0] == setCode
      ),
    }));
}

export function getRandomCard() {
  const randomIndex = Math.floor(Math.random() * cards.length);
  console.log("a", cards[randomIndex]);
  return cards[randomIndex];
}

function pickRandomCardInListEquiprobe(cardsList, rarity, idsToExclude = []) {
  const cardsListByRarity = cardsList
    .filter((card) => card.chosenSet.set_rarity == rarity)
    .filter((card) => !idsToExclude.includes(card.id));
  const randomIndex = Math.floor(Math.random() * cardsListByRarity.length);
  return cardsListByRarity[randomIndex];
}

export function getRandomCardInList(
  cardsList,
  rarity,
  betterRarities = false,
  idsToExclude = []
) {
  // Probabilités de rarities
  const probCommune = 29 / 30;
  const probSecretRare = 1 / 23;
  const probUltraRare = 1 / 12;
  const probSuperRare = 1 / 4;
  const probCommune6th = 1 - (probSuperRare + probUltraRare + probSecretRare);

  const r = Math.random();

  function pickCommonCard() {
    if (r <= probCommune) {
      return pickRandomCardInListEquiprobe(cardsList, "Common", idsToExclude);
    } else {
      return pickRandomCardInListEquiprobe(
        cardsList,
        "Short Print",
        idsToExclude
      );
    }
  }

  if (!betterRarities) {
    if (rarity == "Common") return pickCommonCard();
    return pickRandomCardInListEquiprobe(cardsList, rarity, idsToExclude);
  }

  // betterRarities only works for common cards (for 6th card)

  console.log("seuil commune", probCommune6th)
  console.log("seuil super", probCommune6th + probSuperRare)
  console.log("seuil ultra", probCommune6th + probSuperRare + probUltraRare)
  console.log("r", r)
  if (r <= probCommune6th) {
    return pickCommonCard();
  } else if (r <= probCommune6th + probSuperRare) {
    return pickRandomCardInListEquiprobe(cardsList, "Super Rare", idsToExclude);
  } else if (r <= probCommune6th + probSuperRare + probUltraRare) {
    return pickRandomCardInListEquiprobe(cardsList, "Ultra Rare", idsToExclude);
  } else {
    return pickRandomCardInListEquiprobe(
      cardsList,
      "Secret Rare",
      idsToExclude
    );
  }
}

//SETS
export function getAllSets() {
  const setMap = new Map();
  sets.forEach((objet) => {
    const { set_code, num_of_cards } = objet;
    if (
      !setMap.has(set_code) ||
      num_of_cards < setMap.get(set_code).num_of_cards
    ) {
      setMap.set(set_code, objet);
    }
  });

  return Array.from(setMap.values());
}

export function getSetById(id) {
  return sets.find((set) => set.id === id);
}

//OTHERS
export function getBoosterNbOfCards() {
  return 9;
}
