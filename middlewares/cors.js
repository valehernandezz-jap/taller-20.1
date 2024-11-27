const cors = require('cors')

const ACCEPTED_ORIGINS = [
  'http://localhost:5500',
  'http://192.168.0.112:5500'
].filter(Boolean)

const corsMiddleware = () =>
  cors({
    credentials: true,
    origin: (origin, callback) => {
      // Permite solicitudes sin origen (por ejemplo, desde el mismo origen o herramientas como Postman)
      if (!origin || ACCEPTED_ORIGINS.includes(origin)) {
        return callback(null, true)
      }
      return callback(new Error('Error de CORS: Origen no permitido'))
    },
    methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT', // Métodos HTTP permitidos
    allowedHeaders: [
      'X-CSRF-Token',
      'X-Requested-With',
      'Accept',
      'Accept-Version',
      'Content-Length',
      'Content-Type',
      'X-Api-Version',
      'Access-Control-Allow-Headers',
      'Access-Control-Allow-Origin',
      'Authorization',
      'access-token'
    ] // Cabeceras permitidas ajustadas
  })

module.exports = { corsMiddleware }
