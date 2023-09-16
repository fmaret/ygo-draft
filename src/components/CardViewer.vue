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
        <strong>
          [
          {{ races[card.race] }} / {{ types[card.type] }}]</strong
        >
      </div>
      <div v-if="card.level && card.attribute" class="card-level">
        <strong
          >[{{ card.level }}&#9733; | {{ attributes[card.attribute] }}]</strong
        >
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
  data() {
    return {
      races: {
        Aqua: "Aqua",
        Beast: "Bête",
        "Beast-Warrior": "Bête-Guerrier",
        "Creator-God": "Dieu Créateur",
        Cyberse: "Cyberse",
        Dinosaur: "Dinosaure",
        "Divine-Beast": "Bête Divine",
        Dragon: "Dragon",
        Fairy: "Féerie",
        Fiend: "Démon",
        Fish: "Poisson",
        Insect: "Insecte",
        Machine: "Machine",
        Plant: "Plante",
        Psychic: "Psychique",
        Pyro: "Pyro",
        Reptile: "Reptile",
        Rock: "Rocher",
        "Sea Serpent": "Serpent de Mer",
        Spellcaster: "Magicien",
        Thunder: "Tonnerre",
        Warrior: "Guerrier",
        "Winged Beast": "Bête Ailée",
        Wyrm: "Wyrm",
        Zombie: "Zombie",
        Normal: "Normal",
        Field: "Terrain",
        Equip: "Équipement",
        Continuous: "Continu",
        "Quick-Play": "Jeu Rapide",
        Ritual: "Rituel",
        Counter: "Contre",
      },

      attributes: {
        DARK: "TÉNÈBRES",
        EARTH: "TERRE",
        FIRE: "FEU",
        LIGHT: "LUMIÈRE",
        WATER: "EAU",
        WIND: "VENT",
        DIVINE: "DIVIN",
      },

      types: {
        "Effect Monster": "Effet",
        "Flip Effect Monster": "Effet / Flip",
        "Flip Tuner Effect Monster": "Effet / Flip / Syntoniseur",
        "Gemini Monster": "Gemini",
        "Normal Monster": "Normal",
        "Normal Tuner Monster": "Normal / Syntoniseur",
        "Pendulum Effect Monster": "Pendule / Effet",
        "Pendulum Effect Ritual Monster": "Pendule / Effet / Rituel",
        "Pendulum Flip Effect Monster": "Pendule / Effet / Flip",
        "Pendulum Normal Monster": "Pendule / Normal",
        "Pendulum Tuner Effect Monster": "Pendule / Syntoniseur / Effet",
        "Ritual Effect Monster": "Rituel / Effet",
        "Ritual Monster": "Rituel",
        "Spell Card": "Magie",
        "Spirit Monster": "Esprit",
        "Toon Monster": "Toon",
        "Trap Card": "Piège",
        "Tuner Monster": "Syntoniseur",
        "Union Effect Monster": "Union / Effet",
        "Fusion Monster": "Fusion",
        "Link Monster": "Lien",
        "Pendulum Effect Fusion Monster": "Pendule / Effet / Fusion",
        "Synchro Monster": "Synchro",
        "Synchro Pendulum Effect Monster": "Synchro / Pendule / Effet",
        "Synchro Tuner Monster": "Synchro / Syntoniseur",
        "XYZ Monster": "XYZ",
        "XYZ Pendulum Effect Monster": "XYZ / Pendule / Effet",
        "Skill Card": "Compétence",
        Token: "Jeton",
      },
    };
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
