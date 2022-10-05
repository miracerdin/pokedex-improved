import store from "@/store";
import axios from "axios";

import {
  Module,
  VuexModule,
  Mutation,
  Action,
  getModule,
} from "vuex-module-decorators";

@Module({ name: "Pokemon", dynamic: true, store })
class Pokemon extends VuexModule {
  favorites: [data: object] = [{}];
  liste: [data: string] = [""];
  datas: object = [];
  darkMode = false;
  // fetchDatas = [];
  get GetDataList() {
    return this.favorites;
  }

  get GetListe() {
    return this.liste;
  }
  get GetDatas() {
    return this.datas;
  }
  // get GetFetchDatas() {
  //   return this.fetchDatas;
  // }

  // @Mutation
  // FETCH_ALLDATAS(fetch: []) {
  //   return (this.fetchDatas = fetch);
  // }
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
