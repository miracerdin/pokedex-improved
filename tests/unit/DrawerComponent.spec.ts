import DrawerComponent from "@/components/DrawerComponent.vue";
import i18n from "@/i18n";
import MockData from "@/mocks";
import { BASE_URL, fetchPokemon } from "@/services";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import axios from "axios";
import VueI18n from "vue-i18n";

const localVue = createLocalVue();
localVue.use(VueI18n);
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

beforeEach(async () => {
  const message = "Network error";
  mockedAxios.get.mockRejectedValueOnce(new Error(message));
});
describe("DrawerComponent", () => {
  it("renders the component", () => {
    const wrapper = shallowMount(DrawerComponent, {
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

    shallowMount(DrawerComponent, {
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

  it("emit test", async () => {
    const wrapper = shallowMount(DrawerComponent);
    wrapper.vm.$emit("closeDrawer", false);
    await wrapper.vm.$nextTick();
    expect(wrapper.emitted().closeDrawer).toEqual([[false]]);
  });
});
