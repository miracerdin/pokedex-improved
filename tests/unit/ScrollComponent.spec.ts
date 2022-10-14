import ScrollComponent from "@/components/ScrollComponent.vue";
import { shallowMount } from "@vue/test-utils";

describe("ScrollComponent", () => {
  test("renders the header component", () => {
    const wrapper = shallowMount(ScrollComponent, {
      propsData: {
        articles: [{ id: 1, name: "scroll", url: "" }],
      },
    });
    expect(wrapper.find(".container").exists()).toBe(true);
  });
});
