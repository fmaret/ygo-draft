<template>
  <div class="container">
    <div class="description-panel">
      <div v-if="selectedCard">
        <CardViewer v-if="selectedCard" :card="selectedCard" />
      </div>
    </div>
    <div class="image-grid">
      <div class="image" v-for="card in listcards" :key="card.id">
        <img
          :src="card.card_images[0].image_url"
          alt="Image"
          @click="showDescription(card)"
        />
      </div>
    </div>
  </div>
</template>

<script>
import { getAllCards } from "@/API/database";
import CardViewer from "@/components/CardViewer";
export default {
  components: {
    CardViewer,
  },
  data() {
    return {
      listcards: [],
      selectedCard: null,
    };
  },

  mounted() {
    this.listcards = getAllCards();
  },

  methods: {
    showDescription(card) {
      this.selectedCard = card;
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
