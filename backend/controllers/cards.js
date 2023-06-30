const Card = require('../models/card');
const Badreq = require('../errors/Error400');
const InternalServer = require('../errors/Error500');
const Forbidden = require('../errors/Error403');
const NotFound = require('../errors/Error404');

function createCard(req, res, next) {
  const {
    name,
    link,
    likes,
  } = req.body;
  const owner = req.user.id;
  Card.create({
    name,
    link,
    owner,
    likes,
  })
    .then((card) => {
      res
        .status(201)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Badreq('Некорректные данные'));
      } else {
        next(new InternalServer('Что-то пошло не так'));
      }
    });
}

function getCards(req, res, next) {
  Card.find({})
    .then((cards) => {
      res
        .status(200)
        .send(cards);
    })
    .catch(() => {
      next(new InternalServer('Что-то пошло не так'));
    });
}

function deleteCard(req, res, next) {
  Card.findById(req.params.cardId)
    .then((card) => {
      if (!card) {
        next(new NotFound('Карточка с таким id не найдена'));
        return;
      }
      if (card.owner.toString() !== req.user.id.toString()) {
        next(new Forbidden('Нельзя удалить эту карточку'));
        return;
      }
      return card
        .remove()
        .then(() => {
          res
            .status(200)
            .send({ message: 'Карточка успешно удалена' });
        })
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new Badreq('Некорректные данные'));
      } else {
        next(new InternalServer('Что-то пошло не так'));
      }
    });
}

function postlikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user.id.toString() } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFound('Карточка с таким id не найдена'));
        return;
      }
      res
        .status(200)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new Badreq('Некорректные данные'));
      } else {
        next(new InternalServer('Что-то пошло не так'));
      }
    });
}

function deletelikeCard(req, res, next) {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: req.user.id.toString() } },
    { new: true },
  )
    .then((card) => {
      if (!card) {
        next(new NotFound('Карточка с таким id не найдена'));
        return;
      }
      res
        .status(200)
        .send(card);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new Badreq('Некорректные данные'));
      } else {
        next(new InternalServer('Что-то пошло не так'));
      }
    });
}

module.exports = {
  createCard,
  getCards,
  deleteCard,
  postlikeCard,
  deletelikeCard,
};
