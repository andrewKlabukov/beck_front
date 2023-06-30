import React from 'react'

function PopupWithForm ({isOpen, name, title, nameForm, onClose, children, form}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__window">
        <h2 className="popup__title">{title}</h2>
        <form
          name={`profile-${nameForm}-redactor`}
          onSubmit ={form}
          className="popup__admin popup__admin_type_text isvalid"
          noValidate>
          {children}
          <input
            type="submit"
            value="Сохранить"
            className="popup__submit"/>
        </form>
        <button
          type="button"
          className="popup__button-close popup__button-close_type_text-form"
          onClick={onClose}>
        </button>
      </div>
    </div>
  )
}

export default PopupWithForm;
