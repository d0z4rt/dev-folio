export const triggerOnScroll = (selectors, options = {}) => {
  const elements = document.querySelectorAll(selectors)

  // attach observer for each element
  for (const element of elements) {
    attachIntersectionObserver(element, options)
  }
}

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
