import store from "@/store";
import { FavoriteTypes } from "@/types";
import axios from "axios";

import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";
export interface AllDataTypes {
  name: string;
  height: number;
  weight: number;
  moves: { move: { name: string } }[];
  species: { name: string };
  sprites: { other: { dream_world: { front_default: string } } };
  abilities: [{ ability: { name: string } }, { ability: { name: string } }];
}
@Module({ name: "Pokemon", dynamic: true, store })
class Pokemon extends VuexModule {
  favorites: [data: object] = [{}];
  liste: [data: string] = [""];
  datas: object = [];
  darkMode = false;
  url = "https://pokeapi.co/api/v2/pokemon/";
  allUrl = "https://pokeapi.co/api/v2/pokemon/?offset=0&limit=700";
  drawer = true;
  filteredList: {
    name?: string;
    id?: string;
    sprites?: string;
    uid?: string;
    groupName?: string;
  }[] = [];
  changeNameFilter = false;
  allData: {
    name: string;
    height: number;
    weight: number;
    moves: { move: { name: string } }[];
    species?: { name: string };
  }[] = [];

  get GetAllData() {
    return this.allData;
  }

  get GetFilteredList() {
    return this.filteredList;
  }

  get GetChangeNameFilter() {
    return this.changeNameFilter;
  }

  get GetDataList() {
    return this.favorites;
  }

  get GetListe() {
    return this.liste;
  }
  get GetDatas() {
    return this.datas;
  }
  get GetUrl() {
    return this.url;
  }

  get GetDrawer() {
    return this.drawer;
  }

  @Mutation
  async SET_ALLDATA(alldata: AllDataTypes) {
    this.allData.push(alldata);
  }

  @Mutation
  SET_CHANGENAMEFİLTER() {
    this.changeNameFilter = !this.changeNameFilter;
  }

  @Mutation
  SET_FİLTEREDLİST(
    filtre: {
      id?: string;
      name?: string;
      sprites?: string;
      uid?: string;
      groupName?: string;
    }[]
  ) {
    this.filteredList = filtre;
  }

  @Mutation
  SET_DRAWER() {
    this.drawer = !this.drawer;
    console.log(this.drawer);
  }

  @Mutation
  SET_DARK() {
    this.darkMode = !this.darkMode;
  }

  @Mutation
  SET_TITLE(data: object) {
    if (this.favorites.includes(data)) return;
    this.favorites.push(data);
  }
  @Mutation
  SET_LİSTE(data: string) {
    this.liste.push(data);
  }

  @Mutation
  SET_DATAS(datas: object) {
    this.datas = datas;
  }
  @Action
  SetDatas(datas: object) {
    this.SET_DATAS(datas);
  }

  @Action
  SetTitle(data: object) {
    this.SET_TITLE(data);
  }
}
export default getModule(Pokemon);
