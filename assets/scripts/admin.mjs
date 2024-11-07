import {
  createProjectsElements,
  projects,
  searchInProjects
} from './projects.mjs'

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

/**
 * Initialize projects
 */
const projectsContainerElement = document.querySelector('#projects-container')
createProjectsElements(projectsContainerElement, projects)

/**
 * Search in projects
 */
const handleProjectsSearchChange = (e) => {
  const searchResults = searchInProjects(e.currentTarget.value, projects)
  createProjectsElements(projectsContainerElement, searchResults)
}

const searchInputElement = document.querySelector('#projects-search')
searchInputElement.addEventListener('input', handleProjectsSearchChange, false)
