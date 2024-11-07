/**
 * Check if an user has already logged in using local storage
 */
const checkUserLogin = () => {
  const isLoggedIn = window.localStorage.getItem('isLoggedIn')

  if (!isLoggedIn) {
    window.location = './login.html'
  }
}
checkUserLogin()

/**
 * Handle logout
 */
const logoutButton = document.querySelector('#logout-button')
logoutButton.addEventListener('click', () => {
  window.localStorage.clear()
  window.location = '.'
})
