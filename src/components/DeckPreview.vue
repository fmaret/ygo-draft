<template>
  <div class="main-container">
    <div class="deck-preview">
        <h1>
            <span>Deck</span>
            <span>({{countDeck}})</span>
        </h1>
        <h2>
            <span>Monstres</span>
            <span>({{countMonsters}})</span>
        </h2>
        <ul>
            <li class="monster" v-for="card in monsters" :key="card.id" @mouseover="previewedCard=card;">
                <span>{{card.name}}</span>
                <span class="card-count">{{card.count}}</span>
            </li>
        </ul>

        <h2>
            <span>Magies</span>
            <span>({{countSpells}})</span>
        </h2>
        <ul>
            <li class="spell" v-for="card in spells" :key="card.id" @mouseover="previewedCard=card;">
                <span>{{card.name}}</span>
                <span class="card-count">{{card.count}}</span>
            </li>
        </ul>

        <h2>
            <span>Pièges</span>
            <span>({{countTraps}})</span>
        </h2>
        <ul>
            <li class="trap" v-for="card in traps" :key="card.id" @mouseover="previewedCard=card;">
                <span>{{card.name}}</span>
                <span class="card-count">{{card.count}}</span>
            </li>
        </ul>

        <h2>
            <span>Extra</span>
            <span>({{countExtra}})</span>
        </h2>
        <ul>
            <li class="extra" v-for="card in extra" :key="card.id" @mouseover="previewedCard=card;">
                <span>{{card.name}}</span>
                <span class="card-count">{{card.count}}</span>
            </li>
        </ul>
    </div>
    <div class="previewed-card" :style="{'width': `15vw`, 'height': `${15*1.45}vw`}">
        <CardSmall v-if="previewedCard" :card="previewedCard"/>
    </div>
  </div>
</template>


<script>
import CardSmall from '@/components/CardSmall.vue';
export default {
  components: {CardSmall},
  data: () => ({
    previewedCard: null,
  }),
  props: {
    deck: {default: []},
    extraDeck: {default: []}
  },
  computed: {
    countExtra() {
        return this.extra.reduce((a, b)=> a+b.count, 0);
    },
    countMonsters() {
        return this.monsters.reduce((a, b)=> a+b.count, 0);
    },
    countSpells() {
        return this.spells.reduce((a, b)=> a+b.count, 0);
    },
    countTraps() {
        return this.traps.reduce((a, b)=> a+b.count, 0);
    },
    countDeck() {
        return this.deck.reduce((a, b)=> a+b.count, 0);
    },
    monsters() {
        return this.deck.filter((card)=>card.type.includes("Monster"));
    },
    spells() {
        return this.deck.filter((card)=>card.type == "Spell Card");
    },
    traps() {
        return this.deck.filter((card)=>card.type == "Trap Card");
    },
    extra() {
        return this.extraDeck;
    }
  },
  methods: {
  }
};
</script>
  
<style scoped>
.card-count {
    position: relative;
    left: 0.2rem;
}
.deck-preview {
    height: 100%;
    overflow: scroll; 
}
.deck-preview::-webkit-scrollbar {
  display: none;
}
.deck-preview {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
li:hover {
    cursor: pointer;
}
li {
    background-color: lightblue;
    font-size: 10px;
    padding: 0.2rem;
    margin: 0.1rem;
    list-style-type: none;
    border: 1px solid black;
    color: white;
}

ul {
    display: flex;
    flex-direction: column;
    justify-items: center;
    padding-inline-start: 0;
}

.monster {
    background-color: rgb(148, 85, 60);
}
.spell {
    background-color: rgb(14, 99, 14);
}
.extra {
    background-color: rgb(76, 31, 136);
}
.trap {
    background-color: rgb(161, 24, 161);
}
.previewed-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex-grow: 1;
}
.main-container {
    display: flex;

}
ul, h2 {
    margin: 0.2rem;
}
</style>