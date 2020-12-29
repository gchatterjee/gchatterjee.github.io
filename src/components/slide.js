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
