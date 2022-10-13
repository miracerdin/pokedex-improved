export interface DetailPokemon {
  name: string;
  height?: number;
  weight?: number;
  abilities: { name: string; ability: { name: string } }[];
  sprites?: {
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
  moves?: { name: string; move: { name: string } }[];

  base_experience?: number;
}
export interface PokemonType {
  id?: string;
  name: string;
  sprites?: string;
  uid?: string;
  groupName?: string;
}
export interface PokemonDataTypes {
  id?: number;
  name?: string;
  sprites?: { other: { dream_world: { front_default: string } } };
  uid?: string;
  groupName?: string;
}

export interface MockTypes {
  id?: number;
  name?: string;
  url?: string;
  sprites?: object;
  abilities?: object[];
  height: number;
  weight: number;
  base_experience: number;
  moves: object[];
}
export interface FavoriteTypes {
  name?: string;
  id?: string;
  sprites?: string;
  groupName?: string;
  uid: string;
}
export interface DatasTypes {
  data: {
    name?: string;
    id?: string;
    sprites?: string;
  };
}
export interface DataTypes {
  id: number;
  name: string;
  sprites: {
    back_default: string;
    back_female: null;
    back_shiny: string;
    back_shiny_female: null;
    front_default: string;
    front_female: null;
    front_shiny: string;
    front_shiny_female: null;
    other: {
      dream_world: {
        front_default: string;
      };
    };
  };
}
