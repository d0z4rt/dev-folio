import { escapeRegExp } from './utils.mjs'

export const projects = [
  {
    id: 'ec98cc14-0412-40ba-8ec0-fe538cfdd404',
    name: 'Site personel',
    cover: '/assets/img/cover.webp',
    description: 'A personal website showcasing my work and digital garden',
    details: 'Solid-Start, Markdown, TypeScript, SASS, ThreeJS'
  },
  {
    id: '855cd2ec-0f46-4f95-8d4e-3cadf013fa54',
    name: 'Projet 1',
    cover: '/assets/img/loic.webp',
    description:
      'Prepare, as the echoes of the past resound, and the future awaits your footprints.',
    details: 'C#'
  },
  {
    id: 'e7d81578-f9fe-4603-8dcf-79f451fb4d8f',
    name: 'projet 3',
    cover: '/assets/img/cover.webp',
    description: 'DEADBEEF',
    details: 'C++, C, C#'
  },
  {
    id: '65926222-5723-44ed-8072-471e9273ac28',
    name: 'La Frappe',
    cover: '/assets/img/lafrappe.webp',
    description: 'lorem ipsum dolore sit amet',
    details: 'HTML, CSS, JavaScript'
  },
  {
    id: '537bccb0-c3fd-43f6-8eba-bc43f1db95b7',
    name: '1337',
    cover: '/assets/img/cover.webp',
    description: '1337 h4x0rz pwn j00!',
    details: 'Bash'
  },
  {
    id: '0aa6f40b-58f1-4911-b3c1-e054825e0ec0',
    name: 'projet 6',
    cover: '/assets/img/cover.webp',
    description: 'lorem ipsum dolore sit amet',
    details: 'Solid-Start, Markdown, TypeScript, ThreeJS'
  },
  {
    id: '6a36b0be-697f-4285-a998-9faba31a4ed1',
    name: 'FEE1DEAD',
    cover: '/assets/img/cover.webp',
    description: 'I use arch btw',
    details: 'Debian'
  },
  {
    id: '610743aa-e7d5-4ac1-bc1b-2fbb04a78191',
    name: 'projet 6',
    cover: '/assets/img/cover.webp',
    description: 'lorem ipsum dolore sit amet',
    details: 'Solid-Start, Markdown, TypeScript, ThreeJS'
  }
]

/**
 * Create HTML element for each project
 * @param {HTMLElement} container
 */
export const createProjectsElements = (container, projects) => {
  container.innerHTML = ''
  for (const project of projects) {
    const projectElement = document.createElement('article')
    projectElement.id = project.id
    projectElement.classList.add('card', 'large')
    projectElement.innerHTML = `
              <img
                height="512"
                width="512"
                src="${project.cover}"
                alt="${project.name} cover"
                loading="lazy"
                decoding="async"
              />
              <div>
                <h3>${project.name}</h3>
                <ul>
                  <li>${project.description}</li>
                  <li class="details">
                    ${project.details}
                  </li>
                </ul>
              </div>
    `
    container.append(projectElement)
  }
}

/**
 * Search in the specified array of projects if the string
 * match either the name, description or the details of a project
 *
 * @param {string} _searchString
 * @param {Object} projects
 * @param {boolean} useRegex
 * @returns a list of matching projects
 */
export const searchInProjects = (_searchString, projects, useRegex = false) => {
  // If useRegex is true don't escape the search string
  const searchString = useRegex ? _searchString : escapeRegExp(_searchString)
  const regex = new RegExp(`${searchString}`, 'gi')
  const results = []
  for (const project of projects) {
    regex.lastIndex = 0 // there is a bug with regex.test() you need to reset lastIndex before each use
    if (
      regex.test(project.name) ||
      regex.test(project.description) ||
      regex.test(project.details)
    ) {
      results.push(project)
    }
  }
  return results
}
