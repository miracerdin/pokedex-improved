import EachPokemon from "@/components/EachPokemon.vue";
import i18n from "@/i18n";
import { shallowMount, createLocalVue } from "@vue/test-utils";
import VueI18n from "vue-i18n";

const localVue = createLocalVue();
localVue.use(VueI18n);

describe("EachPokemon", () => {
  test("renders the component", () => {
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
    });
    expect(wrapper.find(".flip-card").exists()).toBe(true);
  });
});
