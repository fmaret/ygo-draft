<template>
  <div class="card-container">
    <div class="card-image">
      <img
        :src="card.card_images[0].image_url"
        alt="Card Image"
        class="small-image"
      />
    </div>
    <div class="card-details">
      <div class="card-title">
        <strong>{{ card.name }}</strong>
      </div>
      <!-- Retirer le mot Monster dans card.type + traduction -->
      <div class="card-type">
        <strong>[{{ card.race }} / {{ card.type }}]</strong>
      </div>
      <div v-if="card.level && card.attribute" class="card-level">
        <strong>[{{ card.level }}&#9733; | {{ card.attribute }}]</strong>
      </div>
      <div v-if="card.archetype" class="card-archetype">
        <strong>Serie :</strong> {{ card.archetype }}
      </div>
      <div class="card-atk-def">
        <strong>
          <span v-if="card.atk !== null && card.atk">
            ATK/{{ card.atk !== null ? card.atk : "" }}
          </span>
          <span v-if="card.def !== null && card.def">
            DEF/{{ card.def !== null ? card.def : "" }}
          </span>
          <span v-if="card.linkval !== null && card.linkval">
            LINK-{{ card.linkval !== null ? card.linkval : "" }}
          </span>
        </strong>
      </div>
    </div>
    <div class="card-description">
      {{ card.desc }}
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
  flex-direction: column;
  align-items: center;
  border: 1px solid #ccc;
  padding: 10px;
}

.card-image {
  margin-bottom: 20px;
}

.small-image {
  max-width: 200px; /* Définissez la largeur maximale souhaitée pour l'image */
}

.card-details {
  width: 100%;
}

.card-description {
  flex-grow: 1; 
  max-height: 85vh;
  overflow: auto;
}
</style>