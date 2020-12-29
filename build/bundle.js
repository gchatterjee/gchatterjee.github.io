(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const html = `
  <div id="circles-container"></div>
`

const style = `
  :host {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin: 10px;
  }

  :not(.active) {
    opacity: 50%;
  }
`

class IndicatorCircles extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = `${html}<style>${style}</style>`
  }

  static get observedAttributes() {
    return ['number', 'of', 'dark-mode']
  }

  renderIndicatorCircles() {
    const currentIndicator = parseInt(this.getAttribute('number'), 10)
    const circles = [...new Array(parseInt(this.getAttribute('of'), 10))].map(
      (_, i) => `<div${i === currentIndicator ? ' class="active"' : ''}>&bull;</div>`
    )
    this.shadowRoot.querySelector('#circles-container').innerHTML = circles.join('')
  }

  attributeChangedCallback(attributeName) {
    switch (attributeName) {
      case 'number':
      case 'of':
        if (this.getAttribute('number') && this.getAttribute('of')) this.renderIndicatorCircles()
        break
      default:
        return
    }
  }
}

module.exports = () => customElements.define('gchatterjee-indicator-circles', IndicatorCircles)

},{}],2:[function(require,module,exports){
const html = `
  <div id="slide">
    <slot id="content"></slot>
    <gchatterjee-indicator-circles id="indicator-circles"></gchatterjee-indicator-circles>
  <div>
`

const style = `
  :host {
    text-align: center;
    flex: 1;
    width: 100%;
    height: 100%;
    transition: opacity 1s;

    position: fixed;
    opacity: 0;
  }

  :host(.current-slide) {
    opacity: 100%;
  }

  :host(.uninitialized) {
    transition: opacity 0s;
  }

  :host(.dark-mode) {
    color: white;
    background-color: black;
  }

  #slide {
    display: flex;
    align-items: center;
    width: 100%;
    height: 100%;
  }

  #content::slotted(*) {
    flex: auto;
  }

  #indicator-circles {
    height: 100px;
  }
`

class Slide extends HTMLElement {
  constructor() {
    super()
    const shadowRoot = this.attachShadow({ mode: 'open' })
    shadowRoot.innerHTML = `${html}<style>${style}</style>`
  }

  static get observedAttributes() {
    return ['number', 'of']
  }

  renderIndicatorCircles() {
    const indicatorCircles = this.shadowRoot.querySelector('#indicator-circles')
    indicatorCircles.setAttribute('number', this.getAttribute('number'))
    indicatorCircles.setAttribute('of', this.getAttribute('of'))
  }

  attributeChangedCallback(attributeName) {
    switch (attributeName) {
      case 'number':
      case 'of':
        if (this.getAttribute('number') && this.getAttribute('of')) this.renderIndicatorCircles()
      default:
        return
    }
  }
}

module.exports = () => customElements.define('gchatterjee-slide', Slide)

},{}],3:[function(require,module,exports){
const registerSlide = require('./components/slide')
const registerIndicatorCircles = require('./components/indicator-circles')

registerSlide()
registerIndicatorCircles()

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

},{"./components/indicator-circles":1,"./components/slide":2}]},{},[3]);
