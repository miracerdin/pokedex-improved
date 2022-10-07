<template>
  <div>
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

            <p v-if="item.abilities[1]">
              | {{ item.abilities[1].ability.name }}
            </p>
          </div>

          <span>Weight:{{ item.weight }}</span> |
          <span>Height:{{ item.height }}</span>

          <div class="spans">
            <!-- <router-link
            class="link"
            :to="{ name: 'DetailPage', params: { name: item } }"
            >Detail</router-link
          > -->
            <span :class="{ active: isActive }" @click="detailBox">Detail</span>
            <span class="addFavoriteFunc" v-on:click="addToFavorites"
              ><i
                class="fa-solid fa-heart"
                :class="{ active: isActive }"
                @click="chooseFavorite(item.id)"
              ></i>
            </span>
          </div>
          <div v-if="isActive" class="popup">
            <div>
              <a :id="`DetailPage/${item.id}`" item :href="url" class="link"
                >Page</a
              >

              <!-- :to="{ name: 'DetailPage', params: { name: item } }" -->
            </div>
            <div @click="modalFunc">Modal</div>
            <div @click="drawerFunc">Drawer</div>
          </div>
        </div>
      </div>
    </div>
    <div class="modalDiv" :class="{ modalDivekstra: modalOpen }">
      <ModalComponent :id="item.id" @closeModal="closeModal"></ModalComponent>
    </div>
    <div class="drawerDiv" :class="{ dwerekstra: isOpen }">
      <DrawerComponent
        :id="item.id"
        @closeDrawer="closeDrawer()"
      ></DrawerComponent>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import PokemonModule from "@/store/Pokemon";
import ChooseFavorite from "./ChooseFavorite.vue";
import DrawerComponent from "./DrawerComponent.vue";
import ModalComponent from "./ModalComponent.vue";
@Component({
  components: {
    ChooseFavorite,
    DrawerComponent,
    ModalComponent,
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
  isOpen = false;
  modalOpen = false;
  get url() {
    return `/DetailPage/${this.item.id}`;
  }

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
  detailBox() {
    this.isActive = !this.isActive;
  }
  modalFunc() {
    this.modalOpen = !this.modalOpen;
  }
  closeModal() {
    this.modalOpen = !this.modalOpen;
  }
  drawerFunc() {
    PokemonModule.SET_DRAWER();
    this.isOpen = !this.isOpen;
  }
  closeDrawer() {
    this.isOpen = !this.isOpen;
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
  position: relative;
  background-color: transparent;
  box-sizing: border-box;
  width: 200px;
  height: 200px;
  perspective: 1000px;
  border-radius: 1rem;
  transition: all 0.3s ease-in;
  /* overflow: hidden; */
}

.flip-card-inner {
  position: relative;
  background-color: var(--background-color-primary);
  width: 100%;
  height: 100%;
  text-align: center;
  border-radius: 1rem;
  transition: transform 0.6s;
  transform-style: preserve-3d;
  box-shadow: 0 4px 8px 0 rgba(0, 0, 0, 0.2);
  z-index: -1;
}

.flip-card:hover .flip-card-inner {
  transform: rotateY(180deg);
}

.flip-card-front,
.flip-card-back {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 1rem;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background-color: var(--background-color-secondary) !important;
  color: var(--text-primary-color) !important;
}
.flip-card-front {
  overflow: hidden;
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
.spans > span {
  margin: 1rem;
  text-decoration: underline;
  cursor: pointer;
  transition: all 0.3s ease;
}
.spans > span:hover {
  color: rgb(232, 35, 35);
}
.component {
  position: absolute;
  z-index: -1;
}
.link {
  color: var(--text-primary-color);
  margin: auto;
  transition: color 0.3s ease;
}
.link:hover {
  color: rgb(229, 71, 71);
}
.active {
  z-index: 2;
}
.popup {
  position: absolute;
  width: 100%;
  height: 150px;
  top: 0;
  background-color: var(--background-color-secondary);
  border-radius: 1rem;
  z-index: 100;
}
.popup div {
  padding: 1rem;
  cursor: pointer;
}
.drawerDiv {
  width: 50%;
  height: 100vh;
  z-index: 100;
  right: -100%;
  top: 0;
  position: absolute;
  background-color: var(--background-color-secondary);
  transition: all 0.5s ease;
}
.dwerekstra {
  right: 0;
}

.modalDiv {
  position: absolute;
  top: 50%;
  left: 50%;
  background-color: var(--background-color-secondary);
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
  height: 0;
  width: 50vw;
  box-sizing: border-box;
  /* visibility: hidden; */
  transition: all 0.5s ease;
  /* z-index: 100; */
  z-index: -1;
}
.modalDivekstra {
  /* visibility: visible; */
  z-index: 2;
  min-height: 50vh;
}
hr {
  border: 1px dashed gray;
}
</style>
