<template>
  <div class="draft-page">
    <MultiSelect
        :options="selectSetOptions"
        :selected-options="selectedSets"
        placeholder="Sélectionnez les boosters..."
        @select="onSelect"
      />
    <button @click="startChoice">Commencer</button>
    <CardChoice v-if="start" class="card-choice" :sets="selectedSets"/>
  </div>
</template>

<script>
import CardChoice from '@/components/CardChoice';
import {MultiSelect} from 'vue-search-select';
import {sets} from './../API/database';
import "vue-search-select/dist/VueSearchSelect.css"

export default {
  name: 'DraftPage',
  components: {CardChoice, MultiSelect},
  props: {
  },
  computed: {
    selectSetOptions(){
      const compareFn = (a, b) => (a.tcg_date < b.tcg_date ? -1 : 0);
      return sets
      .sort(compareFn)
      .filter((set)=>set.num_of_cards >= 100)
      .map((set)=>({
        value: set.set_code,
        text: set.set_name
      }))
    },
  },
  methods: {
    onSelect (items) {
      this.selectedSets = items
    },
    startChoice() {
      this.start = true;
    }
  },
  data: () => ({
    selectedSets: [],
    start: false,
  })
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
