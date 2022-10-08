<template>
  <div class="container">
    <ul>
      <li v-for="(list, index) in liste" :key="index">
        <span @click="addFirebase">{{ list }}</span>
        <span v-if="list" class="icon">+</span>
      </li>
      <!-- <li>Group 1</li>
      <li>Group 1</li> -->
    </ul>
    <input type="text" v-model="inputValue" />
    <button @click="create">Create new group</button>
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
  onSnapshot,
  setDoc,
} from "@firebase/firestore";
import { db } from "@/store/db";
import axios from "axios";
export interface PokemonType {
  id?: string;
  name?: string;
  sprites?: { other: { dream_world: { front_default: string } } };
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
    // console.log("cereted func", this.liste);

    // const li = document.createElement("li");
    // const node = document.createTextNode(this.inputValue);
    // li.appendChild(node);
    // const ulli = document.querySelector("ul");
    // ulli?.appendChild(li);
    // this.liste.push(li);
    // this.liste.push(this.inputValue);
    this.inputValue = "";
  }
  addFirebase() {
    console.log("datapokemon", this.pokemondata);
    //! collectiona yeni data ekliyor.
    addDoc(
      collection(
        db,
        "favorites"
        // `${this.pokemondata.name}`
        //  `${this.id}`
      ),
      {
        name: this.pokemondata.name,
        id: this.pokemondata.id,
        sprites: this.pokemondata.sprites.other.dream_world.front_default,
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
      console.log(this.pokemondata);
    });
  }
}
</script>

<style scoped>
.container {
  background-color: #cccccc;
  width: 100%;
  top: 200px;
  border-radius: 1rem;
}
li {
  list-style-type: none;
}
.icon {
  margin-left: 1rem;
  cursor: pointer;
}
</style>
