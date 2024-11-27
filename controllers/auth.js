const bcryptjs = require('bcryptjs')
const jwt = require('jsonwebtoken')
const pool = require('../models/pool')

process.loadEnvFile()
const SECRET_KEY = process.env.SECRET_KEY || 'defaultSecretKey'

const login = async (req, res) => {
  const { username, password } = req.body

  try {
    const conn = await pool.getConnection()

    // Busco al usuario en la base de datos
    const rows = await conn.query('SELECT * FROM users WHERE username = ?', [
      username
    ])

    if (rows.length === 0) {
      // El usuario no existe, registro las credenciales
      const hashedPassword = await bcryptjs.hash(password, 10)
      await conn.query('INSERT INTO users (username, password) VALUES (?, ?)', [
        username,
        hashedPassword
      ])
      console.log(`Usuario ${username} registrado con éxito.`)
    } else {
      // Si sí existe, verifico la contraseña
      const user = rows[0]
      const passwordMatch = await bcryptjs.compare(password, user.password)
      if (!passwordMatch) {
        conn.release()
        return res
          .status(401)
          .json({ message: 'Usuario y/o contraseña incorrecto' })
      }
    }

    // Genero el token con JWT
    const token = jwt.sign({ username }, SECRET_KEY, { expiresIn: process.env.JWT_EXIPRES_IN || '1h' })
    conn.release()
    res.status(200).json({ message: 'Login exitoso:', token })
  } catch (err) {
    console.error('Error en el servidor:', err.message)
    res.status(500).json({ message: 'Error interno del servidor' })
  }
}

module.exports = login
