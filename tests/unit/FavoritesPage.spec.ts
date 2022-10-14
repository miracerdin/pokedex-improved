import FavoritesPage from "@/views/FavoritesPage.vue";

import i18n from "@/i18n";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueI18n from "vue-i18n";

const localVue = createLocalVue();
localVue.use(VueI18n);

describe("FavoritesPage", () => {
  test("render the component", () => {
    const wrapper = shallowMount(FavoritesPage, {
      localVue,
      i18n,
    });
    expect(wrapper.find(".favoritePage").exists()).toBe(true);
  });
});
