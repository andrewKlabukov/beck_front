import React from 'react'
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function EditAvatarPopup({isOpen, onClose, onUpdateAvatar}) {
  const inputRef = React.createRef()
  function submit(e){
    e.preventDefault()
    onUpdateAvatar(inputRef.current.value)
    inputRef.current.value = ''
  }

 return (
   <PopupWithForm
     name='redactor-image-form'
     nameForm='image'
     title='Обновить аватар'
     isOpen={isOpen}
     onClose={onClose}
     form = {submit}>
       <input
         type='url'
         placeholder='Ссылка на картинку'
         required
         name='link'
         className='popup__input popup__input_field_link'
         ref={inputRef}
       />
       <span className={`error link-error`}></span>
   </PopupWithForm>
 )
}
