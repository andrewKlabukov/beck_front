import React, { useEffect, useState } from 'react'
import { Route, Switch, useHistory } from 'react-router-dom'
import { CurrentUserContext } from '../../contexts/CurrentUserContext'
import Header from "../Header/Header.js"
import Main from "../Main/Main.js"
import Footer from "../Footer/Footer.js"
import InfoTooltip from "../InfoTooltip/InfoTooltip"
import PopupWithForm from "../PopupWithForm/PopupWithForm"
import ImagePopup from "../ImagePopup/ImagePopup"
import EditProfilePopup from '../EditProfilePopup/EditProfilePopup'
import EditAvatarPopup from '../EditAvatarPopup/EditAvatarPopup'
import AddPlacePopup from "../AddPlacePopup/AddPlacePopup"
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute'
import Register from '../Register/Register'
import Login from '../Login/Login'
import { register, authorize, getContent } from '../../utils/apiForAuth'
import { api } from "../../utils/api"

function App() {
  const history = useHistory();
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false)
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false)
  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false)
  const [isSelectedCard, setSelectedCard] = React.useState(false)
  const [isSelectedInfoTooltip, setIsSelectedInfoTooltip] = useState(false)
  const [isSelectedImageTooltip, setIsSelectedImageTooltip] = useState(false)
  const [cardData, setCardData] = React.useState(null)
  const [currentUser, setCurrentUser] = React.useState({})
  const [cards, setCards] = useState([])
  const [loggedIn, setLoggedIn] = useState(false)

  function handleCardLike(card, isLiked) {
    // const isLiked = card.likes.some(i => i === currentUser._id)
    const jwt = localStorage.getItem('jwt')
    api.changeLikeCardStatus(card._id, isLiked, jwt)
      .then((newCard) => {
        setCards((state) =>
          state.map((c) => c._id === card._id ? newCard : c)
        )
      })
      .catch(err => {
        console.log(err)
      })
  }

  function handleCardDelete(card) {
    const jwt = localStorage.getItem('jwt')
    api.deleteCard(card._id, jwt)
      .then(() => {
        const arrayWithoutDeletedCard = cards.filter(el => {
          return el._id !== card._id
        })
        setCards(arrayWithoutDeletedCard)
      })
      .catch(err => {
        console.log(err)
      });
  }

  function handleUpdateUser({ name, about }) {
    const jwt = localStorage.getItem('jwt')
    api.patchText({ name, about }, jwt)
      .then(result => {
        setCurrentUser(result)
      })
      .catch(err => console.log(err))
    closeAllPopups()
  }

  function handleUpdateAvatar(newLink) {
    const jwt = localStorage.getItem('jwt')
    api.changeAvatar(newLink, jwt)
      .then(res => setCurrentUser(res))
      .catch(err => {
        console.log(err)
      });
    closeAllPopups()
  }

  function addCard({ name, link }) {
    api.postCard(name, link)
      .then(newCard => {
        setCards([newCard, ...cards])
      })
      .catch(err => {
        console.log(err)
      })
    closeAllPopups()
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true)
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true)
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true)
  }

  function handleCardClick(data) {
    setSelectedCard(true)
    setCardData(data)
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false)
    setIsEditProfilePopupOpen(false)
    setIsAddPlacePopupOpen(false)
    setSelectedCard(false)
    setIsSelectedInfoTooltip(false)
  }

  const [headerEmail, setHeaderEmail] = useState('')

  function changeLoggedState(e) {
    localStorage.clear()
    setLoggedIn(false)
  }

  function loginProfile(e, data) {
    e.preventDefault()
    authorize(data)
      .then(res => {
        setLoggedIn(true)
        history.push('/')
        setHeaderEmail(data.email)
        localStorage.setItem('jwt', res.token)
        loadDataRegister()
      })
      .catch((err) => console.log(err))
  }

  function loadDataRegister() {
    const jwt = localStorage.getItem('jwt')
    if (jwt) {
      api.getCards(jwt)
        .then(res => {
          setCards(res)
          // setCurrentUser(userInfo)
        })
        .catch(err => {
          console.log(err)
        })
      getContent(jwt)
        .then(res => {
          if (res) {
            setHeaderEmail(res.email || '')
            setLoggedIn(true)
            setCurrentUser(res)
            history.push('/')
          }
        })
        .catch((err) => console.log(err))
    }
  }

  useEffect(() => {
    // const jwt = localStorage.getItem('jwt')
    // if (jwt) {
    //    api.getCards(jwt)
    //     .then(res => {
    //       setCards(res)
    //       // setCurrentUser(userInfo)
    //     })
    //     .catch(err => {
    //       console.log(err)
    //     })
    //   getContent(jwt)
    //     .then(res => {
    //       if (res) {
    //         setHeaderEmail(res.email || '')
    //         setLoggedIn(true)
    //         setCurrentUser(res)
    //         history.push('/')
    //       }
    //     })
    //     .catch((err) => console.log(err))
    // }
    loadDataRegister()
    // if(!loggedIn){
    //   localStorage.clear()
    // }
  }, [])

  // useEffect(() => {
  //   const jwt = localStorage.getItem('jwt')
  //   // console.log(jwt)
  //   if (jwt) {
  //     console.log('Trought')
  //     Promise.all([api.getUserInfo(), api.getCards(jwt)])
  //       .then(([userInfo, cards]) => {
  //         console.log('asasd')
  //         console.log(userInfo)
  //         setCards(cards)
  //         setCurrentUser(userInfo)
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   }
  // }
  //   , [])


  function registerProfile(e, data) {
    e.preventDefault()
    register(data)
      .then(res => {
        setIsSelectedInfoTooltip(true)
        setIsSelectedImageTooltip(true)
        // setHeaderEmail(res.email)
        // setLoggedIn(true)
        // history.push('/')
        loginProfile(e, data)
      })
      .catch(err => {
        setIsSelectedImageTooltip(false)
        setIsSelectedInfoTooltip(true)
        console.log(err)
      })
  }
  // React.useEffect(() => {
  //     const jwt = localStorage.getItem('jwt')
  //     Promise.all([api.getUserInfo(), api.getCards(jwt)])
  //       .then(([userInfo, cards]) => {
  //         console.log('asasd')
  //         console.log(userInfo)
  //         setCards(cards)
  //         setCurrentUser(userInfo)
  //       })
  //       .catch(err => {
  //         console.log(err)
  //       })
  //   }
  //   , [])
  return (
    <CurrentUserContext.Provider value={currentUser}>
      <div className="body">
        <div className="content">

          <Header
            isLogged={loggedIn}
            email={headerEmail}
            changeLogged={changeLoggedState} />

          <Switch>

            <Route
              path='/sign-up'>
              <Register registerProfile={registerProfile} />
            </Route>

            <Route
              path='/sign-in'>
              <Login loginProfile={loginProfile} />
            </Route>

            <ProtectedRoute
              isLogged={loggedIn}
              path="/">
              <Main
                onEditProfile={handleEditProfileClick}
                onAddPlace={handleAddPlaceClick}
                onEditAvatar={handleEditAvatarClick}
                onPopupWithImage={handleCardClick}
                cards={cards}
                onCardLike={handleCardLike}
                onCardDelete={handleCardDelete}
              />
            </ProtectedRoute>

          </Switch>

          <Footer />

          <EditProfilePopup
            isOpen={isEditProfilePopupOpen}
            onClose={closeAllPopups}
            onUpdateUser={handleUpdateUser} />

          <AddPlacePopup
            isOpen={isAddPlacePopupOpen}
            onClose={closeAllPopups}
            onUpdateCards={addCard} />

          <EditAvatarPopup
            isOpen={isEditAvatarPopupOpen}
            onClose={closeAllPopups}
            onUpdateAvatar={handleUpdateAvatar} />

          <PopupWithForm
            name='confirm-delete-card'
            title='Вы уверены?'
            onClose={closeAllPopups}
          />

          <ImagePopup
            onClose={closeAllPopups}
            isOpen={isSelectedCard}
            card={cardData} />

          <InfoTooltip
            onClose={closeAllPopups}
            isOpen={isSelectedInfoTooltip}
            suecces={isSelectedImageTooltip} />
        </div>
      </div>
    </CurrentUserContext.Provider>

  );
}

export default App;
