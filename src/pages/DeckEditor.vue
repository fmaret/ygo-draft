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
            <div class="image" v-for="card in deckCards" :key="card.id">
              <CardSmall
                @mouseenter="showDescription(card)"
                @click.left="addCard(card)"
                @contextmenu.prevent="removeCard(card)"
                :card="card"
              />
            </div>
          </div>
        </div>
        <div class="second-row">
          <div class="image-grid">
            <div class="image" v-for="card in extraDeckCards" :key="card.id">
              <CardSmall
                @mouseenter="showDescription(card)"
                @click.left="addCard(card)"
                @contextmenu.prevent="removeCard(card)"
                :card="card"
              />
            </div>
          </div>
        </div>
        <div class="third-row">
          <div class="image-grid">
            <div class="image" v-for="card in sideDeckCards" :key="card.id">
              <CardSmall
                @mouseenter="showDescription(card)"
                @click.left="addCard(card)"
                @contextmenu.prevent="removeCard(card)"
                :card="card"
              />
            </div>
          </div>
        </div>
      </div>
      <div class="right-column image-list">
        <div class="image-grid-2">
          <div class="image" v-for="card in listcards" :key="card.id">
            <CardSmall
              @mouseenter="showDescription(card)"
              @click.left="addCard(card)"
              @contextmenu.prevent="removeCard(card)"
              :card="card"
            />
          </div>
        </div>
      </div>
    </div>
    <button @click="genererYDK">Générer et Télécharger le .ydk</button>
  </div>
</template>

<script>
import { getCardById } from "@/API/database";
import CardViewer from "@/components/CardViewer";
import CardSmall from "@/components/CardSmall";
export default {
  components: {
    CardViewer,
    CardSmall,
  },
  data() {
    return {
      listcards: [],
      deckCards: [], //Between 40-60 cards
      extraDeckCards: [], //Between 0-15 cards (XYZ, Synchro, Fusion)
      sideDeckCards: [], //Between 0-15 cards (To change cards in your Deck after the match)
      selectedCard: null,

      typeExtraDeck: ["xyz", "fusion", "link", "synchro"], //frametype extra deck card
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
    }
  },

  methods: {
    showDescription(card) {
      this.selectedCard = card;
    },

    addCard(cardSelected) {
      const selectedCardCount = this.deckCards.filter(
        (card) => card.id === cardSelected.id
      ).length;

      if (selectedCardCount >= 3) {
        return alert("Pas plus de 3 exemplaires par cartes");
      }

      if (this.typeExtraDeck.includes(cardSelected.frameType)) {
        this.extraDeckCards.push({ ...cardSelected });
        localStorage.setItem("ExtraDeck", JSON.stringify(this.extraDeckCards));
      } else {
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

    genererYDK() {
      if (this.deckCards.length < 40) {
        return alert("Il vous faut au moins 40 cartes !");
      }
      if (this.deckCards.length > 60) {
        return alert("Il vous faut au plus 60 cartes !");
      }
      const deckData = this.deckCards;
      const ExtraDeckData = this.extraDeckCards;
      const contenuYDK = `#created by Steven\n#main\n${deckData
        .map((card) => `${card.id}`)
        .join("\n")}\n#extra\n${ExtraDeckData.map((card) => `${card.id}`).join(
        "\n"
      )}\n!side`;
      const blob = new Blob([contenuYDK], { type: "text/plain" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = "deck.ydk";
      a.click();
      URL.revokeObjectURL(url);
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
  border-radius: 5px;
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
