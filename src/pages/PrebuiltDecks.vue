<template>
  <div class="decks-list">
    <div class="deck-box" v-for="deck in getPrebuiltDecks" :key="deck.name">
      <span>{{deck.name}}</span>
      <div class="card-image" :style="{'width': `10vw`, 'height': `${10*1.45}vw`}">
        <CardSmall :card="getBestCard(deck.deck)"/>
      </div>
      <button @click="showDeckPreview(deck)">Voir le deck</button>
      <CustomModal v-if="showDeck" @close="showDeck = false">
        <DeckPreview class="deck-preview" :deck="shownDeck.deck" :extraDeck="shownDeck.extraDeck" />
      </CustomModal>
    </div>
  </div>
  
</template>

<script>
import CardSmall from '@/components/CardSmall.vue';
import CustomModal from '@/components/CustomModal.vue';
import DeckPreview from '@/components/DeckPreview.vue';
import {prebuiltDecks, getCardById} from '@/API/database';
import "vue-search-select/dist/VueSearchSelect.css"

export default {
  name: 'PrebuiltDecks',
  components: {CardSmall, CustomModal, DeckPreview},
  props: {
  },
  data: () => ({
    showDeck: false,
    shownDeck: null,
  }),
  computed: {
    getPrebuiltDecks() {
      const a = prebuiltDecks.map(d=>({
        name: d.name, 
        deck: d.deck.map(card=>{
          return {...getCardById(card.id), count: card.count}
        }),
        extraDeck: d.extraDeck?.map(card=>{
          return {...getCardById(card.id), count: card.count}
        }),
        }));
        return a
    }
  },
  methods: {
    showDeckPreview(deck) {
      this.showDeck = true;
      this.shownDeck = deck;
    },
    getBestCard(deck) {
      return deck
      .sort((a, b) => b.card_prices[0].cardmarket_price-a.card_prices[0].cardmarket_price)[0]
      
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.deck-preview {
  overflow-y: scroll;
  height: 80vh;
}
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
