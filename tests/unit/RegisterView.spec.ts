import RegisterView from "@/views/RegisterView.vue";
import i18n from "@/i18n";
import {
  shallowMount,
  createLocalVue,
  mount,
  RouterLinkStub,
} from "@vue/test-utils";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";

const localVue = createLocalVue();

localVue.use(VueI18n, VueRouter);
describe("RegisterView", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(RegisterView, {
      localVue,
      i18n,
    });
    expect(wrapper.find(".container").exists()).toBe(true);
  });

  it("button trigger", async () => {
    const wrapper = shallowMount(RegisterView, {
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
    const wrapper = shallowMount(RegisterView, {
      localVue,
      i18n,
    });
    const input = wrapper.find("input");
    if (!input) {
      const button = wrapper.find("button");
      await button.trigger("click");
      wrapper.vm.$nextTick();
      const alertMessage = wrapper.find("alert");
      expect(alertMessage.text()).toBe("Fill all the sections");
    }
  });
});
