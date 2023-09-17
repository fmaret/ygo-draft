<template>
  <div class="main-menu">
    <button @click="goTo('/booster')">
      Ouvrir un booster
    </button>
    <button @click="goTo('/cards')">
      Cartes
    </button>
    <button @click="goTo('/deck-editor')">
      Deck editor
    </button>
    <button @click="goTo('/draft')">
      Draft
    </button>
    <input type="file" @change="importLocalStorage" />
    <button @click="exportLocalStorage()">
      Export
    </button>
    <button @click="goTo('/test')">
      Test
    </button>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  props: {
  },
  data: () => ({
    localStorageJson: null,
  }),
  methods: {
    goTo(route){
      this.$router.push(route)
    },
    importLocalStorage(event) {
      const file = event.target.files[0];
      const lecteur = new FileReader();
      lecteur.onload = (event) => {
        this.localStorageJson = JSON.parse(event.target.result);
      };
      lecteur.readAsText(file);
      setTimeout(()=>{
        localStorage.ExtraDeck = JSON.stringify(this.localStorageJson.extraDeck);
        localStorage.deck = JSON.stringify(this.localStorageJson.deck);
        localStorage.cards = JSON.stringify(this.localStorageJson.cards);
      }, 1000)
      
      
    },
    exportLocalStorage() {
      const extraDeck = localStorage.ExtraDeck;
      const cards = localStorage.cards;
      const deck = localStorage.deck;
      const localStorageJson = {extraDeck: JSON.parse(extraDeck), cards: JSON.parse(cards), deck: JSON.parse(deck)};
      const blob = new Blob([JSON.stringify(localStorageJson)], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "ygo-draft-export.ydk";
      a.click();
      URL.revokeObjectURL(url);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.main-menu {
  display: flex;
  flex-direction: column;
  align-items: center;
}

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
</style>
