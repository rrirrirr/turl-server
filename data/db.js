const config = require("./knexfile");
const knex = require("knex");
const db = knex(knexConfig["development"])
