<template>
  <div>
    <div class="container">
      <div class="left-column">
        <div v-if="selectedCard">
          <CardViewer v-if="selectedCard" :card="selectedCard" />
        </div>
      </div>
      <div class="middle-column">
        <div class="first-row">
          <div class="image-grid">
            <div
              class="image"
              v-for="card in deckCards"
              :key="card.id"
              :style="{ width: `4vw`, height: `${4 * 1.45}vw` }"
            >
              <CardSmall
                @mouseenter="showDescription(card)"
                @contextmenu.prevent="removeCard(card)"
                :card="card"
              />
            </div>
          </div>
        </div>
        <div class="second-row">
          <div class="image-grid">
            <div
              class="image"
              v-for="card in extraDeckCards"
              :key="card.id"
              :style="{ width: `4vw`, height: `${4 * 1.45}vw` }"
            >
              <CardSmall
                @mouseenter="showDescription(card)"
                @contextmenu.prevent="removeCard(card)"
                :card="card"
              />
            </div>
          </div>
        </div>
        <div class="third-row">
          <div class="image-grid">
            <div
              class="image"
              v-for="card in sideDeckCards"
              :key="card.id"
              :style="{ width: `4vw`, height: `${4 * 1.45}vw` }"
            >
              <CardSmall
                @mouseenter="showDescription(card)"
                @contextmenu.prevent="removeCard(card)"
                :card="card"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="right-column image-list">
        <div class="filter-bar">
          <input
            type="text"
            v-model="nameFilter"
            placeholder="Filtrer par nom"
          />
          <select v-model="frameTypeFilter">
            <option value="">Tous les types de cadre</option>
            <option
              v-for="(label, type) in typeFrame"
              :key="type"
              :value="type"
            >
              {{ label }}
            </option>
          </select>
        </div>
        <div class="image-grid-2">
          <div
            class="image"
            v-for="card in filteredCards"
            :key="card.id"
            :style="{ width: `10vw`, height: `${10 * 1.45}vw` }"
          >
            <CardSmall
              @mouseenter="showDescription(card)"
              @click.left="addCard(card)"
              :card="card"
              :count="getNumberOfCardById(card.id)"
            />
          </div>
        </div>
      </div>
    </div>
    <button @click="downloadYDK">Télécharger YDK</button>
    <button @click="copyToClipboardYDK">Presse-papier YDK</button>
    <button
      @click="
        this.drawCards();
        showDraw = true;
      "
    >
      Voir main
    </button>
    <DrawPreview :cards="draw" v-if="showDraw" @close="showDraw = false" />
  </div>
</template>

<script>
import { getCardById, typeFrame } from "@/API/database";
import CardViewer from "@/components/CardViewer";
import CardSmall from "@/components/CardSmall";
import DrawPreview from "@/components/DrawPreview.vue";

export default {
  components: {
    CardViewer,
    CardSmall,
    DrawPreview,
  },
  data() {
    return {
      listcards: [],
      deckCards: [], //Between 40-60 cards
      extraDeckCards: [], //Between 0-15 cards (XYZ, Synchro, Fusion)
      sideDeckCards: [], //Between 0-15 cards (To change cards in your Deck after the match)
      selectedCard: null,

      nameFilter: "",
      frameTypeFilter: "",

      typeExtraDeck: ["xyz", "fusion", "link", "synchro"], //frametype extra deck card

      typeOrder: [
        "normal",
        "effect",
        "ritual",
        "fusion",
        "synchro",
        "xyz",
        "link",
        "normal_pendulum",
        "effect_pendulum",
        "ritual_pendulum",
        "fusion_pendulum",
        "synchro_pendulum",
        "xyz_pendulum",
        "spell",
        "trap",
        "token",
        "skill",
      ],

      typeFrame: typeFrame,

      showDraw: false,
      draw: [],
    };
  },

  mounted() {
    //Load deck in localstorage
    const deckJson = localStorage.getItem("deck");
    if (deckJson) {
      this.deckCards = JSON.parse(deckJson);
    }

    const extraDeckJson = localStorage.getItem("ExtraDeck");
    if (extraDeckJson) {
      this.extraDeckCards = JSON.parse(extraDeckJson);
    }

    //Load cards draw in localstorage
    const cardsJson = localStorage.getItem("cards");
    if (cardsJson) {
      JSON.parse(cardsJson).forEach((card) =>
        this.listcards.push(getCardById(card.id))
      );
      this.listcards = this.listcards.sort(this.customCardSort);
    }
  },

  methods: {
    drawCards() {
      this.draw = [];
      let deck = [...this.deckCards];
      for (let i = 0; i < 5; i++) {
        const index = Math.floor(Math.random() * deck.length);
        const carteTiree = deck.splice(index, 1)[0];
        this.draw.push(carteTiree);
      }
    },

    getNumberOfCardById(id) {
      const cardsJson = JSON.parse(
        localStorage.getItem("cards") ? localStorage.getItem("cards") : []
      );
      const card = cardsJson.find((card) => card.id == id);
      if (!card.count) return 0;
      return Object.keys(card.count).reduce((a, b) => a + card.count[b], 0);
    },

    showDescription(card) {
      this.selectedCard = card;
    },

    addCard(cardSelected) {
      if (this.typeExtraDeck.includes(cardSelected.frameType)) {
        const selectedCardCountExtra = this.extraDeckCards.filter(
          (card) => card.id === cardSelected.id
        ).length;
        if (this.getNumberOfCardById(cardSelected.id) <= selectedCardCountExtra)
          return;
        if (selectedCardCountExtra >= 3) {
          return alert("Pas plus de 3 exemplaires par cartes");
        }
        this.extraDeckCards.push({ ...cardSelected });
        localStorage.setItem("ExtraDeck", JSON.stringify(this.extraDeckCards));
      } else {
        const selectedCardCount = this.deckCards.filter(
          (card) => card.id === cardSelected.id
        ).length;

        if (this.getNumberOfCardById(cardSelected.id) <= selectedCardCount)
          return;
        if (selectedCardCount >= 3) {
          return alert("Pas plus de 3 exemplaires par cartes");
        }
        this.deckCards.push({ ...cardSelected });
        localStorage.setItem("deck", JSON.stringify(this.deckCards));
      }
    },

    removeCard(cardSelected) {
      if (this.typeExtraDeck.includes(cardSelected.frameType)) {
        const index = this.extraDeckCards.findIndex(
          (card) => card.id === cardSelected.id
        );
        if (index !== -1) {
          this.extraDeckCards.splice(index, 1);
          localStorage.setItem(
            "ExtraDeck",
            JSON.stringify(this.extraDeckCards)
          );
        }
      } else {
        const index = this.deckCards.findIndex(
          (card) => card.id === cardSelected.id
        );
        if (index !== -1) {
          this.deckCards.splice(index, 1);
          localStorage.setItem("deck", JSON.stringify(this.deckCards));
        }
      }
    },

    downloadYDK() {
      if (this.deckCards.length < 40) {
        return alert("Il vous faut au moins 40 cartes !");
      }
      if (this.deckCards.length > 60) {
        return alert("Il vous faut au plus 60 cartes !");
      }
      const contenuYDK = this.generateYDK();
      const blob = new Blob([contenuYDK], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "deck.ydk";
      a.click();
      URL.revokeObjectURL(url);
    },

    copyToClipboardYDK() {
      if (this.deckCards.length < 40) {
        return alert("Il vous faut au moins 40 cartes !");
      }
      if (this.deckCards.length > 60) {
        return alert("Il vous faut au plus 60 cartes !");
      }
      navigator.clipboard.writeText(this.generateYDK());
    },

    generateYDK() {
      const deckData = this.deckCards;
      const ExtraDeckData = this.extraDeckCards;
      const mainDeckString = deckData.map((card) => `${card.id}`).join("\n");
      const extraDeckString = ExtraDeckData
        ? ExtraDeckData.map((card) => `${card.id}`).join("\n")
        : "";
      return `#created by Steven et Florent\n#main\n${mainDeckString}\n#extra\n${extraDeckString}\n!side`;
    },

    customCardSort(a, b) {
      const typeA = a.frameType.toLowerCase();
      const typeB = b.frameType.toLowerCase();

      if (this.typeOrder.indexOf(typeA) === -1) {
        return 1;
      }
      if (this.typeOrder.indexOf(typeB) === -1) {
        return -1;
      }

      return this.typeOrder.indexOf(typeA) - this.typeOrder.indexOf(typeB);
    },
  },

  computed: {
    filteredCards() {
      return this.listcards.filter((card) => {
        const nameMatch = card.name
          .toLowerCase()
          .includes(this.nameFilter.toLowerCase());
        const frameTypeMatch =
          this.frameTypeFilter === "" ||
          card.frameType === this.frameTypeFilter;
        return nameMatch && frameTypeMatch;
      });
    },
  },
};
</script>

<style scoped>
.container {
  display: flex;
}

.left-column,
.right-column {
  flex: 1;
  background-color: #f0f0f0; /* Couleur de fond des colonnes de gauche et de droite */
}

.middle-column {
  flex: 2;
  background-color: #e0e0e0; /* Couleur de fond de la colonne du milieu */
}

.first-row {
  flex: 2; /* La première ligne de la colonne du milieu est plus grande */
  background-color: #c0c0c0; /* Couleur de fond de la première ligne */
}

.second-row,
.third-row {
  flex: 1; /* Les lignes 2 et 3 de la colonne du milieu ont la même taille */
  background-color: #d0d0d0; /* Couleur de fond des lignes 2 et 3 */
}

.image-grid {
  flex: 2;
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  gap: 10px;
  padding: 20px;
}

.image {
  position: relative;
  cursor: pointer;
  overflow: hidden;
}

.image img {
  width: 100%;
  height: auto;
  transition: transform 0.2s ease-in-out;
}

.image-list {
  padding: 0;
  margin: 0;
  overflow-y: auto;
  max-height: 92vh;
}

.image-grid-2 {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  padding: 20px;
}
</style>
