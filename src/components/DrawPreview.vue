<template>
  <CustomModal>
      <div class="image-container">
        <div v-for="(card, index) in cards" :key="index" class="image-item">
          <CardSmall :style="{ width: `10vw`, height: `${10 * 1.45}vw` }" :card="card"></CardSmall>
        </div>
      </div>
  </CustomModal>
</template>

<script>
import CardSmall from "@/components/CardSmall.vue";
import CustomModal from "@/components/CustomModal.vue";
export default {
  props: {
    cards: Array,
  },
  components: { CardSmall, CustomModal },
};
</script>

<style>
.image-container {
  display: flex;
  justify-content: space-between;
}

.image-item {
  flex: 1;
  padding: 10px;
}
</style>
