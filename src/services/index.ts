import axios from "axios";

export interface Pokemon {
  id: number;
  name: string;
  weight?: number;
  height?: number;
  sprites: {
    front_default: string;
    back_default?: string;
  };
  moves?: PokemonMove[];
}
export interface PokemonMove {
  move: {
    name: string;
    url: string;
  };
}
export interface ServiceRequestParams {
  limit?: number;
  offset?: number;
}

export interface ServiceListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

const createQueryString = (params: Record<string, string>) =>
  new URLSearchParams(params).toString();

export const getPokemonList = async (
  params?: ServiceRequestParams
): Promise<ServiceListResponse> => {
  const query = params
    ? `?${createQueryString(params as Record<string, string>)}`
    : "";

  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${query}`);
  return res.json();
};

export const getPokemonWithId = async (id: number): Promise<Pokemon> => {
  const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  return res.json();
};

export const BASE_URL = "https://pokeapi.co/api/v2/pokemon/";

export const fetchPokemon = async (id: number) => {
  try {
    return await axios.get(`${BASE_URL}/${id}`);
  } catch (error) {
    return [];
  }
};
