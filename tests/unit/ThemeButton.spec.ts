import ThemeButton from "@/components/ThemeButton.vue";
import { shallowMount } from "@vue/test-utils";

describe("ThemeButton", () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: jest.fn(), // Deprecated
      removeListener: jest.fn(), // Deprecated
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });
  test("renders the themebutton component", () => {
    const wrapper = shallowMount(ThemeButton);
    expect(wrapper.find(".container").exists()).toBe(true);
  });
});
