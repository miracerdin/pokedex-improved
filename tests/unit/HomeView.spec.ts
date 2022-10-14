import { shallowMount, createLocalVue } from "@vue/test-utils";
import Vuex from "vuex";
import HomeView from "@/views/HomeView.vue";
import PokemonStore from "@/store/Pokemon";
import VueI18n from "vue-i18n";
import i18n from "@/i18n";

const localVue = createLocalVue();
localVue.use(Vuex, VueI18n);
jest.mock("../../src/store/Pokemon");

// const mockStore = (drawer: boolean) => {
//   PokemonStore.drawer = drawer;
// };

describe("HomeView.vue", () => {
  test("is renders HomeView component", () => {
    const wrapper = shallowMount(HomeView, { localVue, i18n });
    expect(wrapper.find(".home").exists()).toBe(true);
  });

  it("first select tag", async () => {
    const wrapper = shallowMount(HomeView, { localVue, i18n });
    const select = wrapper.find("select").findAll("option");
    await select.at(1).setSelected();
    expect(wrapper.find("option:checked").element.innerHTML).toBe("Moves");
  });

  it("height select tag", async () => {
    const wrapper = shallowMount(HomeView, { localVue, i18n });
    const select = wrapper.find("#height").findAll("option");
    await select.at(0).setSelected();
    expect(wrapper.find("option:checked").element.innerHTML).toBe("Not sorted");
  });
});
