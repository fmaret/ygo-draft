<template>
  <div class="background">
    <div class="open-booster-window" v-if="started">
      <div class="booster-display">
        <template v-for="(boosterCard, index) in boosterCards" :key="index">
          <div :style="{ width: `9vw`, height: `${9 * 1.45}vw` }">
            <CardSmall
              :card="boosterCard"
              @mouseover="previewCard(boosterCard)"
              @mouseleave="previewCard(null)"
            />
          </div>
        </template>
      </div>
    </div>
    <div v-if="!started" class="box-list">
      <input
        v-model="searchTerm"
        class="searchTerm"
        placeholder="Nom du booster..."
      />
      <div class="scrollable-list">
        <div
          v-for="item in selectSetOptions"
          :key="item.value"
          @click="selectItem(item)"
          :class="{ selected: item.value === selectedSet }"
        >
          {{ item.text }}
        </div>
      </div>
      <div class="buttons-controller">
        <button @click="boostersToOpen = 4">04</button>
        <button @click="boostersToOpen = 8">08</button>
        <button @click="boostersToOpen = 12">12</button>
        <button @click="boostersToOpen = 24">24</button>
        <ModelSelect
          v-model="boostersToOpen"
          :options="selectBoostersToOpen"
          placeholder="Nombre de boosters à ouvrir"
          v-if="!started"
        />
      </div>
    </div>
    <button
      v-if="selectedSet != null && boostersToOpen != null && !started"
      @click="openBooster"
      class="custom-button padding-button"
    >
      Commencer
    </button>
    <button
      class="custom-button padding-button"
      v-if="!boosterOpening && started"
      @click="openBooster"
    >
      Suivant
    </button>
    <div
      v-if="previewedCard"
      class="preview-card"
      :style="{ width: `20vw`, height: `${20 * 1.45}vw` }"
    >
      <CardSmall :card="previewedCard" />
    </div>
  </div>
</template>

<script>
import {
  getAllSets,
  getCardsOfSet,
  getRandomCardInList,
  setsNames,
} from "./../API/database";
import "vue-search-select/dist/VueSearchSelect.css";
import { ModelSelect } from "vue-search-select";
import CardSmall from "./../components/CardSmall.vue";
export default {
  name: "OpenBooster",
  components: { ModelSelect, CardSmall },
  data: () => ({
    selectedSet: null,
    boostersToOpen: null,
    started: false,
    boosterCards: Array(9).fill(null),
    boostersContent: [],
    boosterOpening: false,
    boostersCount: 0,
    previewedCard: null,
    searchTerm: "",
  }),
  created() {
    this.initLocalStorage();
  },
  methods: {
    selectItem(item) {
      this.selectedSet = item.value;
    },
    previewCard(card) {
      this.previewedCard = card;
    },
    addBoosterCardsInBoostersContent() {
      const formattedBoosterCards = this.boosterCards.map((card) => {
        return {
          name: card.name,
          id: card.id,
          count: {
            [card.chosenSet.set_rarity]: 1,
          },
        };
      });
      formattedBoosterCards.forEach((card) => {
        const cardRarity = Object.keys(card.count)[0];
        const cardIndex = this.boostersContent.findIndex((c) => {
          return card.id == c.id && Object.keys(c.count).includes(cardRarity);
        });
        if (cardIndex != -1) {
          this.boostersContent[cardIndex].count[cardRarity] += 1;
        } else {
          this.boostersContent.push(card);
        }
      });
    },
    initLocalStorage() {
      try {
        if (typeof JSON.parse(localStorage.cards) != typeof [])
          localStorage.cards = "[]";
      } catch {
        localStorage.cards = "[]";
      }
    },
    openBooster() {
      if (this.boostersCount == this.boostersToOpen) {
        this.started = false;
        this.endscreen = true;
        this.initLocalStorage();
        localStorage.cards = JSON.stringify([
          ...(localStorage.cards ? JSON.parse(localStorage.cards) : []),
          ...this.boostersContent,
        ]);
        return;
      }
      this.started = true;
      this.boosterOpening = true;
      this.boosterCards = Array(9).fill(null);
      const interval = setInterval(() => {
        const cardsOfSet = getCardsOfSet(this.selectedSet);
        let index = this.boosterCards.findIndex((element) => !element);
        let rarity = index == 4 ? "Rare" : "Common";
        const idsToExclude = this.boosterCards.map((card) => card?.id);
        const card = getRandomCardInList(
          cardsOfSet,
          rarity,
          index == 5,
          idsToExclude
        );
        this.boosterCards[index] = card;
        if (this.boosterCards.findIndex((element) => !element) == -1) {
          clearInterval(interval);
          this.boosterOpening = false;
          this.addBoosterCardsInBoostersContent();
          this.boostersCount++;
        }
      }, 500);
    },
  },
  computed: {
    selectSetOptions() {
      return getAllSets()
        .filter((set) => {
          if (setsNames[set.set_code]) {
            const setName = setsNames[set.set_code]
              .toLowerCase()
              .normalize("NFD")
              .replace(/[\u0300-\u036f]/g, "");
            return setName.includes(
              this.searchTerm
                .toLowerCase()
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
            );
          }
        })
        .sort((a, b) => a.tcg_date.slice(0, 4) - b.tcg_date.slice(0, 4))
        .map((set) => ({
          value: set.set_code,
          text: setsNames[set.set_code],
        }));
    },
    selectBoostersToOpen() {
      let list = [];
      for (let i = 1; i <= 100; i++) {
        list.push(i);
      }
      return list.map((i) => ({
        value: i,
        text: i.toString(),
      }));
    },
  },
};
</script>

<style scoped>
.background {
  background: url("@/assets/BGopenbooster.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 99vw;
  height: 97.5vh;
}

.buttons-controller {
  display: flex;
  align-items: center;
}

.selected {
  background-color: yellow;
}
.box-list {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.scrollable-list {
  max-height: 200px;
  max-width: 25%;
  overflow-y: auto;
  padding: 10px;
  background-color: azure;
}

.searchTerm {
  width: 25%;
  border: 3px solid #00b4cc;
  padding: 5px;
  height: 20px;
  border-radius: 5px 2px 2px 5px;
  color: #000000;
}

.booster-display {
  display: flex;
  justify-content: center;
}

.padding-button {
  padding: 3rem;
}

.open-booster-window {
  background: url("@/assets/backgroundCards.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  padding: 10px;
  margin-left: 2rem;
  margin-right: 2rem;
  border: 8mm ridge rgb(25, 4, 100);
  display: flex;
  justify-content: center;
  align-items: center;
}

.open-booster-window > * {
  margin: 1rem 1rem;
}
.preview-card {
  position: absolute;
  left: 38%;
  top: 30%;
}
</style>
