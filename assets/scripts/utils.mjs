/**
 * Use a selector to attach an intersection observer to multiple elements
 * @param {*} selectors
 * @param {*} options - Intersection observer options
 */
export const triggerOnScroll = (selectors, options = {}) => {
  const elements = document.querySelectorAll(selectors)

  // attach observer for each element
  for (const element of elements) {
    attachIntersectionObserver(element, options)
  }
}

/**
 * Attach an intersection observer to the specified element
 * @param {HTMLElement} element
 * @param {*} options
 * @returns
 */
const attachIntersectionObserver = (element, options) => {
  // fallback for older browsers
  if (!('IntersectionObserver' in window)) {
    element.classList.add('intersected')
    return
  }

  // initialize the observer
  const observer = new IntersectionObserver((entries, observer) => {
    for (const entry of entries) {
      if (entry.isIntersecting) {
        entry.target.classList.add('intersected')
        if (options.runOnce) {
          observer.unobserve(entry.target)
        }
      } else {
        entry.target.classList.remove('intersected')
      }
    }
  }, options)
  // attach the observer
  observer.observe(element)
}

/**
 * Escape regex characters from a string
 * @param {string} string
 * @returns string
 */
export const escapeRegExp = (string) => {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') // $& means the whole matched string
}
