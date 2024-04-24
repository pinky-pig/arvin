import { LitElement, css, html } from 'lit'
import { customElement } from 'lit/decorators.js'

export class LogoMarker extends LitElement {
  static get properties() {
    return {
      name: { type: String },
    }
  }

  static styles = css`
    .LogoMarker {
      width: 82px;
      height: 82px;
      border-radius: 50%;
      border: 4px solid rgb(255, 255, 255);
      background: rgba(152, 208, 255, 0.5);
      z-index: 1;
      display: flex;
      -webkit-box-align: center;
      align-items: center;
      -webkit-box-pack: center;
      justify-content: center;
      will-change: transform;;
      transition: all 0.5s ease 0s;
    }
    .LogoMarker:hover {
      transform: scale(1.1);
    }
    .logo {
      max-width: 56px;
      max-height: 56px;
      transition: all 0.5s ease 0s;
    }
    .LogoMarker:hover .logo{
      animation: shake 1.5s ease-in-out infinite;
    }
    @keyframes shake {
      0% {
        transform: scale(1) rotate(0deg);
      }
      25%{
        transform: scale(1.1) rotate(-20deg);
      }
      50% {
        transform: scale(1) rotate(0deg);
      }
      75%{
        transform: scale(1.1) rotate(20deg);
      }
      100% {
        transform: scale(1) rotate(0deg);
      }
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
      <div class="LogoMarker" @click="${this.onButtonClick}">
        <img class="logo" src=${anyThis.name} alt="">
      </div>
    `
  }
}

if (!customElements.get('logo-marker'))
  customElement('logo-marker')(LogoMarker)
