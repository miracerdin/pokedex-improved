<template>
  <div class="cover">
    <button class="closebtn" @click="closeModal">Close</button>
    <div class="container">
      <h1>{{ data.name }}</h1>

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
import { Component, Vue, Prop } from "vue-property-decorator";
import { DetailPokemon } from "../types/index";
@Component
export default class ModalComponent extends Vue {
  @Prop() id!: number;
  data = {} as DetailPokemon;

  async created() {
    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/${this.id}`)
      .then((response) => {
        return (this.data = response.data);
      });
  }

  closeModal() {
    this.$emit("closeModal", false);
  }
}
</script>

<style scoped>
.cover {
  border-radius: 1rem;
  background-color: var(--background-color-secondary);
  position: relative;
}
.container {
  border-radius: 1rem;
  min-height: 500px;
  box-sizing: border-box;
  -webkit-box-shadow: 17px 10px 14px 0px rgba(0, 0, 0, 0.58);
  -moz-box-shadow: 17px 10px 14px 0px rgba(0, 0, 0, 0.58);
  box-shadow: 17px 10px 14px 0px rgba(0, 0, 0, 0.58);
}
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
