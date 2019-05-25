// require all dependencies to set up server
import * as express from 'express'
import { ApolloServer } from 'apollo-server-express'
import * as cors from 'cors'
import resolvers from "./graphql/resolvers"
import { typeDefs } from "./graphql/schema"

import * as bodyParser from 'body-parser'
import * as jwt from 'express-jwt'
let jwks = require('jwks-rsa')
require('dotenv').config()

export function configureServer() {
    // invoke express to create our server
    const app = express();
    //use the cors middleware
    app.use(cors());

    const auth = jwt({
        secret: jwks.expressJwtSecret({
          cache: true,
          rateLimit: true,
          jwksRequestsPerMinute: 5,
          jwksUri: `${process.env.AUTH0_ISSUER}.well-known/jwks.json`
        }),
        audience: process.env.AUTH0_AUDIENCE,
        issuer: process.env.AUTH0_ISSUER,
        algorithms: ['RS256']
    })

/*
    app.use(
        bodyParser.json(),
        auth
    )
*/
    // Simple graphql schema
    // Very simple resolver that returns "world" for the hello query
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        uploads: true,
        introspection: true,
        playground: true,
        //context: ({ req }) => ({
            //user: req.user
        //})
    });

    // now we take our newly instantiated ApolloServer and apply the   // previously configured express application
    server.applyMiddleware({ 
        app,
        path:'/wiznet'
    });
    
    // finally return the application
    return app;
}
