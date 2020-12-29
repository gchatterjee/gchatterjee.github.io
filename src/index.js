function setVisibleSlide() {
  const windowHeight = window.innerHeight
  const yPosition = window.scrollY
  visibleSlide = Math.round(yPosition/(windowHeight))
  const sections = [...document.querySelectorAll('gchatterjee-slide')]
  sections.forEach((section, i) => {
    if (i === visibleSlide) {
      section.classList.add('current-slide')
    } else {
      section.classList.remove('uninitialized')
      section.classList.remove('current-slide')
    }
  })
}

document.addEventListener('scroll', setVisibleSlide)
window.addEventListener('resize', setVisibleSlide)
const sections = [...document.querySelectorAll('gchatterjee-slide')]
sections.forEach((section, i) => {
  section.setAttribute('number', `${i}`)
  section.setAttribute('of', `${sections.length}`)
  section.classList.add(i === 0 ? 'current-slide' : 'uninitialized')
})
