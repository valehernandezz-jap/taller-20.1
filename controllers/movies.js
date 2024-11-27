const movies = require('../models/movies')

const getAll = async (req, res) => {
  const users = await movies.getAll()
  res.json(users)
}

const getById = async (req, res) => {
  const id = parseInt(req.params.id)

  const user = await movies.getById(id)
  if (user) {
    res.json(user)
  } else {
    res.status(404).json({ message: 'Película no encontrada' })
  }
}

const create = async (req, res) => {
  const createdUser = await movies.create(req.body)
  if (createdUser) {
    res.json(createdUser)
  } else {
    res
      .status(400)
      .json({ message: 'Error al crear película. Datos no válidos' })
  }
}

const update = async (req, res) => {
  const id = parseInt(req.params.id)
  const user = await movies.getById(id)

  console.log(id)
  console.log(req.body)

  if (user) {
    const updatedUser = await movies.update(id, { ...user, ...req.body })

    if (updatedUser) {
      res.json(updatedUser)
    } else {
      res.status(500).json({
        message:
          'No se pudo actualizar la película debido a un error del servidor'
      })
    }
  } else {
    res.status(404).json({ message: 'Película no encontrada' })
  }
}

const deleteMovie = async (req, res) => {
  const id = parseInt(req.params.id)
  const user = await movies.getById(id)

  if (user) {
    const eliminationResult = await movies.deleteMovie(id)

    if (eliminationResult) {
      res.json(eliminationResult)
    } else {
      res.status(500).json({
        message:
          'No se pudo eliminar la película debido a un error del servidor'
      })
    }
  } else {
    res.status(404).json({ message: 'Película no encontrada' })
  }
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteMovie
}
