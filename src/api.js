import fetch from 'node-fetch';
import {createHash} from 'node:crypto'

const privateKey = "67a10b987fea8e2cd13d3087cab5e6bf0d7d24b1"
const publicKey = "6a7cb238fda81c11e5b9b80eeb2bd702"
/**
 * Récupère les données de l'endpoint en utilisant les identifiants
 * particuliers developer.marvels.com
 * @param url l'end-point
 * @return {Promise<json>}
 */
export const getData = async (url) => {
    // A Compléter
    const hash = await getHash(publicKey, privateKey, Date.now());
    const response = await fetch(url + "?ts=" + Date.now() +"&apikey="+ publicKey +"&hash=" + hash);
    const data = await response.json(); //sous forme de json

    if (data && data.data && data.data.results) {
        return filterCharacters(data.data.results);
    } else {
        console.error("Les données reçues ne sont pas au format attendu :", data);
        return [];
    }
}


/**
 * Calcul la valeur md5 dans l'ordre : timestamp+privateKey+publicKey
 * cf documentation developer.marvels.com
 * @param publicKey
 * @param privateKey
 * @param timestamp
 * @return {Promise<ArrayBuffer>} en hexadecimal
 */
export const getHash = async (publicKey, privateKey, timestamp) => {
    const hashInput = timestamp + privateKey + publicKey;
    return await createHash('md5').update(hashInput).digest('hex');
}

/**
 * Filtrer les personnages sans visuel
 * @param {Array} characters - Tableau de personnages
 * @return {Array} - Tableau filtré de personnages avec visuel
 */
const filterCharacters = (characters) => {
    return characters.filter(character => character.thumbnail && character.thumbnail.path !== "image_not_available");
};
