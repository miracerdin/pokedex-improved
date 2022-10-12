<template>
  <div class="home">
    <div v-if="!datalist">Loading..</div>
    <div class="col">
      <div class="col-item1">
        <span>{{ $t("Filter") }}:</span>
        <select
          name="filter"
          id="filter"
          @change="onChange($event)"
          v-model="filterDetail"
        >
          <option value="species">{{ $t("Species") }}</option>
          <option value="moves">{{ $t("Moves") }}</option>
        </select>
      </div>
      <div class="col-item2">
        <input
          type="text"
          v-model="search"
          :placeholder="$t('Search').toString()"
        />
      </div>
      <div class="col-item3">
        <div class="filterDiv filterDiv1">
          <span>{{ $t("Height") }}:</span
          ><select
            name="height"
            id="height"
            @change="onChange($event)"
            v-model="sorted"
          >
            <option value="">{{ $t("Not sorted") }}</option>

            <option value="h1-9">1-9</option>
            <option value="h9-1">9-1</option>
          </select>
        </div>
        <div class="filterDiv filterDiv2">
          <span>{{ $t("Weight") }}:</span
          ><select
            name="weight"
            id="weight"
            @change="onChange($event)"
            v-model="sorted"
          >
            <option value="">{{ $t("Not sorted") }}</option>

            <option value="w1-9">1-9</option>
            <option value="w9-1">9-1</option>
          </select>
        </div>

        <div class="filterDiv filterDiv3">
          <span>{{ $t("Name") }}:</span
          ><select
            name="fornames"
            id="fornames"
            @change="onChange($event)"
            v-model="sorted"
          >
            <option value="">{{ $t("Not sorted") }}</option>

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
import DrawerComponent from "@/components/DrawerComponent.vue";
import InfiniteScroll from "@/components/InfiniteScroll.vue";
import PokemonModule from "@/store/Pokemon";
import axios from "axios";

@Component({
  components: {
    InfiniteScroll,
    DrawerComponent,
  },
})
export default class HomeView extends Vue {
  search = "";
  datalist: Array<string | object> = [];
  articles: {
    name: string;
    height: number;
    weight: number;
    moves: { move: { name: string } }[];
  }[] = [];
  favorites = [];
  offset = 20;
  allData: {
    name: string;
    height: number;
    weight: number;
    moves: { move: { name: string } }[];
    species?: { name: string };
  }[] = [];
  lastpokemon = 20;
  filterDetail = "";
  sorted = "";
  visible = PokemonModule.GetDrawer;

  async created() {
    this.fetch(0);
    console.log(this.allData.length);
    if (PokemonModule.GetAllData.length === 0) {
      PokemonModule.SetDatas(this.filteredList);
      for (let i = 1; i <= 100; i++) {
        await axios
          .get(`https://pokeapi.co/api/v2/pokemon/${i}`)
          .then((response) => {
            return PokemonModule.SET_ALLDATA(response.data);
          });
      }
      console.log("finish");
    }
  }

  computed() {
    PokemonModule.GetDrawer;
  }
  async fetch(offset: number) {
    if (this.lastpokemon >= 1200) {
      return;
    }

    await axios
      .get(`https://pokeapi.co/api/v2/pokemon/?offset=${offset}&limit=20`)
      .then((response) => {
        for (let i of response.data.results) {
          axios.get(i.url).then((response) => {
            this.articles.push(response.data);
          });
        }
      })
      .catch((error) => console.log(error));
    this.lastpokemon += 20;
  }
  async onChange(event: Event) {
    this.filterDetail = (event.target as HTMLSelectElement).value;
    console.log(this.filterDetail);
  }

  get filteredList() {
    if (!this.search && !this.filterDetail && !this.sorted) {
      return this.articles;
    } else if (!this.filterDetail && this.search && !this.sorted) {
      return PokemonModule.GetAllData.filter((post) => {
        return post.name.includes(this.search.toString().toLowerCase());
      });
    }
    if (this.sorted === "h1-9" && this.search) {
      let filtered = PokemonModule.GetAllData.filter((post) => {
        return post.name.includes(this.search.toString().toLowerCase());
      });
      return filtered.sort((a: { height: number }, b: { height: number }) => {
        return a.height - b.height;
      });
    } else if (this.sorted === "h1-9") {
      return PokemonModule.GetAllData.sort(
        (a: { height: number }, b: { height: number }) => {
          return a.height - b.height;
        }
      );
    }
    if (this.sorted === "h9-1" && this.search) {
      let filtered = PokemonModule.GetAllData.filter((post) => {
        return post.name.includes(this.search.toString().toLowerCase());
      });
      return filtered.sort((a: { height: number }, b: { height: number }) => {
        return b.height - a.height;
      });
    } else if (this.sorted === "h9-1") {
      return PokemonModule.GetAllData.sort(
        (a: { height: number }, b: { height: number }) => {
          return b.height - a.height;
        }
      );
    }
    if (this.sorted === "w1-9" && this.search) {
      let filtered = PokemonModule.GetAllData.filter((post) => {
        return post.name.includes(this.search.toString().toLowerCase());
      });
      console.log(filtered);
      return filtered.sort((a: { weight: number }, b: { weight: number }) => {
        return a.weight - b.weight;
      });
    } else if (this.sorted === "w1-9") {
      return PokemonModule.GetAllData.sort(
        (a: { weight: number }, b: { weight: number }) => {
          return a.weight - b.weight;
        }
      );
    }
    if (this.sorted === "w9-1" && this.search) {
      let filtered = PokemonModule.GetAllData.filter((post) => {
        return post.name.includes(this.search.toString().toLowerCase());
      });
      return filtered.sort((a: { weight: number }, b: { weight: number }) => {
        return b.weight - a.weight;
      });
    } else if (this.sorted === "w9-1") {
      return PokemonModule.GetAllData.sort(
        (a: { weight: number }, b: { weight: number }) => {
          return b.weight - a.weight;
        }
      );
    }
    if (this.sorted === "a-z" && this.search) {
      let filtered = PokemonModule.GetAllData.filter((post) => {
        return post.name.includes(this.search.toString().toLowerCase());
      });
      return filtered.sort((a: { name: string }, b: { name: string }) => {
        return a.name.localeCompare(b.name);
      });
    } else if (this.sorted === "a-z") {
      return PokemonModule.GetAllData.sort(
        (a: { name: string }, b: { name: string }) => {
          return a.name.localeCompare(b.name);
        }
      );
    }
    if (this.sorted === "z-a" && this.search) {
      let filtered = PokemonModule.GetAllData.filter((post) => {
        return post.name.includes(this.search.toString().toLowerCase());
      });
      return filtered.sort((a: { name: string }, b: { name: string }) => {
        return b.name.localeCompare(a.name);
      });
    } else if (this.sorted === "z-a") {
      return PokemonModule.GetAllData.sort(
        (a: { name: string }, b: { name: string }) => {
          return b.name.localeCompare(a.name);
        }
      );
    }
    if (this.filterDetail === "moves" && this.search) {
      return PokemonModule.GetAllData.filter((post) => {
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
      return PokemonModule.GetAllData.filter((item) => {
        if (item.species) return item.species.name.includes(this.search);
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
.drawerComp {
  position: absolute;
  width: 50%;
  height: 100vh;
  top: 0;
  right: -100%;
  transition: all 0.5s ease;
}
.drawerCompVisible {
  position: relative;
  right: 0;
}
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
