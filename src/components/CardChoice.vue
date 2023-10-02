<template>
  <div class="card-choice">
    <div class="single-card-choice" v-for="card in cards" :key="card" >
      <CardSmall class="card-small" :card="card" @click="selectCard(card)"/>
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
    width: {value: 100, required: false},
  },
  created() {
    this.generateChoice();
  },
  methods: {
    generateChoice() {
      let allCards = [];
      this.sets.forEach((set)=> {
        allCards = [...allCards, ...getCardsOfSet(set.value)];
      }) 
      this.cards = Array(3).fill(null).map(()=> getRandomCardInList(allCards, "Rare"));
    },
    selectCard(card){
      if (card!=this.selectedCard) this.selectedCard = card;
      else return;
    },
    chooseCard(card){
      const index = this.deck.findIndex(c=>c.id == card.id);
      if (index == -1) this.deck.push({...card, count: 1});
      else this.deck[index].count += 1;
      this.$emit("deckUpdated", this.deck);
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