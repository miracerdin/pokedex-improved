import ChooseFavorite from "@/components/ChooseFavorite.vue";
import i18n from "@/i18n";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueI18n from "vue-i18n";

const localVue = createLocalVue();
localVue.use(VueI18n);
describe("ChooseFavorite.vue", () => {
  it("it renders the component", () => {
    const wrapper = shallowMount(ChooseFavorite, {
      localVue,
      i18n,
      propsData: {
        id: 1,
      },
    });
    expect(wrapper.find(".container").exists()).toBe(true);
  });
});
