import { triggerOnScroll } from './utils.mjs'

/**
 * ! This file is used for the home page (index.html)
 */

/**
 * Smooth scroll on click for "Decouvrir mes projets" button
 */
document
  .querySelector('#discover-projects-button')
  .addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('#projects').scrollIntoView({
      behavior: 'smooth'
    })
  })

/**
 * Trigger animations when scrolling on the page
 */
triggerOnScroll('.scroll-trigger', { rootMargin: '-100px', runOnce: true })

/**
 * Trigger animations when scrolling on the page
 */
triggerOnScroll('.score', {
  rootMargin: '-50px',
  runOnce: false
})
