<template>
  <div class="card-choice">
    <div class="single-card-choice" v-for="card in cards" :key="card" >
      <CardSmall :card="card" @click="selectCard(card)"/>
      <button @click="chooseCard(card)">Choisir</button>
    </div>
  </div>
  <div class="card-viewer" v-if="selectedCard">
    <CardViewer :card="selectedCard" />
  </div>
</template>


<script>
import {getCardsOfSet, getRandomCardInList} from "@/API/database";
import CardSmall from "@/components/CardSmall.vue";
import CardViewer from "@/components/CardViewer.vue";

export default {
  name: "CardChoice",
  components: {CardSmall, CardViewer},
  data: () => ({
    cards: [],
    selectedCard: null,
    deck: [],
  }),
  props: {
    sets: [],
  },
  created() {
    this.generateChoice();
  },
  methods: {
    generateChoice() {
      let allCards = [];
      this.sets.forEach((set)=> {
        console.log("aze", set.value)
        allCards = [...allCards, ...getCardsOfSet(set.value)];
      }) 
      console.log("all", allCards)
      this.cards = Array(3).fill(null).map(()=> getRandomCardInList(allCards, "Rare"));
    },
    selectCard(card){
      if (card!=this.selectedCard) this.selectedCard = card;
      else return;
    },
    chooseCard(card){
      this.deck.push(card);
      this.generateChoice();
    }
  }
};
</script>
  
<style scoped>
.card-choice {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}
.single-card-choice {

}
.card-viewer {
  position: absolute;
  z-index: 1;
  width: 20%;
  right: 0;
  background-color: black;
  height: 100vh;
}
</style>