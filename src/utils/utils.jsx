/**
 * The function formats a given number as a three-digit string with leading zeros if necessary.
 * @returns a string that represents the ID of a Pokemon in a structured format. The ID is passed as a
 * parameter to the function and the function checks if the ID is less than 10, between 10 and 100, or
 * greater than 100. Depending on the value of the ID, the function adds leading zeros to the ID to
 * make it a three-digit number. The resulting
 */
function pokemonIdEstructurado(id) {
    // debugger
    if(typeof id!=='number') return;
    const pokemonId = id < 10 ? `00${id}` :
        id > 10 && id < 100 ? `0${id}` : `${id}`;
    return pokemonId;
}

const themes = {
    'Water': '#00BFFF',
    'Fire': '#FF4500',
    'Plant': '#00FF00',
    'Dark': '#333',
}
export { pokemonIdEstructurado, themes }