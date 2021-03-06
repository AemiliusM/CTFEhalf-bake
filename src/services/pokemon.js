import { pokeMunger } from "../utils/helpers";

const favPokemon = [
  "charizard",
  "typhlosion",
  "blaziken",
  "mewtwo",
  "suicune",
  "pidgeot",
  "golduck",
  "gardevoir",
  "ninetales",
  "houndoom",
];

export const fetchPokemon = async () => {
  const pokemonList = await Promise.all(
    favPokemon.map(async (fav) => {
      const fetchedPokemon = await fetch(
        `https://pokedex-alchemy.herokuapp.com/api/pokedex?pokemon=${fav}`
      );

      const pokemonData = await fetchedPokemon.json();

      // Need to filter mega pokemon
      if (pokemonData.count > 1) {
        const exactPokemon = pokemonData.results.find(
          (result) => result.pokemon === fav
        );
        return pokeMunger(exactPokemon);
      }

      return pokeMunger(pokemonData.results[0]);
    })
  );
  return pokemonList;
};

export async function fetchSearchPokemon(pokemonName) {
  const lowerCaseName = pokemonName.toLowerCase();
  return await fetch(
    `https://pokedex-alchemy.herokuapp.com/api/pokedex?pokemon=${lowerCaseName}`
  )
    .then((data) => data.json())
    .then((pokemonData) => {
      const { results } = pokemonData;
      const pokemonResults = results.map((pokemon) => pokeMunger(pokemon));
      console.log(pokemonResults, "pokemonjs");
      return pokemonResults;
    });
}

export const fetchTypes = async () => {
  const res = await fetch(
    `https://pokedex-alchemy.herokuapp.com/api/pokedex/types`
  );

  const pokemonTypes = await res.json();

  // get random types
  const randomTypes = pokemonTypes
    .map((pokemonType) => ({ type: pokemonType.type }))
    .sort(() => 0.5 - Math.random())
    .slice(0, 5);
  return randomTypes;
};

export const fetchFilteredPokemon = async (type) => {
  const res = await fetch(
    `https://pokedex-alchemy.herokuapp.com/api/pokedex?type=${type}`
  );
  const pokemonData = await res.json();
  const filteredPokemon = pokemonData.results.map((pokemon) =>
    pokeMunger(pokemon)
  );
  return filteredPokemon;
};
