import React, {useState} from 'react'
import PopupWithForm from "../PopupWithForm/PopupWithForm"

export default function AddPlacePopup({isOpen, onClose, onUpdateCards}){
  const [formValues, setFormValues] = useState({ name: "", link: "" });

  function handleChange(evt)  {
    const {name, value} = evt.target
    setFormValues(prevState => ({ ...prevState, [name]: value }))
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateCards({
      name: formValues.name,
      link: formValues.link,
    })
    setFormValues({ name: "", link: "" })
  }

  return (
    <PopupWithForm
      name='image-form'
      nameForm='image'
      title='Новое место'
      isOpen={isOpen}
      onClose={onClose}
      form={handleSubmit}>
        <input
          type='text'
          placeholder='Название'
          name='name'
          required
          className='popup__input popup__input_field_name-img'
          value={formValues.name ? formValues.name : ''}
          onChange={ handleChange }
        />
        <span className='error name-img'></span>

        <input
          type='url'
          placeholder='Ссылка на картинку'
          name='link'
          required
          className='popup__input popup__input_field_link'
          value={formValues.link ? formValues.link : ''}
          onChange={ handleChange }
        />
        <span className='error link'></span>
    </PopupWithForm>
  )
}
