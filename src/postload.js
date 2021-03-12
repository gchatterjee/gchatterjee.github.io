const sections = document.querySelectorAll('section')

function setActiveSection() {
  const windowHeight = window.innerHeight
  const scrollAmount = window.scrollY
  sections.forEach(section => {
    const { top, bottom } = section.getBoundingClientRect()
    const sectionTop = top + scrollAmount
    const sectionBottom = bottom + scrollAmount
    const action =
      (sectionTop < windowHeight + scrollAmount &&
        sectionBottom > scrollAmount) ||
      section.id === 'jumbotron'
        ? 'add'
        : 'remove'
    section.classList[action]('active')
  })
}

window.addEventListener('load', setActiveSection)
document.addEventListener('scroll', setActiveSection)
window.addEventListener('resize', setActiveSection)
