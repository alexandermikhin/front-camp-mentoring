import './error-popup.scss';

export class ErrorPopup {
  constructor() {
    this._message = '';
    this._initClassNames();
  }

  set message(value) {
    this._message = value;
  }

  get message() {
    return this._message;
  }

  show() {
    const popup = this._createPopup();
    const overflowElement = this._createOverflow();
    overflowElement.appendChild(popup);
    document.body.appendChild(overflowElement);
  }

  remove() {
    const overflowElement = document.querySelector(
      `.${this._errorOverflowClass}`
    );
    overflowElement.remove();
  }

  _createPopup() {
    const popup = document.createElement('div');
    popup.className = this._errorPopupClass;
    popup.innerHTML = `<div class="error-popup__header">Error</div>
            <div class="error-popup__text">${this._message}</div>
            <div class="error-popup__buttons">
                <button class="error-popup__close-button">Close</button>
            </div>`;

    /** @type {HTMLButtonElement} */
    const closeButton = popup.querySelector('.error-popup__close-button');
    closeButton.onclick = () => this.remove();
    return popup;
  }

  _createOverflow() {
    const overflowElement = document.createElement('div');
    overflowElement.className = this._errorOverflowClass;

    return overflowElement;
  }

  _initClassNames() {
    this._errorPopupClass = 'error-popup';
    this._errorOverflowClass = 'error-popup-overflow';
  }
}
