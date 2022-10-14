import LanguageSwitcher from "@/components/LanguageSwitcher.vue";
import { shallowMount } from "@vue/test-utils";

describe("LanguageSwitcher", () => {
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
  it("when the page landed there should be an empty array with liste key", () => {
    setLocalStorage("lang", "en");
    expect(window.localStorage.getItem("lang")).toBe('"en"');
  });
  test("renders the header component", () => {
    const wrapper = shallowMount(LanguageSwitcher);
    expect(wrapper.find(".container").exists()).toBe(true);
  });
  it("check if the language has changed", async () => {
    const wrapper = shallowMount(LanguageSwitcher, {
      data() {
        return {
          lang: "en",
        };
      },
    });
    const options = wrapper.find("select").findAll("option");
    await options.at(1).setSelected();
    expect(wrapper.find("option:checked").element.textContent).toBe("Turkish");
  });
});
