<template>
  <div class="draft-page">
    <MultiSelect
        :options="selectSetOptions"
        :selected-options="selectedSets"
        placeholder="Sélectionnez les boosters..."
        @select="onSelect"
      />
    <button @click="startChoice">Commencer</button>
    <button @click="startRandom">Commencer Random</button>
    <CardChoice :width="40" v-if="start" class="card-choice" :sets="selectedSets" @deckUpdated="updateDeck"/>
    <DeckPreview :deck="deck" class="deck-preview" />
  </div>
</template>

<script>
import CardChoice from '@/components/CardChoice';
import DeckPreview from '@/components/DeckPreview';
import {MultiSelect} from 'vue-search-select';
import {sets} from './../API/database';
import "vue-search-select/dist/VueSearchSelect.css"

export default {
  name: 'DraftPage',
  components: {CardChoice, MultiSelect, DeckPreview},
  props: {
  },
  computed: {
    selectSetOptions(){
      const compareFn = (a, b) => (a.tcg_date < b.tcg_date ? -1 : 0);
      return sets
      .sort(compareFn)
      .filter((set)=>set.num_of_cards >= 100)
      .map((set)=>({
        value: set.set_code,
        text: set.set_name
      }))
    },
  },
  methods: {
    updateDeck (deck) {
      this.deck = deck;
      if (this.deck.length == 5) this.generateYDK(); //TODO : fix deck length -> count can be more than 1 + extra deck is currently in deck
    },
    onSelect (items) {
      this.selectedSets = items
    },
    startChoice() {
      this.start = true;
    },
    generateYDK() {
      // if (this.deck.length < 40) {
      //   return alert("Il vous faut au moins 40 cartes !");
      // }
      // if (this.deck.length > 60) {
      //   return alert("Il vous faut au plus 60 cartes !");
      // }
      const deckData = this.deck;
      const contenuYDK = `#created by Steven et Florent\n#main\n${deckData
        .map((card) => `${card.id}`)
        .join("\n")}\n!side`;
      const blob = new Blob([contenuYDK], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "deck.ydk";
      a.click();
      URL.revokeObjectURL(url);
    },
  },
  data: () => ({
    selectedSets: [],
    start: false,
    deck: [],
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.draft-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.deck-preview {
  position: absolute;
  z-index: 1;
  width: 20%;
  left: 0;
  top: 100px;
  background-color: black;
  height: 100vh;
}
</style>





<style>
.draft-page > .card-choice {
  width: 40%;
}
</style>