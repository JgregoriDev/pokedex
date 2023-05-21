import React, { useState, useRef, useEffect } from 'react';
import { pokemonIdEstructurado,themes } from '../utils/utils';
import '../assets/styles/Modal.css';
const pokemonTypes = {
  normal: '#A8A878',
  fire: '#F08030',
  water: '#6890F0',
  electric: '#F8D030',
  grass: '#78C850',
  ice: '#98D8D8',
  fighting: '#C03028',
  poison: '#A040A0',
  ground: '#E0C068',
  flying: '#A890F0',
  psychic: '#F85888',
  bug: '#A8B820',
  rock: '#B8A038',
  ghost: '#705898',
  dragon: '#7038F8',
  dark: '#705848',
  steel: '#B8B8D0',
  fairy: '#EE99AC',
  unknown: '#68A090',
  shadow: '#493963'
};

const ModalWindow = ({ pokemonFiltrat, showModal, onButtonClick }) => {
  const [showElement, setShowElement] = useState({ 'type': false, 'stats': false, 'abilities': false });
  const keyTheme = localStorage.getItem('theme');
  console.log(pokemonFiltrat.abilities.length);


  /**
   * The function defines a modal window with a button click handler to show or hide the modal.
   */
  const handleButtonClick = () => {
    onButtonClick.functionShowOrHideModal();
  };
  /* The `modalWindow` constant is defining the CSS styles for the modal window component. It sets the
  display property to 'block' or 'none' depending on the value of the `showModal` prop, which
  determines whether the modal should be visible or hidden. It also sets the background color,
  position, size, and z-index of the modal. */
  const modalWindow = {
    display: showModal ? 'block' : 'none',
    backgroundColor: themes[keyTheme] ?? themes['Dark'],
    position: 'fixed',
    top: '25%',
    left: window.innerWidth < 670 ? '15%' : '35%',
    width: window.innerWidth < 670 ?'250px':'400px',
    height: '575px',
    zIndex: 10,
    boxShadow: '10px 10px 10px 10px rgba(0, 0, 0, 0.5)'
  }
  const img = { width: '50%', height: 'auto' }
  /**
   * This function returns a specific value from an object based on a given key.
   * @returns The function `dynamiqueContentPokemon` returns the value of the property specified by the
   * `key` variable in the `valores` object. In this case, the `key` variable is set to `'Types'`, so the
   * function will return the value of the `Types` property in the `valores` object.
   */
  const dynamiqueContentPokemon = (key) => {

    const valores = {
      Types: pokemonFiltrat.types.length === 1 ?
        <span style={{ backgroundColor: pokemonTypes[pokemonFiltrat?.types[0].type.name] }}>
          {pokemonFiltrat?.types[0].type.name}
        </span> :

        <p>
          <span style={{ backgroundColor: pokemonTypes[pokemonFiltrat?.types[0].type.name] }}>
            {pokemonFiltrat?.types[0].type.name}</span> { }
          <span style={{ backgroundColor: pokemonTypes[pokemonFiltrat?.types[1].type.name] }}>{pokemonFiltrat?.types[1].type.name}</span></p>,
      Stats: {
        'hp': pokemonFiltrat?.stats[0].base_stat,
        'attack': pokemonFiltrat?.stats[1].base_stat,
        'defense': pokemonFiltrat?.stats[2].base_stat,
        'special_attack': pokemonFiltrat?.stats[3].base_stat,
        'special_defense': pokemonFiltrat?.stats[4].base_stat,
        'speed': pokemonFiltrat?.stats[5].base_stat
      },
      Abilities: pokemonFiltrat.abilities.length === 1 ?
        `${pokemonFiltrat?.abilities[0].ability.name}` :
        pokemonFiltrat.abilities.length === 2 ?
          `${pokemonFiltrat?.abilities[0].ability.name} ${pokemonFiltrat?.abilities[1].ability.name}` :
          `${pokemonFiltrat?.abilities[0].ability.name} ${pokemonFiltrat?.abilities[1].ability.name} ${pokemonFiltrat?.abilities[2].ability.name}`

    }
    // const key = 'Types'; // Variable con el nombre de la propiedad deseada

    return valores[key];
  }

  return (
    <div
      style={modalWindow}
    >
      <div style={{ textAlign: 'end' }}>
        <button onClick={handleButtonClick}>x</button>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
        <h3 >
          {pokemonIdEstructurado(pokemonFiltrat?.id)} - {pokemonFiltrat?.name}
        </h3>
        <img style={img} src={pokemonFiltrat?.sprites.front_default} alt={pokemonFiltrat.name} />
        <div style={{ display:'flex',flexDirection:window.innerWidth<678?'column':'row',gap:'3px'}}>
          <button className='button' onClick={() => setShowElement({ 'type': !showElement.type, 'stats': false, 'abilities': false })} title='Types'>
            Types
          </button>
          <button className='button' onClick={() => setShowElement({ 'type': false, 'stats': !showElement.stats, 'abilities': false })} title='Stats'>
            Stats
          </button>
          <button className='button' onClick={() => setShowElement({ 'type': false, 'stats': false, 'abilities': !showElement.abilities })} title='Abilities' >
            Abilities
          </button>
        </div>
        <div>
          <div style={{ display: !showElement.type ? 'none' : 'block', marginTop: '20px' }}>
            <h6>Types</h6>
            {dynamiqueContentPokemon('Types')}
          </div>
          <div style={{ display: !showElement.stats ? 'none' : 'block', marginTop: '20px' }}>
            <h6>Stats</h6>
            <table>
              <tbody>
                <tr>
                  <td>hp</td>
                  <td>{dynamiqueContentPokemon('Stats').hp}</td>
                </tr>
                <tr>
                  <td>attack</td>
                  <td>{dynamiqueContentPokemon('Stats').speed}</td>
                </tr>
                <tr>
                  <td>defense</td>
                  <td>{dynamiqueContentPokemon('Stats').defense}</td>
                </tr>
                <tr>
                  <td>special attack</td>
                  <td>{dynamiqueContentPokemon('Stats').special_attack}</td>
                </tr>
                <tr>
                  <td>special deffense</td>
                  <td>{dynamiqueContentPokemon('Stats').special_defense}</td>
                </tr>
                <tr>
                  <td>speed</td>
                  <td>{dynamiqueContentPokemon('Stats').speed}</td>
                </tr>
              </tbody>
            </table>

          </div>
          <div style={{ display: !showElement.abilities ? 'none' : 'block', marginTop: '20px' }}>
          <h6>Abilities</h6>
            {dynamiqueContentPokemon('Abilities')}
          </div>
        </div>

      </div>
    </div >
  );
};

export default ModalWindow;
