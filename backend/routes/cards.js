const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExpURL } = require('../constants/constants');
const {
  createCard,
  getCards,
  deleteCard,
  postlikeCard,
  deletelikeCard,
} = require('../controllers/cards');

router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi
      .string()
      .required()
      .min(2)
      .max(30),
    link: Joi
      .string()
      .required()
      .pattern(new RegExp(regExpURL)),
  }),
}), createCard);

router.get('/', getCards);

router.delete('/:cardId', celebrate({
  params: Joi
    .object()
    .keys({
      cardId: Joi
        .string()
        .hex()
        .required(),
    }),
}), deleteCard);

router.put('/:cardId/likes', celebrate({
  params: Joi
    .object()
    .keys({
      cardId: Joi
        .string()
        .hex()
        .required(),
    }),
}), postlikeCard);

router.delete('/:cardId/likes', celebrate({
  params: Joi
    .object()
    .keys({
      cardId: Joi
        .string()
        .hex()
        .required(),
    }),
}), deletelikeCard);

module.exports = router;
