const mariadb = require('mariadb')

process.loadEnvFile()

const pool = mariadb.createPool({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'root',
  database: process.env.DB_NAME || 'prueba_db',
  port: process.env.DB_PORT || 3306,
  connectionLimit: process.env.DB_CONN_LIMIT || 5
})

module.exports = pool
