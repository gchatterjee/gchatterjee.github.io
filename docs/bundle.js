(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
const html = `
  <div id="circles-container"></div>
`

const style = `
  :host {
    color: white;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 10px;
  }

  div.circle:not(.active) {
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
      (_, i) => `<div class="circle${i === currentIndicator ? ' active' : ''}">&bull;</div>`
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

customElements.define('gchatterjee-indicator-circles', IndicatorCircles)

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
    height: 100%;
    width: 100%;
    transition: opacity 1s, visibility 0s 1s;
    visibility: hidden;
    overflow: hidden;

    position: fixed;
    opacity: 0;
  }

  :host(.current-slide) {
    visibility: visible;
    transition: opacity 1s, visibiility 0s 1s;
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
    background: red;
    right: 0;
    position: absolute;
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

customElements.define('gchatterjee-slide', Slide)

},{}],3:[function(require,module,exports){
const slide = require('./components/slide')
const indicatorCircles = require('./components/indicator-circles')

},{"./components/indicator-circles":1,"./components/slide":2}]},{},[3]);
