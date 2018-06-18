# lioness

A Graphcool based backend for [janis](https://github.com/cityofaustin/janis) and [pearl](https://github.com/cityofaustin/pearl)

## Running locally
* Install [graphcool](https://www.graph.cool/): `npm install -g graphcool`
* Spin up a local graphcool cluster: `graphcool local up`
* Deploy locally: `graphcool deploy`
  * Make sure to select local as the target
* Populate the db:
  * Set `gqlEndpoint` in [populateData.js](data/src/populateData.js)
  * Run `yarn populate-db`
