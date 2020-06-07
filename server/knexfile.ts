import path from 'path';
require('dotenv').config();

const connection = {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASS
}

const knexConfig = {
  client: 'pg',
  connection,
  migrations: {
        directory: path.resolve(__dirname, 'src', 'database', 'migrations')
  },
  seeds: {
    directory: path.resolve(__dirname, 'src', 'database', 'seeds')
  }
}

module.exports = knexConfig;