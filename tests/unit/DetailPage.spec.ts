import DetailPage from "@/components/DetailPage.vue";
import i18n from "@/i18n";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import VueI18n from "vue-i18n";

const localVue = createLocalVue();
localVue.use(VueI18n);
describe("DetailPage", () => {
  it("it renders the component", () => {
    const wrapper = shallowMount(DetailPage, {
      localVue,
      i18n,
    });
    expect(wrapper.find(".cover").exists()).toBe(true);
  });
  it("it renders h3", () => {
    const wrapper = mount(DetailPage, {
      localVue,
      i18n,
    });
    expect(wrapper.find("h3").exists()).toBe(true);
  });
  it("total p number", () => {
    const wrapper = mount(DetailPage, {
      localVue,
      i18n,
    });
    expect(wrapper.findAll("p").length).toBe(3);
  });
  it("should mount on a page", () => {
    const wrapper = mount(DetailPage, {
      localVue,
      i18n,
      mocks: {
        $route: {
          params: {
            id: 1,
          },
        },
      },
    });
    expect(wrapper.exists()).toBe(true);
  });
});
