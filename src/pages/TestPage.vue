<template>
  <div style="display: flex;">
  <div :style="{'width': `20vw`, 'height': `${20*88/61}vw`}">
    <CardSmall :card="card" />
  </div>
  <div :style="{'width': `10vw`, 'height': `${10*88/61}vw`}">
    <!-- <CardSmall :card="card" /> -->
  </div>
  </div>
</template>

<script>
import CardSmall from '@/components/CardSmall.vue';
import {getCardById} from '@/API/database';
import "vue-search-select/dist/VueSearchSelect.css"

export default {
  name: 'TestPage',
  components: {CardSmall},
  props: {
  },
  computed: {
    card(){
      return getCardById(43228023);
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.draft-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.deck-preview {
  position: absolute;
  z-index: 1;
  width: 20%;
  left: 0;
  top: 100px;
  background-color: black;
  height: 100vh;
}
</style>





<style>
.draft-page > .card-choice {
  width: 60%;
}
</style>