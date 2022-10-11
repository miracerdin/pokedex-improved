<template>
  <div>
    <div class="cover">
      <button class="closebtn" @click="closeDrawer">Close</button>
      <div v-if="data.name">
        <div class="container">
          <h1>{{ data.name.toUpperCase() }}</h1>
          <div>
            <h3>Abilities:</h3>
            <p v-for="inside in data.abilities" :key="inside.name">
              {{ inside.ability.name }}
            </p>
          </div>
          <hr />
          <p><b>Height:</b> {{ data.height }}</p>
          <p><b>Weight:</b> {{ data.weight }}</p>
          <p><b>Base experience:</b> {{ data.base_experience }}</p>
          <div class="buttonDiv">
            <h3>Moves:</h3>
            <button v-for="i in data.moves" :key="i.name">
              {{ i.move.name }}
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import axios from "axios";
import { Component, Vue, Prop } from "vue-property-decorator";
import { DetailPokemon } from "../types/index";
@Component
export default class DrawerComponent extends Vue {
  @Prop() id!: number;
  data: {
    name: string;
    height: number;
    weight: number;
    abilities: { name: string; ability: { name: string } }[];
    base_experience: object;
    moves: { name: string; move: { name: string } }[];
  } = {};
  async created() {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
      .then((response) => {
        return (this.data = response.data);
      });
  }
  closeDrawer() {
    this.$emit("closeDrawer", false);
  }
}
</script>

<style scoped>
.closebtn {
  position: absolute;
  right: 1rem;
  top: 1rem;
  cursor: pointer;
  font-size: 1rem;
  background-color: brown;
  border: none;
  padding: 0.6rem;
  border-radius: 0.8rem;
  font-weight: 600;
  transition: background-color 0.3s ease;
}
.closebtn:hover {
  background-color: rgb(218, 16, 16);
}
</style>
