<template>
  <div class="background">
    <div class="title-menu">
      <img :src="require('@/assets/title.png')" />
    </div>

    <div class="main-menu">
      <button v-if="!options" class="custom-button" @click="goTo('/booster')">
        Ouvrir un booster
      </button>
      <button v-if="!options" class="custom-button" @click="goTo('/cards')">
        Cartes
      </button>
      <button
        v-if="!options"
        class="custom-button"
        @click="goTo('/deck-editor')"
      >
        Deck editor
      </button>
      <button v-if="!options" class="custom-button" @click="goTo('/draft')">
        Draft
      </button>
      <input v-if="options" type="file" @change="importLocalStorage" />
      <button
        v-if="options"
        class="custom-button"
        @click="exportLocalStorage()"
      >
        Export
      </button>
      <button v-if="options" class="custom-button" @click="goTo('/test')">
        Test
      </button>
    </div>

    <div class="options-menu">
      <button class="options-button" @click="options = !options"></button>
    </div>
  </div>
</template>

<script>
export default {
  name: "MainPage",
  props: {},
  data: () => ({
    localStorageJson: null,
    menu: [{ route: "/booster", title: "OpenDeck" }],
    options: false,
  }),
  methods: {
    goTo(route) {
      this.$router.push(route);
    },
    importLocalStorage(event) {
      const file = event.target.files[0];
      const lecteur = new FileReader();
      lecteur.onload = (event) => {
        this.localStorageJson = JSON.parse(event.target.result);
      };
      lecteur.readAsText(file);
      setTimeout(() => {
        localStorage.ExtraDeck = JSON.stringify(
          this.localStorageJson.extraDeck
        );
        localStorage.deck = JSON.stringify(this.localStorageJson.deck);
        localStorage.cards = JSON.stringify(this.localStorageJson.cards);
      }, 1000);
    },
    exportLocalStorage() {
      const extraDeck = localStorage.ExtraDeck;
      const cards = localStorage.cards;
      const deck = localStorage.deck;
      const localStorageJson = {
        extraDeck: JSON.parse(extraDeck),
        cards: JSON.parse(cards),
        deck: JSON.parse(deck),
      };
      const blob = new Blob([JSON.stringify(localStorageJson)], {
        type: "text/plain",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ygo-draft-export.ydk";
      a.click();
      URL.revokeObjectURL(url);
    },
  },
};
</script>

<style scoped>
@font-face {
  font-family: "MatrixRegularSmallCaps1";
  src: url("../../public/fonts/MatrixRegularSmallCaps1.ttf");
}
.background {
  background: url("@/assets/background.jpg") no-repeat center center fixed;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
  width: 99vw;
  height: 97.5vh;
}

.title-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.main-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
}

.options-menu {
  display: flex;
  flex-direction: column;
  align-items: end;
  justify-content: end;
}

.custom-button {
  background: url("@/assets/Button_Normal.png") no-repeat center center;
  background-size: contain;
  color: white;
  padding: 20px;
  border: none;
  cursor: pointer;
  text-align: center;
  font-size: 22px;
  font-family: "MatrixRegularSmallCaps1";
  width: 18rem;
  margin: 2px;
}

.options-button {
  background: url("@/assets/Button_Normal_mini.png") no-repeat center center;
  background-size: contain;
  color: white;
  padding: 20px;
  border: none;
  cursor: pointer;
  width: 18rem;
  margin: 2px;
}

.custom-button:hover {
  background-image: url("@/assets/Button_Hover.png");
  cursor: pointer;
}
</style>
