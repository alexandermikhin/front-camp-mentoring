import './error-popup.scss';

export const ErrorPopup = (() => {
  let instance;
  let message = '';

  const errorOverflowClass = 'error-popup-overflow';
  const errorPopupClass = 'error-popup';

  function createPopup() {
    const popup = document.createElement('div');
    popup.className = errorPopupClass;
    popup.innerHTML = `<div class="error-popup__header">Error</div>
            <div class="error-popup__text">${message}</div>
            <div class="error-popup__buttons">
                <button class="error-popup__close-button">Close</button>
            </div>`;

    /** @type {HTMLButtonElement} */
    const closeButton = popup.querySelector('.error-popup__close-button');
    closeButton.onclick = remove;
    return popup;
  }

  function show() {
    const popup = createPopup();
    const overflowElement = createOverflow();
    overflowElement.appendChild(popup);
    document.body.appendChild(overflowElement);
  }

  function remove() {
    const overflowElement = document.querySelector(`.${errorOverflowClass}`);
    overflowElement.remove();
  }

  function createOverflow() {
    const overflowElement = document.createElement('div');
    overflowElement.className = errorOverflowClass;

    return overflowElement;
  }

  function init() {
    return {
      show,
      remove,
      getMessage: () => message,
      setMessage: value => (message = value)
    };
  }

  return {
    getInstance: () => {
      if (!instance) {
        instance = init();
      }

      return instance;
    }
  };
})();
