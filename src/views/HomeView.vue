<template>
  <div class="home">
    <div v-if="!datalist">Loading..</div>
    <div class="col">
      <select
        name="filter"
        id="filter"
        @change="onChange($event)"
        v-model="filterDetail"
      >
        <!-- <option value="name">Name</option>
        <option value="height">Height</option>
        <option value="weight">Weight</option>
        <option value="types">Types</option> -->
        <option value="species">Species</option>
        <option value="moves">Moves</option>
      </select>
      <input type="text" v-model="search" placeholder="Search" />
      <div class="filterDiv">
        <span>Height</span
        ><select
          name="height"
          id="height"
          @change="onChange($event)"
          v-model="filterDetail"
        >
          <option value="h1-9">1-9</option>
          <option value="h9-1">9-1</option>
        </select>
      </div>
      <div class="filterDiv">
        <span>Weight:</span
        ><select
          name="weight"
          id="weight"
          @change="onChange($event)"
          v-model="filterDetail"
        >
          <option value="w1-9">1-9</option>
          <option value="w9-1">9-1</option>
        </select>
      </div>
      <div class="filterDiv">
        <span>Types:</span
        ><select
          name="types"
          id="types"
          @change="onChange($event)"
          v-model="filterDetail"
        >
          <option value="a-z">a-z</option>
          <option value="z-a">z-a</option>
        </select>
      </div>
    </div>
    <div class="cover">
      <div>
        <InfiniteScroll :articles="filteredList" @refetch="fetch">
        </InfiniteScroll>
      </div>
    </div>

    <div class="item error" v-if="search && !filteredList.length">
      <p>No results found!</p>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import OnePokemon from "./OnePokemon.vue";
// import { Action, Getter } from "vuex-class";
// import DetailPage from "./DetailPage.vue";
import { DetailPokemon } from "../types/index";
import InfiniteScroll from "@/components/InfiniteScroll.vue";
import { db } from "../store/db";
import PokemonModule from "@/store/Pokemon";
import axios from "axios";

@Component({
  components: {
    // OnePokemon,
    InfiniteScroll,
  },
})
export default class HomeView extends Vue {
  search = "";
  datalist: Array<string | object> = [];
  articles: any = [];
  favorites = [];
  offset = 20;
  lastpokemon = 20;
  filterDetail = "";
  height = "";
  weight = "";
  types = "";

  // firestore:{
  //   favorites:db.collection("favorites")
  // }
  created() {
    PokemonModule.SetDatas(this.filteredList);
  }
  async fetch(offset: number) {
    if (this.lastpokemon >= 1200) {
      return;
    }
    let articles = await axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`)
      .then((response) => {
        // console.log("response", response.data.results);
        for (let i of response.data.results) {
          let datas = axios.get(i.url).then((response) => {
            // console.log("response", response.data);
            this.articles.push(response.data);
          });
        }
      })
      .catch((error) => console.log(error));
    this.lastpokemon += 20;
    // console.log("articles", this.articles);
  }
  // async fetchAll() {
  //   try {
  //     const response = await axios
  //       .get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1154")
  //       .then((data) => PokemonModule.FETCH_ALLDATAS(data.data.resulst));
  //   } catch (error) {
  //     console.log(error);
  //   }
  // }
  async onChange(event: any) {
    this.filterDetail = event.target.value;
    console.log(this.filterDetail);
  }
  // this.$store.dispatch("fetchPokemon");
  // }
  async mounted() {
    this.fetch(0);
    console.log("filter", this.filterDetail);
    // this.datalist = this.$store.getters.allDataList;
    let local = JSON.parse(localStorage.getItem("liste") as string) as [];
    if (!local || local.length === 0) {
      localStorage.setItem("liste", JSON.stringify([]));
    }
  }

  get filteredList() {
    if (!this.search && !this.filterDetail) {
      return this.articles;
    } else if (!this.filterDetail && this.search) {
      return this.articles.filter((post: any) => {
        return post.name.includes(this.search.toString().toLowerCase());
      });
    } else if (this.filterDetail === "h1-9") {
      return this.articles.sort((a: any, b: any) => {
        return a.height - b.height;
      });
    } else if (this.filterDetail === "w1-9") {
      return this.articles.sort((a: any, b: any) => {
        return a.weight - b.weight;
      });
    }
    // else if (this.filterDetail === "height" && this.search) {
    //   return this.articles.filter((item: any) => {
    //     return item.weight.toString().startsWith(this.search);
    //   });
    // } else if (this.filterDetail === "name" && this.search) {
    //   return this.articles.filter((post: any) => {
    //     return post.name.includes(this.search.toString().toLowerCase());
    //   });
    // }
    else if (this.filterDetail === "a-z") {
      return this.articles.filter((post: any) => {
        for (const i in post.types) {
          return post.types[i].type.name.includes(
            this.search.toString().toLowerCase()
          );
        }
      });
    } else if (this.filterDetail === "moves" && this.search) {
      return this.articles.filter((post: any) => {
        for (const i in post.moves) {
          return post.moves[i].move.name.includes(
            this.search.toString().toLowerCase()
          );
        }
      });
    } else if (this.filterDetail === "species" && this.search) {
      return this.articles.filter((item: any) => {
        console.log(item);
        return item.species.name.includes(this.search);
      });
    } else {
      return this.articles.filter((post: any) => {
        console.log(typeof post.this.filterDetail);
        return post.this.filterDetail.includes(this.search.toLowerCase());
      });
    }
  }
}
</script>
<style scoped>
.cover {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
.item {
  text-align: center;
}
.col {
  width: 100%;

  margin: auto;
}
input {
  width: 40%;
  height: 2rem;
  margin: auto;
  font-size: 1.5rem;
}
#filter {
  height: 3rem;
  margin-right: 1rem;
  font-size: 1.2rem;
}
.filterDiv {
  display: inline-block;
}
</style>
