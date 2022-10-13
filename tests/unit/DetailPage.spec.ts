import DetailPage from "@/components/DetailPage.vue";
import i18n from "@/i18n";
import MockData from "@/mocks";
import { createLocalVue, shallowMount, mount } from "@vue/test-utils";
import axios from "axios";
import VueI18n from "vue-i18n";
import {
  getPokemonWithId,
  fetchPokemon,
  BASE_URL,
} from "../../src/services/index";

declare let global: any;

const mockFetch = () => {
  global.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve([]) })
    );
};

const localVue = createLocalVue();
localVue.use(VueI18n);

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(async () => {
  const message = "Network error";
  mockedAxios.get.mockRejectedValueOnce(new Error(message));
  mockedAxios.get.mockResolvedValueOnce({ data: { ...MockData } });
});

describe("DetailPage", () => {
  mockFetch();

  it("should return pokemon", async () => {
    const results = await fetchPokemon(1);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/1`);
    expect(results).toEqual({ data: { ...MockData } });
  });
  it("if api call fails", async () => {
    const results = await fetchPokemon(1);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/1`);
    expect(results).toEqual([]);
  });
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
