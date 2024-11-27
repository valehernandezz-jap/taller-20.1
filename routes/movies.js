const { Router } = require('express');
const { getAll, getById, create, update, deleteMovie } = require('../controllers/movies');


const moviesRouter = Router()

moviesRouter
  .get('/', getAll)
  .get('/:id', getById)
  .post('/', create)
  .put('/:id', update)
  .delete('/:id', deleteMovie)

module.exports = moviesRouter
