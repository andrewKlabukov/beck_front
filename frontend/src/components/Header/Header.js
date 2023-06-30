import React from 'react'
import {NavLink, Switch, Route} from "react-router-dom"
import logo from "../../images/Vector.svg"

export default function Header({isLogged, email, changeLogged}) {
  return (
    <header className="header">
      <img
        src={logo}
        alt="логотип"
        className="header__logo"/>
      <div className="header__right">
        <p className="header__email">{isLogged ? email : ''}</p>
        <Switch>
          <Route path='/sign-up'>
            <NavLink
              className = 'header__button'
              to='sign-in'
              onClick={changeLogged}>
              Войти
            </NavLink>
          </Route>

          <Route path='/sign-in'>
            <NavLink
              className = 'header__button'
              to='sign-up'
              onClick={changeLogged}>
              Регистрация
            </NavLink>
          </Route>

          <Route exact path='/'>
            <NavLink
              className = 'header__button'
              to='sign-up'
              onClick={changeLogged}>
              Выйти
            </NavLink>
          </Route>
        </Switch>
      </div>
    </header>
  )
}

