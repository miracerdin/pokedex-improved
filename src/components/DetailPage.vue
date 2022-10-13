<template>
  <div class="cover">
    <div class="container">
      <h1 v-if="typeof data.name === 'string' ? data.name.toUpperCase() : ''">
        {{ data.name.toUpperCase() }}
      </h1>
      <div>
        <h3>{{ $t("Abilities") }}:</h3>
        <p v-for="inside in data.abilities" :key="inside.name">
          {{ inside.ability.name }}
        </p>
      </div>
      <hr />
      <p>
        <b>{{ $t("Height") }}:</b> {{ data.height }}
      </p>
      <p>
        <b>{{ $t("Weight") }}:</b> {{ data.weight }}
      </p>
      <p>
        <b>{{ $t("Base experience") }}:</b> {{ data.base_experience }}
      </p>
      <div class="buttonDiv">
        <h3>{{ $t("Moves") }}:</h3>
        <button v-for="i in data.moves" :key="i.name">
          {{ i.move.name }}
        </button>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import axios from "axios";
import { Component, Vue } from "vue-property-decorator";
import { DetailPokemon } from "../types/index";
@Component({})
export default class DetailPage extends Vue {
  data = {} as DetailPokemon;
  async created() {
    let id = this.$route.params.id;
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${id}`)
      .then((response) => {
        return (this.data = response.data);
      });
  }
}
</script>
<style scoped>
.cover {
  display: flex;
  justify-content: center;
}
.container {
  background-color: var(--background-color-secondary);
  width: 60%;
  border-radius: 8px;
}
hr {
  border: 1px dashed grey;
}
.buttonDiv {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 0.5rem;
}
button {
  cursor: pointer;
  padding: 0.5rem;
  font-size: 1rem;
  background-color: var(--background-color-primary);
  color: var(--text-color-primary);
}
</style>
