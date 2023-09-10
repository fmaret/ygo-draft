<template>
  <div class="main-menu">
    <button @click="goTo('/booster')">
      Ouvrir un booster
    </button>
    <button @click="goTo('/card')">
      Cartes
    </button>
    <button @click="goTo('/deck-editor')">
      Deck editor
    </button>
  </div>
</template>

<script>
export default {
  name: 'MainPage',
  props: {
  },
  methods: {
    goTo(route){
      this.$router.push(route)
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
