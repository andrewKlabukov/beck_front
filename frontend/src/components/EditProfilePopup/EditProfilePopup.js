import React, {useState} from "react"
import {CurrentUserContext} from '../../contexts/CurrentUserContext'
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function EditProfilePopup ({isOpen, onClose, onUpdateUser}) {
  const currentUser = React.useContext(CurrentUserContext);
  const [name, setName] = useState(currentUser.name)
  const [description, setDescription] = useState(currentUser.about)

  React.useEffect(() => {
    setName(currentUser.name);
    setDescription(currentUser.about);
  }, [currentUser, isOpen])

  function handleChangeName(e) {
    setName(e.target.value)
  }
  function handleChangeDescription(e) {
    setDescription(e.target.value)
  }

  function handleSubmit(e) {
    e.preventDefault()
    onUpdateUser({
      name,
      about: description,
    });
  }

  return (
    <PopupWithForm
      name='text-form'
      nameForm='text'
      title='Редактировать профиль'
      isOpen={isOpen}
      onClose={onClose}
      form={handleSubmit}>
        <input
          type='text'
          placeholder='Имя'
          name='profile-text-redactor'
          required
          className='popup__input profile-text-redactor'
          value = {name ? name : ''}
          onChange = {handleChangeName}
        />
        <span className='error profile-text-redactor-error'></span>

        <input
          type='text'
          placeholder='Деятельность'
          name='activity'
          required
          className='popup__input popup__input_field_activity'
          value={description ? description : ''}
          onChange ={handleChangeDescription}
        />
        <span className= 'error activity-error'></span>
    </PopupWithForm>
  )
}

