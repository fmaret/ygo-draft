<template>
  <div class="card-container">
    <div class="card-image">
      <img v-if="card" :src="card.card_images[0].image_url" alt="Card Image" />
      <img v-else src="./../../public/img/versoygo.jpg" />
      <span>{{card.chosenSet?.set_rarity}}</span>
    </div>
  </div>
</template>


<script>
export default {
  props: {
    card: {},
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

.card-type,
.card-archetype,
.card-attribute,
.card-level,
.card-atk-def,
.card-description {
  margin-bottom: 5px;
}
</style>