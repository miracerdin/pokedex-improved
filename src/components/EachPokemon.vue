<template>
  <div class="flip-card">
    <div class="flip-card-inner">
      <div class="flip-card-front">
        <slot name="item" v-bind:item="item"></slot>
        <h3>{{ item.name.toUpperCase() }}</h3>
        <div class="imgDiv">
          <img
            :src="item.sprites.other.dream_world.front_default"
            alt="pokemonImage"
          />
        </div>

        <ChooseFavorite
          class="component"
          :class="{ active: isActive }"
          :id="item.id"
        ></ChooseFavorite>
      </div>
      <div class="flip-card-back">
        <h3>{{ item.name.toUpperCase() }}</h3>
        <!-- <hr /> -->

        <span>Abilities:</span>
        <div class="cover">
          <p>{{ item.abilities[0].ability.name }} &nbsp;</p>

          <p v-if="item.abilities[1]">| {{ item.abilities[1].ability.name }}</p>
        </div>

        <span>Weight:{{ item.weight }}</span> |
        <span>Height:{{ item.height }}</span>

        <div class="spans">
          <router-link
            class="link"
            :to="{ name: 'DetailPage', params: { name: item } }"
            >Detail</router-link
          >
          <span class="addFavoriteFunc" v-on:click="addToFavorites"
            ><i
              class="fa-solid fa-heart"
              :class="{ active: isActive }"
              @click="chooseFavorite(item.id)"
            ></i>
          </span>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import PokemonModule from "@/store/Pokemon";
import ChooseFavorite from "./ChooseFavorite.vue";
@Component({
  components: {
    ChooseFavorite,
  },
})
export default class EachPokemon extends Vue {
  @Prop({ required: true }) item!: {
    id: number;
    name: string;
    weight: number;
    height: number;
    sprites: { other: { dream_world: { front_default: string } } };
    abilities: [{ ability: { name: string } }, { ability: { name: string } }];
  };
  liste = [];
  isActive = false;

  addToFavorites() {
    // this.isActive = true;
    PokemonModule.SET_TITLE(this.item);
    // this.$store.dispatch("addFavorites", this.item);
    let local = JSON.parse(localStorage.getItem("liste") as string);
    if (local && local.some((res) => res.id === this.item.id)) {
      null;
    } else {
      local.push(this.item);
    }
    localStorage.setItem("liste", JSON.stringify(local));
  }
  chooseFavorite(id: number) {
    console.log(this.isActive);
    this.isActive = !this.isActive;
    console.log(this.isActive);
    console.log(id, event);

    // this.isActive = !this.isActive;
  }
  closeFavorite() {
    console.log(event);
    this.isActive = false;
  }
}
</script>

<style scoped>
/* .flip-card {
  position: relative;
  background-color: var(--background-color-secondary);
  border-radius: 1rem;
  transition: all 0.3s ease-in;
  overflow: hidden;
} */
.flip-card {
  background-color: transparent;
  box-sizing: border-box;
  width: 200px;
  height: 200px;
  perspective: 1000px;
  border-radius: 1rem;
  transition: all 0.3s ease-in;
  overflow: hidden;
}

.flip-card-inner {
  position: relative;
  background-color: var(--background-color-primary);
  width: 100%;
  height: 100%;
  text-align: center;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background-color: var(--background-color-secondary) !important;
  color: var(--text-primary-color) !important;
}

.flip-card-back {
  transform: rotateY(180deg);
  padding: 0;
}
.cover {
  display: flex;
  justify-content: center;
  align-items: flex-start;
}
h3 {
  width: 100%;
  text-align: center;
}
.imgDiv {
  width: 100%;
}
.eachOne {
  margin: 1rem auto;
  background: #ccc;
  width: 200px;
  border-radius: 1em;
  z-index: 3;
}
img {
  width: 80%;
  height: 100px;
  object-fit: contain;
}
i {
  cursor: pointer;
}
.spans {
  padding: 1rem;
  margin: auto;
}
.component {
  position: absolute;
  z-index: -1;
}
.link {
  color: var(--text-primary-color);
  margin-right: 1rem;
  transition: color 0.3s ease;
}
.link:hover {
  color: rgb(229, 71, 71);
}
.active {
  z-index: 2;
}
hr {
  border: 1px dashed gray;
}
</style>
