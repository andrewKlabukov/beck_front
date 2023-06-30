import React from 'react'
import {CurrentUserContext} from "../../contexts/CurrentUserContext"
import redactorAvatar from "../../images/redactorAvatar.png"
import Card from "../Card/Card"

function Main (props){
  const currentUser = React.useContext(CurrentUserContext)
  return (
    <main className="main">
      <section className="profile">
        <div className="profile__naming">
          <div className="profile__avatar-redactor">
            <img
              src={currentUser.avatar ? currentUser.avatar : ''}
              alt="аватарка"
              className="profile__avatar"/>
            <button
              className="profile__redactor-image-button"
              onClick={props.onEditAvatar}>
              <img
                src={redactorAvatar}
                alt="редактор картинки"
                className="profile__redactor-image"/>
            </button>
          </div>

          <div className="profile__text">
            <div className="profile__redaction">
              <h1 className="profile__title ellipsis">{currentUser.name}</h1>
              <button
                aria-label="открыть редактор"
                type="button"
                className="profile__redaction-button"
                onClick={props.onEditProfile}>
              </button>
            </div>
            <p className="profile__subtitle ellipsis">{currentUser.about}</p>
          </div>
        </div>
        <button
          type="button"
          className="profile__button"
          onClick={props.onAddPlace}></button>
      </section>
      <section className="gallery">
        <ul className="cards">
          {props.cards.map(el =>
            <Card
              key={el._id}
              data={el}
              owner={currentUser.id}
              onCardClick={props.onPopupWithImage}
              onCardLike = {props.onCardLike}
              onCardDelete = {props.onCardDelete}/>
          )}
        </ul>
      </section>
    </main>
  )
}

export default Main
