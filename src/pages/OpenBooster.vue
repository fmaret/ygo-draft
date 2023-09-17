<template>
  <div class="open-booster-window">
    <ModelSelect
        v-model="selectedSet"
        :options="selectSetOptions"
        placeholder="Sélectionnez un booster"
        v-if="!started && !endscreen"
      />
     <ModelSelect
        v-model="boostersToOpen"
        :options="selectBoostersToOpen"
        placeholder="Nombre de boosters à ouvrir"
        v-if="!started && !endscreen"
      />
    <button v-if="selectedSet != null && boostersToOpen != null && !started && !endscreen" @click="openBooster">Commencer</button>
    <div class="booster-display" v-if="started">
      <template v-for="(boosterCard, index) in boosterCards" :key="index">
        <div :style="{'width': `10vw`, 'height': `${10*88/61}vw`}">
          <CardSmall :card="boosterCard"/>
        </div>
      </template>
    </div>
    <button v-if="!boosterOpening && started" @click="openBooster">Suivant</button>
    <button v-if="!started" @click="clearLocalStorage">Clear Local Storage</button>
  </div>
</template>

<script>
import {sets, getCardsOfSet, getRandomCardInList, setsNames} from './../API/database';
import "vue-search-select/dist/VueSearchSelect.css"
import { ModelSelect } from 'vue-search-select'
import CardSmall from './../components/CardSmall.vue';
export default {
  name: 'OpenBooster',
  components: {ModelSelect, CardSmall},
  props: {
  },
  created() {
    this.initLocalStorage();
  },
  methods: {
    clearLocalStorage() {
      localStorage.clear();
    },
    addBoosterCardsInBoostersContent() {
      const formattedBoosterCards = this.boosterCards.map((card) => {
        return {
        name: card.name,
        id: card.id,
        count:
          {
            [card.chosenSet.set_rarity]: 1,
          }
      }
      })
      formattedBoosterCards.forEach((card)=>{
        const cardRarity = Object.keys(card.count)[0];
        const cardIndex = this.boostersContent.findIndex((c)=>{
          return card.id == c.id && Object.keys(c.count).includes(cardRarity);
        })
        if (cardIndex != -1) {
          this.boostersContent[cardIndex].count[cardRarity] += 1;
        } else {
          this.boostersContent.push(card);
        }
    })
    },
    initLocalStorage() {
      try {
          if (typeof JSON.parse(localStorage.cards) != typeof []) localStorage.cards = '[]';
        } catch {
          localStorage.cards = '[]';
        }
    },
    openBooster(){
      if (this.boostersCount == this.boostersToOpen) {
        this.started = false;
        this.endscreen = true;
        this.initLocalStorage();
        localStorage.cards = JSON.stringify([...(localStorage.cards ? JSON.parse(localStorage.cards) : []) ,...this.boostersContent]);
        return;
      }
      this.started = true;
      this.boosterOpening = true;
      this.boosterCards = Array(9).fill(null);
      const interval = setInterval(() => {
        const cardsOfSet = getCardsOfSet(this.selectedSet);
        let index = this.boosterCards.findIndex((element) => !element);
        let rarity = index == 4 ? "Rare" : "Common";
        const card = getRandomCardInList(cardsOfSet, rarity, index == 5);
        this.boosterCards[index] = card;
        if (this.boosterCards.findIndex((element) => !element) == -1) {
          clearInterval(interval);
          this.boosterOpening = false;
          this.addBoosterCardsInBoostersContent();
          this.boostersCount++;
        }
      }, 50);
    }
  },
  computed: {
    selectSetOptions(){
      console.log(sets)
      return sets
      .filter((set)=>Object.keys(setsNames).includes(set.set_code))
      .sort((a, b) => a.tcg_date.slice(0, 4) - b.tcg_date.slice(0, 4))
      .map((set)=>({
        value: set.set_code,
        text: setsNames[set.set_code]
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
    boosterOpening: false,
    boostersCount: 0,
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
  justify-content: center;
}

.booster-display > * {
  /* width: 10%; */
}

.open-booster-window {
  width: 96vw;
  height: 80vh;
}

.open-booster-window > * {
  margin: 1rem 1rem;
}

</style>
