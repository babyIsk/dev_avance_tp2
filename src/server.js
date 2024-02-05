import {getData, getHash} from "./api.js";

import fastify from 'fastify';
import fastifyView from '@fastify/view';
import handlebars from 'handlebars';
import path from 'path';
import process from "process";

//*************************** ETAPE 4 *****************************

const app = fastify();

app.register(fastifyView, {
    engine: {
        handlebars,
    },
    templates: '../templates',
    includeViewExtension: true,
    options: {
        partials: {
            header: 'header.hbs',
            footer: 'footer.hbs',
        },
    },
});

//**************************** ETAPE 3 **********************
console.log("Je suis Marvel")

getData("https://gateway.marvel.com/v1/public/characters")
    .then(characters => {
        console.log("Personnages avec visuel :", characters);
    })
    .catch(error => {
        console.error("Erreur :", error);
    });
//**************************** FIN ETAPE 3 **********************

app.get('/', async (request, reply) => {
    try {
        const characters = await getData("https://gateway.marvel.com/v1/public/characters");
        console.log("Personnages avec visuel :", characters);
        return reply.view('index.hbs', { characters: characters });
    } catch (error) {
        console.error('Erreur lors de la récupération des données Marvel:', error);
        reply.code(500).send('Erreur lors de la récupération des données Marvel');
    }
});

app.listen(3000, (err) => {
    if (err) {
        console.error(err);
        process.exit(1);
    }
    console.log('Server is running on port 3000');
});


handlebars.registerHelper('console', function(value) {
    console.log("value",value);
});

