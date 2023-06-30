import React from 'react'

function ImagePopup ({isOpen, card, onClose}){
    return (
      <div className={`popup popup_type_image  ${isOpen ? 'popup_opened' : ''}`}>
        <figure className="popup__window-wrap">
          <img
            src={card?.image}
            alt={card?.description}
            className="popup__image"/>
          <figcaption className="popup__figcaption">{card?.description}</figcaption>
          <button
            type="button"
            className="popup__button-close popup__button-close_type_image"
            onClick={onClose}></button>
        </figure>
      </div>
    )
  }

export default ImagePopup
