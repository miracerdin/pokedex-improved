import LoginView from "@/views/LoginView.vue";
import i18n from "@/i18n";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueI18n from "vue-i18n";

const localVue = createLocalVue();
localVue.use(VueI18n);
describe("LoginView.vue", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(LoginView, {
      localVue,
      i18n,
    });
    expect(wrapper.find(".container").exists()).toBe(true);
  });

  it("button trigger", async () => {
    const wrapper = shallowMount(LoginView, {
      localVue,
      i18n,
    });
    const input = wrapper.find("input");
    if (input) {
      const button = wrapper.find("button");
      await button.trigger("click");
      wrapper.vm.$nextTick();
      expect(input.text().length).toBe(0);
    }
  });
  it("button trigger when inputs empty", async () => {
    const wrapper = shallowMount(LoginView, {
      localVue,
      i18n,
    });
    const input = wrapper.find("input");
    if (!input) {
      const button = wrapper.find("button");
      await button.trigger("click");
      wrapper.vm.$nextTick();
      expect(window.alert).toBeCalled();
    }
  });
});
