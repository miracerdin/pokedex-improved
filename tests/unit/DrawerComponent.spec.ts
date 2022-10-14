import DrawerComponent from "@/components/DrawerComponent.vue";
import i18n from "@/i18n";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueI18n from "vue-i18n";

const localVue = createLocalVue();
localVue.use(VueI18n);
describe("DrawerComponent", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(DrawerComponent, {
      localVue,
      i18n,
    });
    expect(wrapper.find(".cover").exists()).toBe(true);
  });
});
