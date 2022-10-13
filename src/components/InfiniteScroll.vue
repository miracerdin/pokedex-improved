<template>
  <div class="container">
    <div class="eachOne" v-for="item in articles" :key="item.id">
      <EachPokemon :item="item"></EachPokemon>
    </div>
    <div
      v-if="articles.length"
      v-observe-visibility="handleScrollToBottom"
    ></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import PokemonModule from "@/store/Pokemon";
import EachPokemon from "@/components/EachPokemon.vue";
import DrawerComponent from "./DrawerComponent.vue";
@Component({
  components: {
    EachPokemon,
    DrawerComponent,
  },
})
export default class InfiniteScroll extends Vue {
  @Prop({ required: true }) articles!: [
    {
      id: number;
      name: string;
      url: string;
      sprites: { other: { dream_world: { front_default: string } } };
    }
  ];
  isActive = false;
  offset = 0;
  async computed() {
    this.isActive = PokemonModule.GetDrawer;
  }
  // limit = 100;
  async handleScrollToBottom(isVisible: boolean) {
    if (!isVisible) {
      return;
    }
    this.offset += 20;
    this.$emit("refetch", this.offset);
  }
}
</script>

<style scoped>
.container {
  display: flex;
  flex-wrap: wrap;
}

.eachOne {
  margin: 1rem auto;
  background: #ccc;
  width: 200px;
  border-radius: 1em;
}
img {
  width: 80%;
  height: 100px;
  object-fit: contain;
}
</style>
