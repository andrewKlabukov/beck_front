import React from 'react'
import fail from "../../images/fail.png"
import success from "../../images/success.png"

export default function InfoTooltip({suecces, isOpen, onClose}) {
  const goodResp = 'Вы успешно зарегистрировались!'
  const badResp = 'Что-то пошло не так! Попробуйте ещё раз.'
  return (
    <div className={`popup popup_type_image ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__window-wrap popup_type_info-tool">
        <img
          src={suecces ? success : fail}
          alt= 'подтверждение входа'
          className="popup__image-tool"/>
        <h3 className="popup__message">{suecces ? goodResp : badResp}</h3>
        <button
          type="button"
          className="popup__button-close popup__button-close_type_image"
          onClick={onClose}></button>
      </div>
    </div>
  )
}
