import knex from 'knex';

const knexConfig = require('../../knexfile');

const connection = knex(knexConfig);

export default connection;