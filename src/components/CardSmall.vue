<template>
  <!-- <div class="card-container">
    <div class="card-image">
      <img v-if="card" :src="card.card_images[0].image_url" alt="Card Image" />
      <img v-else src="./../../public/img/versoygo.jpg" />
      <span>{{card?.chosenSet?.set_rarity}}</span>
      <div class="bubble" v-if="count"><span class="count">{{count}}</span></div>
    </div>
  </div> -->
  <div ref="cardBody" v-if="card" :class="getCardBodyClass(card)">
    <span ref ="cardTitle" class="card-title">{{card.name}}</span>
    <span class="card-stars">
      <img class="card-star" src="../../public/img/ygo-star.png"/>
    </span>
    <img class="img-cropped" :src="card.card_images[0].image_url_cropped"/>
    <div class="card-description">
      <div class="card-description-inside">
        <span>[Monstre à effect / Bête]</span>
        <span>{{card.desc}}</span>
      </div>
    </div>
  </div>
  
</template>


<script>
// Attention : Les tailles sont basées sur une width de carte de 20vw !
export default {
  props: {
    card: {},
    count: {},
  },
  watch: {
    card(){
      // On n'a pas le choix car quand il n'y a pas de carte, la ref cardTitle n'existe pas encore quand la carte arrive
      // donc on attend 1 milliseconde
      setTimeout(() => {
        this.initCardVisual();
      }, 1000);
      
    }
  },
  mounted() {
    window.addEventListener("resize", this.changeTitleFontSize);
  },
  methods: {
    initCardVisual() {
      this.changeTitleFontSize();
    },
    changeTitleFontSize() {
      const size = 20;
      const width20vw = 240;
      if (this.$refs.cardBody) this.$refs.cardTitle.style.fontSize = this.$refs.cardBody.offsetWidth * size / width20vw + "px";
      // return (this.$refs?.cardBody?.offsetWidth ? this.$refs.cardBody.offsetWidth * size / width20vw : size) + "px";
    },
    getCardBodyClass(card) {
      return {
        'card-body': true, 
        'effect-monster-card': card.frameType == "effect",
        'normal-monster-card': card.frameType == "normal",
        'spell-card': card.frameType == "spell",
        'trap-card': card.frameType == "trap",
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
  width: 78%;
  height: 56.5%;
  padding-left: 12%;
  padding-top: -1%;
  z-index: -2;
}
.card-title {
  color: black;
  font-family: 'MatrixRegularSmallCaps1';
  text-align: start;
  width: 100%;
  padding: 7.15% 0 0 8.5% ;
  font-weight: 800;
  text-shadow: 0px 0px 0px rgb(255, 255, 255);
  letter-spacing: -0.095vw;
  width: 100%;
  height: 7%;
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
}
.card-description-inside {
  display: flex;
  flex-direction: column;
  line-height: 80%;
  width: 100%;
  height: 100%;
  margin-bottom: 10%;
  overflow-y: scroll;
}
.card-description-inside::-webkit-scrollbar {
  display: none;
}


.card-border {
  height: 22rem;
  display: inline-block;
}
.card-body {
  width: 100%;
  height: 100%;
  background-size: cover;
  border: 1px solid black;
  z-index: -1;
  display: flex;
  flex-direction: column;
}
.effect-monster-card {
  background-image: url('../../public/img/effect-monster.png');
}
.normal-monster-card {
  background-image: url('../../public/img/effect-monster.png');
}
.spell-card {
  background-image: url('../../public/img/spell-card.png');
}
.trap-card {
  background-image: url('../../public/img/trap-card.png');
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