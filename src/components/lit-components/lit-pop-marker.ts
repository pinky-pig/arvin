import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

export class PopMarker extends LitElement {
  static get properties() {
    return {
      name: { type: String },
      background: { type: String },
      hasBorder: { type: Boolean },
    }
  }

  static styles = css`
  .container{

    overflow: hidden;
    border-radius: 25px;

    width: 82px;
    height: 82px;
    position: relative;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='518.77 41.817 238.6 263.3'%3E%3Cpath d='M681.539 50.75q26.5 7.98 44.73 27.81 21.23 23.12 25.23 53.97.82 6.35.82 19.97 0 10.75.05 21.5.22 24.2-9.6 44.19-22.25 45.28-72.96 55.21-2.83.55-5.17 2.91-4.36 4.4-21.99 21.76-2.55 2.51-5.53 1.88-1.84-.38-4.39-2.89l-22.84-22.38q-1.17-1.15-2.79-1.43-25.39-4.38-45.22-19.71-7.86-6.08-14.4-13.81-22.72-26.86-23.69-63.48-.07-13.75.12-27.5.17-12.63 1.43-19.92 6-34.83 33.28-58.58 21.43-17.95 48.52-22.17 6.9-1.08 19.94-1.2 18.05-.17 30 .12 11.66.29 24.46 3.75z' stroke='%23000' stroke-width='5' fill='%23ffffff00'/%3E%3C/svg%3E");
  }

  .container:before {
    background-image: radial-gradient(50% 50% at 50% 50%,rgba(255,0,128,.3) 0,rgba(255,0,128,.2) 100%);
    filter: blur(20px);
    height: 143px;
    left: -24px;
    top: -50px;
    transform: rotate(30.58deg);
    width: 70px;
  }
  
  .container:before {
    border-radius: 64px;
    content: "";
    position: absolute;
    z-index: 0;
  }
  
  .container:after {
    background-image: radial-gradient(50% 50% at 50% 50%,rgba(1,107,231,.2) 0,rgba(1,106,229,.4) 100%);
    filter: blur(35px);
    height: 120px;
    left: -3px;
    top: -18px;
    width: 120px;
  }
  
  .container:after, .container:before {
    border-radius: 64px;
    content: "";
    position: absolute;
    z-index: 0;
  }
  .box{
    width: 74%;
    height: 74%;
    position: absolute;
    background: rgba(0, 0, 0, 0.5);
    top: 8%;
    left: 14%;
    border-radius: 50%;
  }
  `
  constructor() {
    super()
    const anyThis = this as any
    anyThis.name = 'https://nevflynn.com/_next/image?url=%2Fimages%2Fmemoji-1.png&w=32&q=100'
  }

  onButtonClick() {
    // eslint-disable-next-line no-console
    console.log('Lit button clicked')
    const event = new CustomEvent('my-event', {
      detail: {
        message: 'Something important happened',
      },
    })
    this.dispatchEvent(event)
  }

  render() {
    const anyThis = this as any

    return html` 
      <div class="container">
        <img 
          class="box" 
          src=${anyThis.name} 
          alt=""
          style="background: ${anyThis.background} !important;"
          >
      </div>
    `
  }
}

if (!customElements.get('pop-marker'))
  customElement('pop-marker')(PopMarker)
