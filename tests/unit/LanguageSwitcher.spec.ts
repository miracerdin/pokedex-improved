import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { shallowMount } from "@vue/test-utils";

describe("LanguageSwitcher", () => {
  test("renders the header component", () => {
    const wrapper = shallowMount(LanguageSwitcher);
    expect(wrapper.find(".container").exists()).toBe(true);
  });
});
