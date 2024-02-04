import {getData, getHash} from "./api.js";

console.log("Je suis Marvel")

getData("http://gateway.marvel.com/v1/public/characters")
    .then(characters => {
        console.log("Personnages avec visuel :", characters);
    })
    .catch(error => {
        console.error("Erreur :", error);
    });