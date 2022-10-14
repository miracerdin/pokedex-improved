import ThemeButton from "@/components/ThemeButton.vue";
import { shallowMount } from "@vue/test-utils";

describe("ThemeButton", () => {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: jest.fn().mockImplementation((query) => ({
      matches: false,
      media: query,
      onchange: null,
      addEventListener: jest.fn(),
      removeEventListener: jest.fn(),
      dispatchEvent: jest.fn(),
    })),
  });

  beforeEach(() => {
    window.localStorage.clear();
  });

  const localStorageMock = (function () {
    interface Local {
      [key: string]: string; // key ve value ya type vermem gerekiyordu and i used an interface [key:string] and value :string. if value was a number type [key:string]:number would be.
    }

    let store: Local = {};

    return {
      getItem(key: string) {
        return store[key];
      },

      setItem(key: string, value: string) {
        store[key] = value;
      },

      clear() {
        store = {};
      },

      removeItem(key: string) {
        delete store[key];
      },

      getAll() {
        return store;
      },
    };
  })();
  Object.defineProperty(window, "localStorage", { value: localStorageMock });

  const setLocalStorage = (id: string, data: string) => {
    window.localStorage.setItem(id, JSON.stringify(data));
  };
  it("when the page landed there should be an user-theme key and a value", () => {
    setLocalStorage("user-theme", "light-theme");
    expect(window.localStorage.getItem("user-theme")).toBe('"light-theme"');
  });

  test("renders the themebutton component", () => {
    const wrapper = shallowMount(ThemeButton);
    expect(wrapper.find(".container").exists()).toBe(true);
  });
  it("should toggle button works", async () => {
    const wrapper = shallowMount(ThemeButton, {
      data() {
        return {
          userTheme: "light-theme",
        };
      },
    });
    const local = localStorage.getItem("user-theme");
    const theme = wrapper.find("#checkbox");
    await theme.setChecked();
    wrapper.vm.$forceUpdate();
    if (local === "dark-theme") {
      expect(wrapper.find("#checkbox").classes()).toContain("selected");
    }
  });
});
