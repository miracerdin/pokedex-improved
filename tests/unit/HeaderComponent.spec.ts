import HeaderComponent from "@/components/HeaderComponent.vue";
import { shallowMount } from "@vue/test-utils";

describe("HeaderComponent", () => {
  test("renders the header component", () => {
    const wrapper = shallowMount(HeaderComponent);
    expect(wrapper.find(".container").exists()).toBe(true);
  });
  test("button is there", () => {
    const wrapper = shallowMount(HeaderComponent, {
      propsData: {
        loggedIn: false,
      },
    });
    expect(wrapper.find(".btn").exists()).toBeFalsy();
  });
});
