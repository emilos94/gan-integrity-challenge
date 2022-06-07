# City / address api for GAN Integrity backend code challenge

This is a solution for the [backend code challenge](https://github.com/gandevops/backend-code-challenge) at GAN integrity. It's a small local api serving some address / city data.

## Running the project

Run `npm install` and `npm run start` to start local api. The protocol, domain & port can be changed in the [config file](config.json). It runs on localhost:8080 by default.

## Further development

The challenge solution was made in quite a limited time scope, lots of stuff could be added, extended and/or improved :)

The authorization is quite barebones and could probably be added in a middleware for all requests or added in a smarter way than here.

There is no persistent data layer, the solution simply keeps the address data in memory and queries it.

There are no tests.

There's only one 'domain' illustrated is the city (routes, controller, service). It would probably be appropriate to create separate files for logic regarding areas & distance calculations.

Response models are created in file, could have dedicated types / functions to instantiate these.

There's no api documentation or API-DOC at the moment.