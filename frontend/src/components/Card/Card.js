import React from 'react'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'

function Card(props) {
  const card = props.data
  // console.log(props.data)
  const data = {
    image: props.data.link,
    description: props.data.name,
    likes: props.data.likes
  }
  // console.log(props.data)
  const length = props.data ? data.likes.length : 0
  const currentUser = React.useContext(CurrentUserContext)
  const isOwn = card?.owner === currentUser._id;
  const cardDeleteButtonClassName = (
    `gallery__delete ${isOwn ? '' : 'none'}`
  )

  const isLiked = card?.likes.some(i => i === currentUser._id)
  const likeClassName = (
    `gallery__like ${isLiked ? 'gallery__like_active' : ''}`
  )

  return (
    <li className="gallery__card">
      <img src={data?.image} alt={data?.description} className="gallery__img" onClick={() => props.onCardClick(data)} />
      <button type="button" className={cardDeleteButtonClassName} onClick={() => props.onCardDelete(card)}></button>
      <div className="gallery__description">
        <h2 className="gallery__title ellipsis">{data?.description}</h2>
        <div className="gallery__like-box">
          <button type="button" className={likeClassName} onClick={() => props.onCardLike(card, isLiked)}></button>
          <div
            className={`gallery__like-counter ${data?.likes.length ? "gallery__like-counter_active" : ""
              }`}
          >
            {length}
          </div>
        </div>
      </div>
    </li>
  )
}

export default Card
