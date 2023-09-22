<template>
  <div class="modal">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">&times;</span>
      <div class="image-container">
        <div v-for="(card, index) in cards" :key="index" class="image-item">
          <CardSmall :style="{ width: `10vw`, height: `${10 * 1.45}vw` }" :card="card"></CardSmall>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import CardSmall from "@/components/CardSmall.vue";
export default {
  props: {
    cards: Array,
  },
  components: { CardSmall },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  z-index: 5;
}

.modal-content {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 5px;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
}

.image-container {
  display: flex;
  justify-content: space-between;
}

.image-item {
  flex: 1;
  padding: 10px;
}
</style>
