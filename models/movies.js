const pool = require('../models/pool')

const getAll = async () => {
  let conn
  try {
    conn = await pool.getConnection()
    const rows = await conn.query('SELECT id, title, genre FROM movies')

    return rows
  } catch (error) {
    console.error('Error en el servidor:', error.message)
  } finally {
    if (conn) conn.release() //release to pool
  }
  return false
}

const getById = async (id) => {
  let conn
  try {
    conn = await pool.getConnection()
    const rows = await conn.query(
      'SELECT id, title, genre FROM movies WHERE id = ?',
      [id]
    )

    return rows[0]
  } catch (error) {
    console.error('Error en el servidor:', error.message)
  } finally {
    if (conn) conn.release() //release to pool
  }
  return false
}

const create = async (movie) => {
  let conn
  try {
    conn = await pool.getConnection()
    const response = await conn.query(
      `INSERT INTO movies (title, genre) VALUE(?, ?)`,
      [movie.title, movie.genre]
    )

    return { id: parseInt(response.insertId), ...movie }
  } catch (error) {
    console.error('Error en el servidor:', error.message)
  } finally {
    if (conn) conn.release() //release to pool
  }
  return false
}

const update = async (id, movie) => {
  let conn
  try {
    conn = await pool.getConnection()
    const response = await conn.query(
      `UPDATE movies SET title=?, genre=? WHERE id = ?`,
      [movie.title, movie.genre, id]
    )

    return { id: id, ...movie }
  } catch (error) {
    console.error('Error en el servidor:', error.message)
  } finally {
    if (conn) conn.release() //release to pool
  }
  return false
}

const deleteMovie = async (id) => {
  let conn
  try {
    conn = await pool.getConnection()
    await conn.query('DELETE FROM movies WHERE id = ?', [id])

    return { message: 'Película eliminada con éxito' }
  } catch (error) {
    console.error('Error en el servidor:', error.message)
  } finally {
    if (conn) conn.release() //release to pool
  }
  return false
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteMovie
}
