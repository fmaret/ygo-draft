<template>
  <div class="container">
    <div class="description-panel">
      <div v-if="selectedCard">
        <CardViewer v-if="selectedCard" :card="selectedCard" />
        <button @click="addCard">Ajouter</button>
        <button @click="removeCard">Retirer</button>
      </div>
    </div>
    <div class="image-grid">
      <div class="image" v-for="card in deckCards" :key="card.id">
        <img
          :src="card.card_images[0].image_url"
          alt="Image"
          @click="showDescription(card)"
        />
      </div>
    </div>
    <div class="image-container">
      <div class="card-select" v-for="card in listcards" :key="card.id">
        <CardSmall @click="showDescription(card)" :card="card" />
      </div>
    </div>
    <button @click="genererYDK">Générer et Télécharger le .ydk</button>
  </div>
</template>

<script>
import { getCardById } from "@/API/database";
import CardViewer from "@/components/CardViewer";
import CardSmall from "@/components/CardSmall";
export default {
  components: {
    CardViewer,
    CardSmall,
  },
  data() {
    return {
      listcards: [],
      deckCards: [], //Between 40-60 cards (Max 3exemplaires)
      extraDeckCards: [], //Between 0-15 cards (XYZ, Synchro, Fusion)
      sideDeckCards: [], //Between 0-15 cards (To change cards in your Deck after the match)
      selectedCard: null,
    };
  },

  mounted() {
    //Load deck in localstorage
    const deckJson = localStorage.getItem("deck");
    if (deckJson) {
      this.deckCards = JSON.parse(deckJson);
    }

    //Load cards draw in localstorage
    const cardsJson = localStorage.getItem("cards");
    if (cardsJson) {
      JSON.parse(cardsJson).forEach((card) =>
        this.listcards.push(getCardById(card.id))
      );
    }
  },

  methods: {
    showDescription(card) {
      this.selectedCard = card;
    },

    addCard() {
      const selectedCardCount = this.deckCards.filter(
        (card) => card.id === this.selectedCard.id
      ).length;

      if (selectedCardCount >= 3) {
        return alert("Pas plus de 3 exemplaires par cartes");
      }

      this.deckCards.push({ ...this.selectedCard });
      localStorage.setItem("deck", JSON.stringify(this.deckCards));
    },

    removeCard() {
      const index = this.deckCards.findIndex(
        (card) => card.id === this.selectedCard.id
      );
      if (index !== -1) {
        this.deckCards.splice(index, 1);
        localStorage.setItem("deck", JSON.stringify(this.deckCards));
      }
    },

    genererYDK() {
      if (this.deckCards.length < 40) {
        return alert("Il vous faut au moins 40 cartes !");
      }
      if (this.deckCards.length > 60) {
        return alert("Il vous faut au plus 60 cartes !");
      }
      const deckData = this.deckCards;
      const contenuYDK = `#created by Steven\n#main\n${deckData
        .map((card) => `${card.id}`)
        .join("\n")}\n#extra\n!side`;
      const blob = new Blob([contenuYDK], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "deck.ydk";
      a.click();
      URL.revokeObjectURL(url);
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: row;
}

.description-panel {
  flex: 1;
  padding: 20px;
  background-color: #a3a3a3;
  border-right: 1px solid #000000;
  display: flex;
  flex-direction: column;
}

.image-grid {
  flex: 2;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  padding: 20px;
}

.image {
  position: relative;
  cursor: pointer;
  overflow: hidden;
  border-radius: 5px;
}

.image img {
  width: 100%;
  height: auto;
  transition: transform 0.2s ease-in-out;
}

.image img:hover {
  box-shadow: 0 0 50px rgba(0, 0, 0, 1);
  transition: box-shadow 0.2s ease-in-out;
}
.image-container {
  flex: 1;
  max-height: 85vh;
  overflow-y: auto;
  padding: 20px;
}

.card-select > * {
  width: 25%;
}

select {
  width: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  outline: none;
}
</style>
