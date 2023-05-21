/* This is a React component called `ListExample`. It imports necessary dependencies such as `React`,
`useEffect`, `useState`, `getPokemon`, `getPokemons`, `ModalWindow`, and `pokemonIdEstructurado`
from different files. */
import React, { useEffect, useState } from 'react';
import '../assets/styles/Index.css';
import { getPokemon, getPokemons } from '../api';
import ModalWindow from './ModalWindow';
import { pokemonIdEstructurado } from '../utils/utils'

const ListExample = () => {
    const [items, setItems] = useState([]);
    const [pokemonFiltrat, setPokemonFiltrat] = useState(null);
    const [charging, setCharging] = useState(false);
    const [showModal, setShowModal] = useState(false);

    const handleShowModal = () => {
        setShowModal(true);
    };

    const handleHideModal = () => {
        setShowModal(false);
    };

    /* This is a `useEffect` hook that is used to fetch data from an API and update the state of the
    component. It runs only once when the component mounts, as it has an empty dependency array `[]`.
    The function `getAllPokemons1stGeneration` is an asynchronous function that fetches the first 151
    Pokemons from the API using the `getPokemons` function. If the length of the result is 151, it
    maps over the result and fetches the details of each Pokemon using the `getPokemon` function. It
    then updates the state of the component with the details of the Pokemons and sets the `charging`
    state to `true`. If there is an error, it logs the error to the console. */
    useEffect(() => {

        const getAllPokemons1stGeneration = async () => {
            try {
                const resultPokemons = await getPokemons();

                if (resultPokemons.length === 151) {
                    const pokemonPromises = resultPokemons.map((element) =>
                        getPokemon(element.url)
                    );

                    const pokemonDetails = await Promise.all(pokemonPromises);

                    setItems(pokemonDetails);
                    setCharging(true);
                }
            } catch (error) {
                console.error(error);
            }
        };

        getAllPokemons1stGeneration();
    }, []);

    /**
 * This is a React function that fetches and displays information about 151 Pokemon from an API,
 * allows the user to search for a specific Pokemon by name, and displays the details of the
 * selected Pokemon in a modal.
 */
    const buscarPokemon = (nom) => {
        setPokemonFiltrat({});
        if (typeof nom !== 'string') return;
        const poke = items.find((pokemon) => pokemon.name === nom);
        setPokemonFiltrat(poke);
        handleShowModal();
    }
    return (
        <div style={{minHeight:'90vh'}}>
            <h1>Pokedex</h1>
            <div className="grid-container">
                {!charging ? (<p>Cargando pokemons</p>) :
                    (

                        items.map((pokemon) => (
                            <div key={pokemon.id} className='cursorPointer' onClick={() => buscarPokemon(pokemon.name)}>
                                <img src={pokemon.sprites.front_default} loading='lazy' alt={pokemon.name} />
                                <h6>
                                    {pokemonIdEstructurado(pokemon.id)}-{pokemon.name}
                                </h6>

                            </div>
                        ))

                    )}

            </div>
            {pokemonFiltrat === null ? '' : <ModalWindow
                pokemonFiltrat={pokemonFiltrat}
                showModal={showModal}
                onButtonClick={{ functionShowOrHideModal: handleHideModal }}
            />}
        </div >
    );
};

export default ListExample;
