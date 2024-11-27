document.addEventListener('DOMContentLoaded', async () => {
  const modal = new bootstrap.Modal(document.getElementById('movieModal'))
  const token = localStorage.getItem('token')
  if (!token) {
    window.location.href = 'login.html'
  }

  const headers = {
    'access-token': token
  }

  const fetchMovies = async () => {
    const response = await fetch('http://localhost:3000/movies', { headers })
    const movies = await response.json()

    const moviesList = document.getElementById('moviesList')
    moviesList.innerHTML = movies
      .map(
        (movie) => `
          <div class="col">
            <div class="card h-100 position-relative">
              <div class="position-absolute top-0 end-0 m-2 d-flex gap-2">
                <button class="btn btn-warning btn-sm d-flex align-items-center" 
                  onclick="openModal(${movie.id}, '${movie.title}', '${movie.genre}', 'PUT')">
                <i class="bi bi-pencil"></i>
                </button>
                <button class="btn btn-danger btn-sm d-flex align-items-center" 
                  onclick="deleteMovie(${movie.id})">
                <i class="bi bi-trash"></i>
                </button>
              </div>
              <div class="card-body text-center">
                <h5 class="card-title">${movie.title}</h5>
                <p class="card-text">${movie.genre}</p>
              </div>
            </div>
          </div>
        `
      )
      .join('')
  }

  window.openModal = (id = null, title = '', genre = '', method = '') => {
    if (method === 'PUT') {
      document.getElementById('movieId').value = id || ''
      document.getElementById('title').value = title
      document.getElementById('genre').value = genre
    }

    // Cambia el título del modal según la acción
    document.getElementById('movieModalLabel').innerText = id
      ? 'Edit Movie'
      : 'Add Movie'

    // Muestra el modal

    modal.show()
  }

  window.createOrUpdateMovie = async (movie) => {
    const method = movie.id ? 'PUT' : 'POST'
    const endpoint = movie.id ? `/movies/${movie.id}` : '/movies'

    await fetch(`http://localhost:3000${endpoint}`, {
      method,
      headers: { ...headers, 'Content-Type': 'application/json' },
      body: JSON.stringify(movie)
    })

    document.getElementById('movieId').value = ''
    document.getElementById('title').value = ''
    document.getElementById('genre').value = ''
    modal.hide()
    fetchMovies()
  }

  window.deleteMovie = async (id) => {
    await fetch(`http://localhost:3000/movies/${id}`, {
      method: 'DELETE',
      headers
    })
    fetchMovies()
  }

  // Manejar el envío del formulario
  document.getElementById('movieForm').addEventListener('submit', function (e) {
    e.preventDefault()

    const id = document.getElementById('movieId').value
    const title = document.getElementById('title').value
    const genre = document.getElementById('genre').value

    const movie = {
      id: id ? parseInt(id) : undefined,
      title,
      genre: genre
    }

    createOrUpdateMovie(movie)
  })

  // Inicializar la lista de películas
  fetchMovies()
})

// Logout funcionalidad
document.getElementById('logout-button').addEventListener('click', () => {
  window.location.href = 'login.html'
})
