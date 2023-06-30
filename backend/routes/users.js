const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { regExpURL } = require('../constants/constants');
const {
  getUsers,
  getUserId,
  patchUserProfile,
  patchUserAvatar,
  getUserProfile,
} = require('../controllers/users');

router.get('/', getUsers);
router.get('/me', getUserProfile);
router.get('/:userId', celebrate({
  params: Joi
    .object()
    .keys({
      userId: Joi
        .string()
        .hex()
        .required(),
    }),
}), getUserId);

router.patch('/me', celebrate({
  body: Joi
    .object()
    .keys({
      name: Joi
        .string()
        .required()
        .min(2)
        .max(30),
      about: Joi
        .string()
        .required()
        .max(30)
        .min(2),
    }),
}), patchUserProfile);

router.patch('/me/avatar', celebrate({
  body: Joi
    .object()
    .keys({
      avatar: Joi
        .string()
        .required()
        .pattern(new RegExp(regExpURL)),
    }),
}), patchUserAvatar);

module.exports = router;
