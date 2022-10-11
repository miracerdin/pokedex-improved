<template>
  <div>
    <h2 v-if="!filteredList">All</h2>
    <h2 v-else>{{ favorites[0].groupName }}</h2>
    <div class="cover">
      <div class="info" v-if="favorites.length === 0">
        {{ $t("favoritePage.nofavoritewriting") }}
      </div>

      <div class="container" v-for="data in favorites" :key="data.name">
        <div v-if="data.name && data.id">
          <h2 class="h2">{{ data.name.toUpperCase() }}</h2>
          <div class="imgDiv">
            <img v-bind:src="data.sprites" alt="images" />
          </div>
          <div class="spans">
            <span class="deleteSpan" @click="deletefavorite(data.id)">
              <i class="fa-solid fa-trash"></i>
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { auth, db } from "@/store/db";
import { collection, deleteDoc, doc, onSnapshot } from "@firebase/firestore";
import { Component, Vue } from "vue-property-decorator";
import PokemonModule from "../store/Pokemon";

export interface DatasTypes {
  data: {
    name?: string;
    id?: string;
    sprites?: string;
  };
}
export interface FavoriteTypes {
  name?: string;
  id?: string;
  sprites?: string;
  groupName?: string;
  uid: string;
}
@Component
export default class FavoritesPage extends Vue {
  datas: DatasTypes[] = [];
  favorites: {
    name?: string;
    id?: string;
    sprites?: string;
    groupName?: string;
    uid?: string;
  }[] = [];
  // auth: { uid: string } = auth.currentUser;

  filteredList = PokemonModule.GetChangeNameFilter;
  async created() {
    console.log(PokemonModule.GetFilteredList.length);
    if (!PokemonModule.GetFilteredList.length) {
      onSnapshot(collection(db, "favorites"), (querySnapshot) => {
        const favoritesFromDb: {
          name?: string;
          id?: string;
          sprites?: string;
          groupName?: string;
          uid: string;
        }[] = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data().favorites[0].sprites);
          const favorite = {
            id: doc.id,
            name: doc.data().favorites[0].name,
            sprites: doc.data().favorites[0].sprites,
            groupName: doc.data().favorites[0].groupName,
            uid: doc.data().uid,
          };
          if (auth.currentUser) {
            if (favorite.uid === auth.currentUser.uid)
              favoritesFromDb.push(favorite);
            console.log("favoritesFromDb", auth.currentUser.uid);
          }
          // let filtered: {
          //   name?: string;
          //   id?: string;
          //   sprites?: string;
          //   groupName?: string;
          //   uid?: string;
          // }[] = favoritesFromDb.filter((item) => {
          //   return item.uid === auth.currentUser.uid;
          // });
          this.favorites = favoritesFromDb;
        });
      });
    }
    console.log(" module", PokemonModule.GetFilteredList);
    this.favorites = PokemonModule.GetFilteredList;
  }
  mounted() {
    // console.log(PokemonModule.GetFilteredList.length);
    // if (!PokemonModule.GetFilteredList.length) {
    //   onSnapshot(collection(db, "favorites"), (querySnapshot) => {
    //     const favoritesFromDb: {
    //       name?: string;
    //       id?: string;
    //       sprites?: string;
    //       groupName?: string;
    //       uid: string;
    //     }[] = [];
    //     querySnapshot.forEach((doc) => {
    //       console.log(doc.data().favorites[0].sprites);
    //       const favorite = {
    //         id: doc.id,
    //         name: doc.data().favorites[0].name,
    //         sprites: doc.data().favorites[0].sprites,
    //         groupName: doc.data().favorites[0].groupName,
    //         uid: doc.data().uid,
    //       };
    //       if (favorite.uid === auth.currentUser.uid)
    //         favoritesFromDb.push(favorite);
    //       console.log("favoritesFromDb", favoritesFromDb);
    //       // let filtered: {
    //       //   name?: string;
    //       //   id?: string;
    //       //   sprites?: string;
    //       //   groupName?: string;
    //       //   uid?: string;
    //       // }[] = favoritesFromDb.filter((item) => {
    //       //   return item.uid === auth.currentUser.uid;
    //       // });
    //       this.favorites = favoritesFromDb;
    //     });
    //   });
    // }
    // console.log(" module", PokemonModule.GetFilteredList);
    // this.favorites = PokemonModule.GetFilteredList;
  }
  async deletefavorite(id: string) {
    console.log(id);
    deleteDoc(doc(db, "favorites", id));
  }
}
</script>
<style scoped>
.cover {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.container {
  width: 200px;
  height: 250px;
  margin: 1rem;
  background-color: var(--background-color-secondary);
  display: flex;
  align-items: center;
  justify-content: flex-start;
  flex-direction: column;
  padding: 0.5rem;
  cursor: pointer;
  border-radius: 10px;
}
.container:hover {
  transform: scale(1.02);
}
.info {
  justify-content: center;
}
.imgDiv {
  width: 200px;
  height: 80%;
}
img {
  width: 150px;
  height: 100px;
  object-fit: fill;
}
</style>
