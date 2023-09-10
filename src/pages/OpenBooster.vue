<template>
  <div>
    <ModelSelect
        v-model="selectedSet"
        :options="selectSetOptions"
        placeholder="Sélectionnez une option"
      />
    <div>
     <span>Nombre de boosters à ouvrir</span>
     <ModelSelect
        v-model="boostersToOpen"
        :options="selectBoostersToOpen"
        placeholder="Sélectionnez une option"
      />
    </div>
    <button v-if="selectedSet != null && boostersToOpen != null" @click="openBooster">Commencer</button>
    <button v-if="false">Suivant</button>
    <div class="booster-display">
      <template v-for="(boosterCard, index) in boosterCards" :key="index">
        <CardSmall :card="boosterCard"/>
      </template>
    </div>
  </div>
</template>

<script>
import {sets, getCardsOfSet, getRandomCardInList} from './../API/database';
import "vue-search-select/dist/VueSearchSelect.css"
import { ModelSelect } from 'vue-search-select'
import CardSmall from './../components/CardSmall.vue';
export default {
  name: 'OpenBooster',
  components: {ModelSelect, CardSmall},
  props: {
  },
  methods: {
    openBooster(){
      this.started = true;
      this.boosterCards = Array(9).fill(null);
      const interval = setInterval(() => {
        const cardsOfSet = getCardsOfSet(this.selectedSet);
        let index = this.boosterCards.findIndex((element) => !element);
        let rarity = index == 4 ? "Rare" : "Common";
        const card = getRandomCardInList(cardsOfSet, rarity);
        this.boosterCards[index] = card; 
        console.log("aze", this.boosterCards.findIndex((element) => !element))
        if (this.boosterCards.findIndex((element) => !element) == -1) {
          clearInterval(interval);
          this.started = false;
        }
      }, 10);
    }
  },
  computed: {
    selectSetOptions(){
      return sets.map((set)=>({
        value: set.set_code,
        text: set.set_name
      }))
    },
    selectBoostersToOpen(){
      let list = [];
      for (let i=1; i<=100; i++) {
        list.push(i);
      } 
      return list.map((i) => ({
        value: i,
        text: i.toString(),
      }));
    }
  },
  data: () => ({
    selectedSet: null,
    boostersToOpen: null,
    started: false,
    boosterCards: Array(9).fill(null),
    boostersContent: [],
  })
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
button {
  background-color: #166818; /* Green */
  border: 1px solid black;
  margin: 1rem;
  width: 20rem;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
}

button:hover{
  cursor: pointer;
}

.booster-display{
  display: flex;
}

.booster-display > * {
  width: 10%;
}
</style>
