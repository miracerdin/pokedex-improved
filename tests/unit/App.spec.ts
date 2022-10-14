import {
  createLocalVue,
  mount,
  RouterLinkStub,
  shallowMount,
} from "@vue/test-utils";
import App from "../../src/App.vue";
import VueRouter from "vue-router";
import i18n from "@/i18n";
import VueI18n from "vue-i18n";

const localVue = createLocalVue();
localVue.use(VueI18n, VueRouter);

describe("App.vue", () => {
  it("should mount page", () => {
    const wrapper = shallowMount(App, {
      localVue,
      i18n,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe("/en");

    // expect(wrapper.exists()).toBe(true);
  });
  // it("should mount root div", () => {
  //   expect(wrapper.get("#app").exists()).toBe(true);
  // });
  // it("should mount home all routes", () => {
  //   expect(wrapper.text()).toContain("Home");
  //   expect(wrapper.text()).toContain("FavoritesPage");
  // });
});
