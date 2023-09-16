<template>
  <div class="card-container">
    <div class="card-image">
      <img v-if="card" :src="card.card_images[0].image_url" alt="Card Image" />
      <img v-else src="./../../public/img/versoygo.jpg" />
      <span>{{card?.chosenSet?.set_rarity}}</span>
      <div class="bubble" v-if="count"><span class="count">{{count}}</span></div>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    card: {},
    count: {}
  },
};
</script>
  
<style scoped>
.card-container {
  display: flex;
  flex-direction: row;
  align-items: flex-start;
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

.card-title {
  font-size: 18px;
  margin-bottom: 10px;
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