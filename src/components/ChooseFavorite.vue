<template>
  <div class="container">
    <div class="cover" v-for="(list, index) in liste" :key="index">
      <span @click="filterFavs($event)">{{ list.name }}</span>
      <span v-if="list" class="icon" @click="addFirebase($event)">+</span>
    </div>

    <form @submit.prevent="create">
      <input type="text" v-model="inputValue" />
    </form>
    <button @click="create">{{ $t("newgroup") }}</button>
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { Component, Prop } from "vue-property-decorator";
import PokemonModule from "@/store/Pokemon";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
} from "@firebase/firestore";
import { auth, db } from "@/store/db";
import axios from "axios";
export interface PokemonType {
  id?: string;
  name: string;
  sprites?: string;
  uid?: string;
  groupName?: string;
}
export interface PokemonDataTypes {
  id?: number;
  name?: string;
  sprites?: { other: { dream_world: { front_default: string } } };
  uid?: string;
  groupName?: string;
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
  liste: {
    id?: string;
    name: string;
    sprites?: string;
    uid?: string;
    groupName?: string;
  }[] = [];
  favorites: object[] = [];
  pokemondata: PokemonDataTypes = {};

  created() {
    onSnapshot(collection(db, "groups"), (querySnapshot) => {
      const favoritesFromDb: { id: string; uid: string; name: string }[] = [];
      querySnapshot.forEach((doc) => {
        console.log("sprites bu", doc.data());
        const favorite: { id: string; uid: string; name: string } = {
          id: doc.id,
          uid: doc.data().uid,
          name: doc.data().name,
        };
        if (auth.currentUser)
          if (auth.currentUser.uid === favorite.uid) {
            favoritesFromDb.push(favorite);
          }
      });
      this.liste = favoritesFromDb;
    });
    if (this.pokemondata.id !== this.id) {
      axios.get(PokemonModule.GetUrl + `${this.id}`).then((response) => {
        this.pokemondata = response.data;
        console.log("pokemon datası", this.pokemondata);
      });
    }
  }

  create() {
    // yeni collection ekliyor.
    if (auth.currentUser)
      addDoc(collection(db, "groups"), {
        uid: auth.currentUser.uid,
        name: `${this.inputValue}`,
      });
    PokemonModule.SET_LİSTE(this.inputValue);

    this.inputValue = "";
  }

  async filterFavs(event: any) {
    onSnapshot(collection(db, "favorites"), (querySnapshot) => {
      const favoritesFromDb: PokemonType[] = [];
      querySnapshot.forEach((doc) => {
        const favorite: PokemonType = {
          id: doc.id,
          name: doc.data().favorites[0].name,
          sprites: doc.data().favorites[0].sprites,
          groupName: doc.data().favorites[0].groupName,
          uid: doc.data().uid,
        };
        favoritesFromDb.push(favorite);
        console.log("sprites asıl", favoritesFromDb);
        let liste: PokemonType[] = favoritesFromDb.filter((item) => {
          console.log("item", item);
          return item.groupName === event.target.innerText ? item : null;
        });
        console.log("liste", liste);
        this.liste = liste;
      });
      console.log("this liste", this.liste);
      PokemonModule.SET_FİLTEREDLİST(this.liste);
      PokemonModule.SET_CHANGENAMEFİLTER();
    });
  }

  async deletefavorite(id: string) {
    console.log(id);
    deleteDoc(doc(db, "favorites", id));
  }
  addFirebase(event: any) {
    console.log("datapokemon", this.pokemondata);
    console.log("event", event);
    //! collectiona yeni data ekliyor.
    if (auth.currentUser && this.pokemondata.sprites)
      addDoc(
        collection(
          db,
          `favorites`
          // `${this.pokemondata.name}`
          // `${this.id}`
        ),
        {
          uid: auth.currentUser.uid,
          favorites: [
            {
              name: this.pokemondata.name,
              id: this.pokemondata.id,
              sprites: this.pokemondata.sprites.other.dream_world.front_default,
              groupName: `${event.target.previousElementSibling.innerText}`,
            },
          ],
        }
      );
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
