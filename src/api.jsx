import React from 'react'
const getPokemons = async () => {
    const resultado = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
    const data = await resultado.json();
    return data.results;
}
const getPokemon = async (link) => {
    const respuesta = await fetch(link);
    if (respuesta.ok) {
        const data = await respuesta.json();
        return data;
    } else {
        return null;
    }

}

export { getPokemons, getPokemon }