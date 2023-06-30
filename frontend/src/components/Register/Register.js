import React, {useState}from 'react'
import {Link} from 'react-router-dom'
import AuthFormWrapper from "../AuthFormWrapper/AuthFormWrapper"

export default function Register({registerProfile}) {
  const [inputsValue, setInputValue] = useState({email: '', password: ''})
  function handleChangeInputs(evt) {
    const {name, value} = evt.target
    setInputValue(prevState => ({ ...prevState, [name]: value }))
  }

  return (
      <AuthFormWrapper
        title='Регистрация'
        nameForm = 'registerForm'
        form = 'registerForm'
        submit = {(e) => registerProfile(e, inputsValue)}>
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
          value= 'Зарегистрироваться'
          className="auth-form-wrapper__submit"/>
        <Link
          exact to = '/'
          className = 'auth-form-wrapper__already-registered'>
          Уже зарегистрированы? Войти
        </Link>
      </AuthFormWrapper>
  )
}
