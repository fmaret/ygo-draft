<template>
  <div ref="cardBody" v-if="card" :class="getCardBodyClass(card)"
      >
    <div class="card-title-and-attribute">
      <span ref ="cardTitle" :class="getCardTitleClass(card)" :key="updateKey">{{card.name}}</span>
      <img class="attribute-img" :src="getCardAttributeImage(card)"/>
    </div>
    <span class="card-stars">
      <img class="card-star" v-for="i in card.level" :key="i" src="../../public/img/ygo-star.png"/>
    </span>
    <img :class="{'img-cropped': true, 'img-shining': isShining}" :src="card.card_images[0].image_url_cropped"/>
    <div class="card-reference">
    </div>
    <div ref ="cardDescription" class="card-description">
      <div ref="cardDescriptionInside" class="card-description-inside">
        <span v-if="card.type.includes('Monster')" class="card-race">
          <span>[ {{ races[card.race] }}</span>
          <span v-if="types[card.type] != 'Normal'"> / {{ types[card.type] }}</span>
          <span> ]</span>
        </span>
        <span :class="{'card-description-text': true, 'card-description-text-normal-monster': types[card.type] == 'Normal'}">{{card.desc}}</span>
      </div>
      <div v-if="card.type.includes('Monster')">
        <div class="card-stats card-stats-monster">
          ATK /{{formatStat(card.atk)}} DEF /{{formatStat(card.def)}}
        </div>
      </div>
      <div v-else>
        <div class="card-stats">
        </div>
      </div>
    </div>
    <span v-if="count" class="bubble">{{count}}</span>
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
    window.addEventListener("resize", this.initCardVisual);
    this.initCardVisual();
  },
  computed: {
    isShining() {
      return ["Super Rare", "Ultra Rare", "Secret Rare"].includes(this.card?.chosenSet?.set_rarity);
    }
  },
  methods: {
    getCardAttributeImage(card) {
      if (card.frameType == "spell") return `/img/attributes/spell.png`
      else if (card.frameType == "trap") return `/img/attributes/trap.png`
      return `/img/attributes/${card.attribute.toLowerCase()}.png`
    },
    formatStat(stat){
      if (stat == null) return;
      return " ".repeat(8-2*stat.toString().length)+stat.toString().substring(0,4)
    },
    getCardTitleClass(card) {
      return {
        'card-title': true,
        'text-white': ["Rare", "Ultra Rare", "Secret Rare"].includes(card?.chosenSet?.set_rarity),
        'text-black': ["Common", "Short Print", "Super Rare"].includes(card?.chosenSet?.set_rarity),
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
      if (!this.card) return;
      const size = 9.8;
      const descriptionBoxSize =  this.card.type.includes("Monster") ? 66 : 75;
      const width20vw = 240;
      if (this.$refs.cardDescription) {
        this.$refs.cardDescription.style.fontSize = this.$refs.cardDescription.offsetWidth * size / width20vw + "px";
        this.$refs.cardDescriptionInside.style.height = this.$refs.cardDescriptionInside.offsetWidth * descriptionBoxSize / width20vw + "px";
      }
      
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
@font-face {
  font-family: 'Stone Serif Semibold';
  src: url('../../public/fonts/Stone Serif Semibold.ttf');
}
@font-face {
  font-family: 'Stone Serif LT Italic';
  src: url('../../public/fonts/Stone Serif LT Italic.ttf');
}
@font-face {
  font-family: 'Stone Serif Small Caps Bold';
  src: url('../../public/fonts/Stone Serif Small Caps Bold.ttf');
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
@keyframes shiningLoop {
  0%, 100% {
    -webkit-mask-position: 0;
    mask-position: 0;
  }
  100% {
    -webkit-mask-position: 120%;
    mask-position: 120%;
  }
}

.img-shining {
    -webkit-mask-image: linear-gradient(45deg,#000 25%,rgba(0,0,0,.2) 50%,#000 75%);
    mask-image: linear-gradient(45deg,#000 25%,rgba(0,0,0,.2) 50%,#000 75%);
    -webkit-mask-size: 800%;
    mask-size: 800%;
    -webkit-mask-position: 0;
    mask-position: 0;
    animation: shiningLoop 3s infinite; /* 2s pour aller, 2s pour revenir = 4s au total */
}








.card-title-and-attribute {
  display: flex;
  padding: 7.15% 0 0 8.5% ;
  font-family: 'MatrixRegularSmallCaps1';
  text-align: start;
  width: 100%;
  font-weight: 550;
  color: black;
  letter-spacing: -0.095vw;
  height: 7%;
}
.attribute-img {
  width: 8%;
  height: 80%;
}
.card-title {
  width: 76%;
  
}
.text-white {
  color: white;
  filter: brightness(10);
}
.text-black {
  color: black;
}
.card-reference {
  height: 4.5%;
}
.card-description-text {
  height: 10%;
  padding-top: 1.2%;
}
.card-race {
  font-family: 'Stone Serif Small Caps Bold';
  letter-spacing: -0.8px;
  font-weight: 2000;
  
}
.card-description-text-normal-monster {
  font-family: 'Stone Serif LT Italic';
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
  margin-bottom: 0%;
  overflow-y: scroll;
}
.card-description-inside::-webkit-scrollbar {
  display: none;
}
.card-stats {
  white-space: pre;
  padding-top: 1px;
  margin: 0 1%;
  color: black;
  font-family: 'MatrixBoldSmallCaps';
  padding-left: 58%;
}
.card-stats-monster {
  border-top: 1px solid black;
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
  border: 1px solid black;
  background-color: white;
  font-weight: bold;
  border-radius: 50%;
  font-family:'MatrixBook';
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