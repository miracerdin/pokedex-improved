import EachPokemon from "@/components/EachPokemon.vue";
import i18n from "@/i18n";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueI18n from "vue-i18n";

const localVue = createLocalVue();
localVue.use(VueI18n);
const wrapper = shallowMount(EachPokemon, {
  localVue,
  i18n,
  propsData: {
    item: {
      name: "GOLEM",
      sprites: {
        other: {
          dream_world: {
            front_default:
              "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/15.svg",
          },
        },
      },
      abilities: [
        { ability: { name: "keen-eye" } },
        { ability: { name: "tangled-feet" } },
      ],
    },
  },
  data() {
    return {
      modalOpen: false,
      isOpen: false,
      isActive: false,
    };
  },
});
describe("EachPokemon", () => {
  test("renders the component", () => {
    expect(wrapper.find(".flip-card").exists()).toBe(true);
  });
  it("should call modal function", async () => {
    await wrapper.findAll(".spans span").trigger("click");
    wrapper.vm.$nextTick();
    expect(wrapper.find(".modalFunction").exists()).toBe(true);
    wrapper.find(".modalFunction").trigger("click");
    wrapper.vm.$nextTick();
    expect(wrapper.find(".active").exists()).toBe(true);
    expect(wrapper.text()).toContain("Drawer");
    expect(wrapper.text()).toContain("Page");
  });
  it("should call drawer function", async () => {
    await wrapper.find(".addFavoriteFunc").trigger("click");
    wrapper.vm.$nextTick();
    expect(wrapper.find(".popup").exists()).toBe(true);
  });
});
