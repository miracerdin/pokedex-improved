import LoginView from "@/views/LoginView.vue";
import i18n from "@/i18n";
import {
  shallowMount,
  createLocalVue,
  mount,
  RouterLinkStub,
} from "@vue/test-utils";
import VueI18n from "vue-i18n";
import VueRouter from "vue-router";
import Vue from "vue";

const localVue = createLocalVue();
// const routerVue = createLocalVue();
localVue.use(VueI18n, VueRouter);
// routerVue.use(VueRouter);
// const router = new VueRouter();

// Vue.use(VueRouter);

describe("LoginView.vue", () => {
  //   beforeEach(() => {
  //     const wrapper = shallowMount(LoginView, { router });
  //   });
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

  it("renders a child component via routing", async () => {
    const wrapper = shallowMount(LoginView, {
      localVue,
      i18n,
      stubs: {
        RouterLink: RouterLinkStub,
      },
    });
    expect(wrapper.findComponent(RouterLinkStub).props().to).toBe(
      "/en/RegisterView"
    );
  });
});
