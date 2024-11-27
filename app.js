const express = require('express')
const authenticate = require('./middlewares/auth')
const moviesRouter = require('./routes/movies')
const authRouter = require('./routes/auth')
const { corsMiddleware } = require('./middlewares/cors.js')

process.loadEnvFile()

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

app.use(corsMiddleware())

app.get('/', (req, res) => res.send('<h1>Bienvenid@ al servidor</h1>'))

app.post('/login', authRouter)

app.use('/movies', authenticate, moviesRouter)

app.listen(port, () => console.log(`✅ Servidor corriendo en http://localhost:${port}`))