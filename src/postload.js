const sections = document.querySelectorAll('section')

function setActiveSection() {
  const windowHeight = window.innerHeight
  const scrollAmount = window.scrollY
  sections.forEach(section => {
    if (
      (section.offsetTop < windowHeight + scrollAmount &&
        section.offsetTop + section.offsetHeight > scrollAmount) ||
      section.id === 'jumbotron'
    )
      section.classList.add('active')
    else section.classList.remove('active')
  })
}

window.addEventListener('load', setActiveSection)
document.addEventListener('scroll', setActiveSection)
window.addEventListener('resize', setActiveSection)
