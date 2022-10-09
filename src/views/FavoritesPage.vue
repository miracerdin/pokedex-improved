<template>
  <div class="cover">
    <div class="info" v-if="favorites.length === 0">
      {{ $t("favoritePage.nofavoritewriting") }}
    </div>
    <div class="container" v-for="data in favorites" :key="data.name">
      <h2 class="h2">{{ data.name?.toUpperCase() }}</h2>
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
</template>
<script lang="ts">
import { db } from "@/store/db";
import { collection, deleteDoc, doc, onSnapshot } from "@firebase/firestore";
import { Component, Vue } from "vue-property-decorator";
// import { mapGetters, mapActions } from "vuex";
export interface DatasTypes {
  data: {
    name?: string;
    id?: string;
    sprites?: {
      other: {
        dream_world: {
          front_default: string;
        };
      };
    };
  };
}
@Component
export default class FavoritesPage extends Vue {
  datas: DatasTypes[] = [];
  favorites: {
    id?: string;
    name?: string;
    sprites?: string;
  }[] = [];

  async created() {
    // let local = JSON.parse(localStorage.getItem("liste"));
    // this.datas = local;
    // console.log("bu local", local);
  }
  mounted() {
    onSnapshot(collection(db, "favorites"), (querySnapshot) => {
      const favoritesFromDb = [{}];
      querySnapshot.forEach((doc) => {
        const favorite: {
          name?: string;
          id?: string;
          sprites?: string;
        } = {
          id: doc.id,
          name: doc.data().name,
          sprites: doc.data()?.sprites,
        };
        favoritesFromDb.push(favorite);
      });
      this.favorites = favoritesFromDb;
      console.log("this.favorites", this.favorites);
    });
  }
  async deletefavorite(id: string) {
    console.log(id);
    deleteDoc(doc(db, "favorites", id));
    // let local = JSON.parse(localStorage.getItem("liste"));
    // let filtered = local.filter((item) => item.id !== data.id);
    // localStorage.setItem("liste", JSON.stringify(filtered));
    // this.datas = filtered;
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
  height: 200px;
  margin: 1rem;
  background-color: var(--background-color-secondary);
  display: flex;
  align-items: center;
  justify-content: center;
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
  height: 90%;
}
img {
  width: 150px;
  height: 100px;
  object-fit: fill;
}
</style>
