document
  .getElementById('loginForm')
  .addEventListener('submit', async function (e) {
    e.preventDefault()

    const username = document.getElementById('username').value
    const password = document.getElementById('password').value

    const myHeaders = new Headers()
    myHeaders.append('Content-Type', 'application/json')

    const raw = JSON.stringify({
      username,
      password
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    try {
      const response = await fetch(
        'http://localhost:3000/login',
        requestOptions
      )

      if (response.ok) {
        const result = await response.json()
        console.log('Login exitoso:', result)

        // Guardar el token en localStorage
        localStorage.setItem('token', result.token)

        // Redirigir al usuario a index.html
        window.location.href = 'index.html'
      } else {
        const errorText = await response.text()
        const errorJson = JSON.parse(errorText)
        const errorMessage = errorJson.message || 'Error desconocido'
        console.error('Error en el servidor:', errorMessage)
        alert(`Login fallido: ${errorMessage}`)
      }
    } catch (error) {
      console.error('Error en la solicitud:', error)
      alert('Login fallido: No se pudo conectar al servidor.')
    }
  })
