import ModalComponent from "@/components/ModalComponent.vue";
import i18n from "@/i18n";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import axios from "axios";
import VueI18n from "vue-i18n";
import MockData from "@/mocks";
import { BASE_URL, fetchPokemon } from "@/services";

const localVue = createLocalVue();
localVue.use(VueI18n);

jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

declare let global: any;
const mockFetch = () => {
  global.fetch = jest
    .fn()
    .mockImplementation(() =>
      Promise.resolve({ json: () => Promise.resolve([]) })
    );
};
beforeEach(async () => {
  const message = "Network error";
  mockedAxios.get.mockRejectedValueOnce(new Error(message));
});
describe("ModalComponent", () => {
  mockFetch();
  it("renders the component", () => {
    const wrapper = shallowMount(ModalComponent, {
      localVue,
      i18n,
    });
    expect(wrapper.find(".cover").exists()).toBe(true);
  });

  it("if api call fails", async () => {
    const results = await fetchPokemon(2);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/2`);
    expect(results).toEqual([]);
  });
  it("should return pokemon", async () => {
    mockedAxios.get.mockResolvedValueOnce({ data: { ...MockData } });

    shallowMount(ModalComponent, {
      localVue,
      i18n,
      propsData: {
        id: 1,
      },
    });
    const results = await fetchPokemon(1);
    expect(axios.get).toHaveBeenCalledWith(`${BASE_URL}/1`);
    expect(results).toEqual({ data: { ...MockData } });
  });
});
