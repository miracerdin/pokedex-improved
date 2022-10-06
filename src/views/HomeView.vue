<template>
  <div class="home">
    <div v-if="!datalist">Loading..</div>
    <div class="col">
      <div class="col-item1">
        <span>Filter:</span>
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
      </div>
      <div class="col-item2">
        <input type="text" v-model="search" placeholder="Search" />
      </div>
      <div class="col-item3">
        <div class="filterDiv filterDiv1">
          <span>Height</span
          ><select
            name="height"
            id="height"
            @change="onChange($event)"
            v-model="sorted"
          >
            <option value="">Not sorted</option>

            <option value="h1-9">1-9</option>
            <option value="h9-1">9-1</option>
          </select>
        </div>
        <div class="filterDiv filterDiv2">
          <span>Weight:</span
          ><select
            name="weight"
            id="weight"
            @change="onChange($event)"
            v-model="sorted"
          >
            <option value="">Not sorted</option>

            <option value="w1-9">1-9</option>
            <option value="w9-1">9-1</option>
          </select>
        </div>

        <div class="filterDiv filterDiv3">
          <span>Names:</span
          ><select
            name="fornames"
            id="fornames"
            @change="onChange($event)"
            v-model="sorted"
          >
            <option value="">Not sorted</option>

            <option value="a-z">a-z</option>
            <option value="z-a">z-a</option>
          </select>
        </div>
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
import { filter } from "vue/types/umd";

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
  sorted = "";

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
    if (!this.search && !this.filterDetail && !this.sorted) {
      return this.articles;
    } else if (!this.filterDetail && this.search && !this.sorted) {
      return this.articles.filter((post: any) => {
        return post.name.includes(this.search.toString().toLowerCase());
      });
    }
    if (this.sorted === "h1-9" && this.search) {
      let filtered = this.articles.filter((post: any) => {
        return post.name.includes(this.search.toString().toLowerCase());
      });
      return filtered.sort((a: any, b: any) => {
        return a.height - b.height;
      });
    } else if (this.sorted === "h1-9") {
      return this.articles.sort((a: any, b: any) => {
        return a.height - b.height;
      });
    }
    if (this.sorted === "h9-1" && this.search) {
      let filtered = this.articles.filter((post: any) => {
        return post.name.includes(this.search.toString().toLowerCase());
      });
      return filtered.sort((a: any, b: any) => {
        return b.height - a.height;
      });
    } else if (this.sorted === "h9-1") {
      return this.articles.sort((a: any, b: any) => {
        return b.height - a.height;
      });
    }
    if (this.sorted === "w1-9" && this.search) {
      let filtered = this.articles.filter((post: any) => {
        return post.name.includes(this.search.toString().toLowerCase());
      });
      return filtered.sort((a: any, b: any) => {
        return a.weight - b.weight;
      });
    } else if (this.sorted === "w1-9") {
      return this.articles.sort((a: any, b: any) => {
        return a.weight - b.weight;
      });
    }
    if (this.sorted === "w9-1" && this.search) {
      let filtered = this.articles.filter((post: any) => {
        return post.name.includes(this.search.toString().toLowerCase());
      });
      return filtered.sort((a: any, b: any) => {
        return b.weight - a.weight;
      });
    } else if (this.sorted === "w9-1") {
      return this.articles.sort((a: any, b: any) => {
        return b.weight - a.weight;
      });
    }
    if (this.sorted === "a-z" && this.search) {
      let filtered = this.articles.filter((post: any) => {
        return post.name.includes(this.search.toString().toLowerCase());
      });
      return filtered.sort((a: any, b: any) => {
        return a.name.localeCompare(b.name);
      });
    } else if (this.sorted === "a-z") {
      return this.articles.sort((a: any, b: any) => {
        return a.name.localeCompare(b.name);
      });
    }
    if (this.sorted === "z-a" && this.search) {
      let filtered = this.articles.filter((post: any) => {
        return post.name.includes(this.search.toString().toLowerCase());
      });
      return filtered.sort((a: any, b: any) => {
        return b.name.localeCompare(a.name);
      });
    } else if (this.sorted === "z-a") {
      return this.articles.sort((a: any, b: any) => {
        return b.name.localeCompare(a.name);
      });
    }
    if (this.filterDetail === "moves" && this.search) {
      return this.articles.filter((post: any) => {
        for (const i in post.moves) {
          return post.moves[i].move.name.includes(
            this.search.toString().toLowerCase()
          );
        }
      });
    } else if (this.filterDetail === "moves" && !this.search) {
      return this.articles;
    }
    if (this.filterDetail === "species" && this.search) {
      return this.articles.filter((item: any) => {
        console.log(item);
        return item.species.name.includes(this.search);
      });
    }
    if (this.filterDetail === "species" && !this.search) {
      return this.articles;
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
  display: grid;
  grid-template-columns: 1fr 3fr 1fr;
  grid-template-areas: "col-item1  col-item2  col-item3 ";
  width: 100%;
  margin: auto;
}
.col-item1 {
  grid-area: col-item1;
  align-self: end;
}
.col-item2 {
  /* display: grid; */
  align-self: center;
  grid-area: col-item2;
}
.col-item3 {
  margin-left: 1rem;
  display: grid;
  grid-area: col-item3;

  grid-template-areas: "filterDiv1  filterDiv2  filterDiv3 ";
}
input {
  width: 100%;
  height: 2rem;
  margin: auto;
  font-size: 1.5rem;
  margin-top: 0.7rem;
}
select {
  height: 2rem;
  margin-right: 1rem;
  font-size: 1.2rem;
}
.filterDiv1 {
  grid-area: filterDiv1;
  /* height: 2rem;
  margin-right: 1rem;
  font-size: 1.2rem; */
  align-self: center;
}
.filterDiv2 {
  grid-area: filterDiv2;
  align-self: center;
}
.filterDiv3 {
  grid-area: filterDiv3;
  align-self: center;
}
@media (max-width: 2100px) {
  .col {
    display: grid;

    grid-template-areas:
      "col-item1 col-item2"
      "col-item3 col-item3";
    grid-template-columns: 1fr 4fr;
    grid-template-rows: 1fr 1fr;
  }
  .col-item1 {
    grid-area: col-item1;
    justify-self: center;
  }
  .col-item2 {
    grid-area: col-item2;
    justify-self: start;
    width: 80%;
    margin-bottom: 1rem;
  }
  .col-item3 {
    width: 100%;
  }
  .filterDiv1 {
    justify-self: end;
  }
  .filterDiv3 {
    justify-self: start;
  }
  .col-item1 {
    grid-area: col-item1;
    align-self: center;
  }
}
@media (max-width: 761px) {
  .col-item1 {
    grid-area: col-item1;
    align-self: start;
  }
}
</style>
