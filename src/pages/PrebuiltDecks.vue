<template>
  <div class="decks-list">
    <div class="deck-box" v-for="deck in getPrebuiltDecks" :key="deck.name">
      <span>{{deck.name}}</span>
      <div class="card-image" :style="{'width': `10vw`, 'height': `${10*1.45}vw`}">
        <CardSmall :card="getBestCard(deck.deck)"/>
      </div>
    </div>
  </div>
  
</template>

<script>
import CardSmall from '@/components/CardSmall.vue';
import {prebuiltDecks, getCardById} from '@/API/database';
import "vue-search-select/dist/VueSearchSelect.css"

export default {
  name: 'PrebuiltDecks',
  components: {CardSmall},
  props: {
  },
  computed: {
    getPrebuiltDecks() {
      return prebuiltDecks;
    }
  },
  methods: {
    getBestCard(deck) {
      return deck
      .map(card=>getCardById(card.id))
      .sort((a, b) => b.card_prices[0].cardmarket_price-a.card_prices[0].cardmarket_price)[1]
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.decks-list {
  display: grid;
  grid-template-columns: repeat(8, 11vw);
  column-gap: 4rem;
}
.deck-box {
  border: 1px solid black;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
</style>
