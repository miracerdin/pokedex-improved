<template>
  <div class="container">
    <div class="cover" v-for="(list, index) in liste" :key="index">
      <span @click="addFirebase">{{ list }}</span>
      <span v-if="list" class="icon">+</span>
    </div>
    <!-- <li>Group 1</li>
      <li>Group 1</li> -->

    <form @submit.prevent="create">
      <input type="text" v-model="inputValue" />
      <button @click="create">{{ $t("newgroup") }}</button>
    </form>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import PokemonModule from "@/store/Pokemon";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  setDoc,
} from "@firebase/firestore";
import { auth, db } from "@/store/db";
import axios from "axios";
export interface PokemonType {
  id?: string;
  name?: string;
  sprites?: { other: { dream_world: { front_default: string } } };
  uid?: number;
}
@Component
export default class chooseFavorite extends Vue {
  @Prop({ required: true }) id!: number;
  item!: {
    id?: number;
    name?: string;
    sprites?: { other: { dream_world: { front_default: string } } };
  };
  inputValue = "";
  liste: string[] = [];
  favorites: object[] = [];
  pokemondata: PokemonType = {};
  created() {
    this.liste = PokemonModule.GetListe;
    // console.log("cereted func", this.liste);
  }
  create() {
    // yeni collection ekliyor.
    setDoc(doc(db, `${this.inputValue}`, `${new Date().getMilliseconds()}`), {
      // name: "Los Angeles",
      // state: "CA",
      // country: "USA",
    });

    PokemonModule.SET_LİSTE(this.inputValue);

    this.inputValue = "";
  }
  addFirebase() {
    console.log("datapokemon", this.pokemondata);
    //! collectiona yeni data ekliyor.
    addDoc(
      collection(
        db,
        "mirac"
        // `${this.pokemondata.name}`
        //  `${this.id}`
      ),
      {
        name: this.pokemondata.name,
        id: this.pokemondata.id,
        sprites: this.pokemondata.sprites.other.dream_world.front_default,
        uid: auth.currentUser.uid,
      }
    );
  }
  async mounted() {
    onSnapshot(collection(db, "favorites"), (querySnapshot) => {
      const favoritesFromDb: PokemonType[] = [];
      querySnapshot.forEach((doc) => {
        const favorite: PokemonType = {
          id: doc.id,
          name: doc.data().name,
          sprites: doc.data().sprites,
        };
        favoritesFromDb.push(favorite);
      });
      this.favorites = favoritesFromDb;
      console.log(this.favorites);
    });
    await axios.get(PokemonModule.GetUrl + `${this.id}`).then((response) => {
      this.pokemondata = response.data;
      console.log(db);
    });
  }
}
</script>

<style scoped>
.container {
  background-color: var(--accent-color);
  width: 100%;
  top: 200px;
  border-radius: 1rem;
}
.cover {
  margin: 0.5rem 0;
  gap: 1rem;
  width: 100%;
  color: var(--text-primary-color);
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 0.3rem 0;
  background-color: var(--background-color-secondary);
}

.icon {
  cursor: pointer;
}
</style>
