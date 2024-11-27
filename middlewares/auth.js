const jwt = require('jsonwebtoken')
const SECRET_KEY = 'claveultrasecreta'

const authenticate = (req, res, next) => {
  const token = req.headers['access-token']

  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' })
  }

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded // Añado el usuario al objeto de solicitud para futuras referencias
    next()
  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      res.status(401).json({ message: 'Token expirado' })
    } else {
      res.status(401).json({ message: 'Token inválido' })
    }
  }
}

module.exports = authenticate