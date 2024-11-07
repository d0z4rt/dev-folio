const initLoginForm = () => {
  const errorElement = document.querySelector('#error-message')
  const loginFormElement = document.querySelector('#login-form')
  const credentials = {
    username: 'admin',
    pass: 'admin'
  }
  loginFormElement.addEventListener('submit', (e) => {
    e.preventDefault()
    const data = new FormData(e.currentTarget)

    if (
      data.get('username') === credentials.username &&
      data.get('password') === credentials.pass
    ) {
      window.localStorage.setItem('isLoggedIn', true)
      window.location = '.'
    } else {
      errorElement.style.display = 'block'
    }
  })
}

initLoginForm()
