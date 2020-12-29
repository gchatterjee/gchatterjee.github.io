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
