<template>
  <div ref="cardBody" v-if="card" :class="getCardBodyClass(card)"
      >
    <span ref ="cardTitle" :class="getCardTitleClass(card)" :key="updateKey">{{card.name}}</span>
    <span class="card-stars">
      <img class="card-star" v-for="i in card.level" :key="i" src="../../public/img/ygo-star.png"/>
    </span>
    <img class="img-cropped" :src="card.card_images[0].image_url_cropped"/>
    <div ref ="cardDescription" class="card-description">
      <div class="card-description-inside">
        <span>
          <span>[{{ races[card.race] }}</span>
          <span v-if="types[card.type] != 'Normal'"> / {{ types[card.type] }}</span>
          <span>]</span>
        </span>
        <span :class="{'card-description-text': true, 'card-description-text-normal-monster': types[card.type] == 'Normal'}">{{card.desc}}</span>
      </div>
      <div v-if="card.type.includes('Monster')">
        <div class="card-stats">
          ATK /{{formatStat(card.atk)}} DEF /{{formatStat(card.def)}}
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    <img src="./../../public/img/versoygo.jpg" />
  </div>  
  
</template>


<script>

import {races, types} from '@/API/database';

// Attention : Les tailles sont basées sur une width de carte de 20vw !
export default {
  data: () => ({
    updateKey: 0,
    races: races,
    types: types,
  }),
  props: {
    card: {},
    count: {},
  },
  updated() {
    if (this.$refs.cardBody) {
      this.$nextTick(() => {
        this.initCardVisual();
      });
    }
  },
  watch: {
    card(){
      this.updateKey ++;
    }
  },
  mounted() {
    window.addEventListener("resize", this.changeTitleFontSize);
    this.initCardVisual();
  },
  methods: {
    formatStat(stat){
      if (!stat) return;
      return " ".repeat(4-stat.toString().length)+stat.toString().substring(0,4)
    },
    getCardTitleClass(card) {
      return {
        'card-title': true,
        'rarity-common': ["Common", "Short Print"].includes(card?.chosenSet?.set_rarity),
        'rarity-rare': card?.chosenSet?.set_rarity == "Rare",
        'rarity-super': ["Super Rare", "Ultra Rare", "Secret Rare"].includes(card?.chosenSet?.set_rarity),
        }
    },
    initCardVisual() {
      this.changeTitleFontSize();
      this.changeDescriptionFontSize();
    },
    changeTitleFontSize() {
      const size = 20;
      const defaultLetterSpacing = -1;
      const width20vw = 240;
      if (!this.$refs.cardBody) return;
      this.$refs.cardTitle.style.fontSize = this.$refs.cardBody.offsetWidth * size / width20vw + "px";
      this.$refs.cardTitle.style.letterSpacing = this.$refs.cardBody.offsetWidth * defaultLetterSpacing / width20vw + "px";

    },
    changeDescriptionFontSize() {
      const size = 9.8;
      const width20vw = 240;
      if (this.$refs.cardDescription) this.$refs.cardDescription.style.fontSize = this.$refs.cardDescription.offsetWidth * size / width20vw + "px";
    },
    getCardBodyClass(card) {
      return {
        'card-body': true, 
        'effect-monster-card': card.frameType == "effect",
        'normal-monster-card': card.frameType == "normal",
        'spell-card': card.frameType == "spell",
        'trap-card': card.frameType == "trap",
        'fusion-card': card.frameType == "fusion",
        'pendulum-card': card.frameType == "effect_pendulum"
    }
  }
  }
};
</script>
  
<style scoped>
@font-face {
  font-family: 'MatrixBook';
  src: url('../../public/fonts/MatrixBook.ttf');
  src: url('../../public/fonts/MatrixBook.ttf') format('truetype');
}
@font-face {
  font-family: 'MatrixBoldSmallCaps';
  src: url('../../public/fonts/MatrixBoldSmallCaps.otf');
}
@font-face {
  font-family: 'MatrixRegularSmallCaps1';
  src: url('../../public/fonts/MatrixRegularSmallCaps1.ttf');
}
@font-face {
  font-family: 'MatrixRegularSmallCaps2';
  src: url('../../public/fonts/MatrixRegularSmallCaps2.ttf');
}

.card-star {
  width: 7%;
}
.card-stars {
  height: 4%;
  display: flex;
  justify-content: right;
  padding-right: 10%;
  padding-top: 0.5%;
}
.img-cropped {
  position: relative;
  width: 76.5%;
  height: 52.8%;
  padding-left: 12%;
  padding-top: 2.8%;
}
.card-title {
  
  font-family: 'MatrixRegularSmallCaps1';
  text-align: start;
  width: 100%;
  padding: 7.15% 0 0 8.5% ;
  font-weight: 550;
  color: black;
  letter-spacing: -0.095vw;
  width: 100%;
  height: 7%;
}
.rarity-common {
  color: rgb(0, 0, 0);
}
.rarity-rare {
  color: white;
  text-shadow: -2px 2px 2px #000000,
                        2px 2px 2px #000000,
                        2px -2px 2px #000000,
                      -2px -2px 2px #000000;
}
.rarity-super {
  color: white;
  text-shadow: -2px 2px 2px #ff9900,
                        2px 2px 2px #ff9900,
                        2px -2px 2px #ff9900,
                      -2px -2px 2px #ff9900;
}
.card-description-text {

}
.card-description-text-normal-monster {
  font-style: italic;
  font-weight: 500;
}
.card-description {
  color: black;
  font-family: 'MatrixBook';
  text-align: start;
  font-size: 0.6vw;
  padding-left: 8%;
  font-weight: bold;
  width: 85%;
  text-align: start;
  display: flex;
  padding-top: 3%;
  padding-right: 0;
  flex-direction: column;
  flex-grow: 1;
  overflow: hidden;

}
.card-description-inside {
  
  display: flex;
  flex-direction: column;
  line-height: 80%;
  width: 100%;
  height: 100%;
  margin-bottom: 10%;
  margin-top: 5%;
  overflow-y: scroll;
}
.card-description-inside::-webkit-scrollbar {
  display: none;
}
.card-stats {
  border-top: 1px solid black;
  padding-top: 1px;
  margin: 0 1%;
  color: black;
  margin-bottom: 10%;
  font-family: 'MatrixBoldSmallCaps';
  padding-left: 60%;
}



.card-border {
  height: 22rem;
  display: inline-block;
}

.card-body {
  position: relative;
  width: 100%;
  height: 100%;
  background-size: cover;
  border: 1px solid black;
  z-index: 0;
  display: flex;
  flex-direction: column;
}
.effect-monster-card {
  background-image: url('../../public/img/effect-monster.png');
}
.normal-monster-card {
  background-image: url('../../public/img/normal-card.png');
}
.spell-card {
  background-image: url('../../public/img/spell-card.png');
}
.trap-card {
  background-image: url('../../public/img/trap-card.png');
}
.fusion-card {
  background-image: url('../../public/img/fusion-card.png');
}
.pendulum-card {
  background-image: url('../../public/img/pendulum-card.png');
}


.card-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  padding: 1px;
}

.card-image {
  flex: 1;
}

.card-details {
  flex: 2;
}

img {
  width: 100%;
}


.bubble {
  position: absolute;
  background-color: white;
  font-weight: bold;
  border-radius: 50%;
  font-family:'Lucida Sans Unicode';
  color: black;
  z-index: 1;
  bottom: 10px;
  right: 10px;
  width: 20px;
  height: 20px;
  align-items: center;
  justify-content: center;
  display: flex;
}
</style>