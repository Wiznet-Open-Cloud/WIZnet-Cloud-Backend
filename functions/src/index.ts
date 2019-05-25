import * as functions from 'firebase-functions'
import { configureServer } from './server'

// require both the firebase function package to define function   // behavior and your local server config function
//const configureServer = require("./graphql/resolvers");
//initialize the server
const server = configureServer();
// create and export the api
const api = functions.https.onRequest(server);
module.exports = { api };

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript
//
// export const helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
