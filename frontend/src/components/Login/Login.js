import React, {useState} from 'react'
import AuthFormWrapper from "../AuthFormWrapper/AuthFormWrapper"

export default function Login({loginProfile}) {
  const [inputsValue, setInputValue] = useState({email: '', password: ''})

  function handleChangeInputs(evt) {
    const {name, value} = evt.target
    setInputValue(prevState => ({ ...prevState, [name]: value }))
  }
  return (

    <AuthFormWrapper
      title='Вход'
      nameForm = 'registerForm'
      form = 'registerForm'
      submit = {(e) => loginProfile(e, inputsValue)}>

      <input
        type='text'
        placeholder='Email'
        required
        name = 'email'
        className='auth-form-wrapper__input'
        value = {inputsValue.email ? inputsValue.email : ''}
        onChange = { handleChangeInputs }
      />

      <input
        type='password'
        placeholder='Пароль'
        required
        name = 'password'
        className= 'auth-form-wrapper__input'
        value = {inputsValue.password ? inputsValue.password : ''}
        onChange = { handleChangeInputs }
      />

      <input
        type="submit"
        value= 'Войти'
        className="auth-form-wrapper__submit"/>

    </AuthFormWrapper>

  )
}

