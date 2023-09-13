<template>
  <div class="draft-page">
    <CardChoice class="card-choice"/>
  </div>
</template>

<script>
import CardChoice from '@/components/CardChoice';

export default {
  name: 'DraftPage',
  components: {CardChoice},
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
.draft-page {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.draft-page > .card-choice {
  width: 40%;
}
</style>
