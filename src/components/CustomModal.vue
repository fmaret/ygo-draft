<template>
  <div class="modal"  @click="$emit('close')">
    <div class="modal-content">
      <span class="close" @click="$emit('close')">
        <img src="img/icons/close.png"/>
      </span>
      <slot/>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    cards: Array,
  },
  components: { },
};
</script>

<style>
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.2);
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
</style>
