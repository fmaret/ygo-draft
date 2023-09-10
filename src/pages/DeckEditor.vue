<template>
  <div class="container">
    <div class="description-panel">
      <CardViewer v-if="selectedCard" :card="selectedCard" />
      <button @click="addCard">Ajouter une carte</button>
    </div>
    <div class="image-grid">
      <!-- Affichez la grille d'images (10 colonnes) ici -->
      <div class="image" v-for="card in deckCards" :key="card.id">
        <img
          :src="card.card_images[0].image_url"
          alt="Image"
          @click="showDescription(card)"
        />
      </div>
    </div>
    <div class="image-container">
      <!-- Affichez la liste déroulante d'images ici -->
      <div class="card-select" v-for="card in listcards" :key="card.id">
        <CardSmall @click="showDescription(card)" :card="card" />
      </div>
    </div>
  </div>
</template>
  

<script>
import { get100Cards } from "@/API/database";
import CardViewer from "@/components/CardViewer";
import CardSmall from "@/components/CardSmall";
export default {
  components: {
    CardViewer,
    CardSmall,
  },
  data() {
    return {
      listcards: get100Cards(),
      deckCards: [],
      selectedCard: null,
    };
  },
  methods: {
    showDescription(card) {
      this.selectedCard = card;
    },
    addCard() {
      this.deckCards.push({ ...this.selectedCard });
      console.log(this.deckCards);
      console.log(this.listcards);
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

button {
  margin-top: auto;
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

.card-select > *{
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
