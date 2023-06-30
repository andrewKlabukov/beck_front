// eslint-disable-next-line import/no-unresolved
const bcrypt = require('bcryptjs');
const User = require('../models/user');
const {
  RES_OK,
  ERROR_DUPLICATE,
} = require('../constants/constants');

const SALT_ROUNDS = 10;
const { generateToken } = require('../helpers/jwt');
const Badreq = require('../errors/Error400');
const InternalServer = require('../errors/Error500');
const Unauthorized = require('../errors/Error401');
const NotFound = require('../errors/Error404');
const Conflict = require('../errors/Error409');

function getUserProfile(req, res, next) {
  User.findById(req.user.id)
    .then((user) => {
      res
        .status(RES_OK)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new Badreq('Некорректные данные.'));
      } else {
        next(err);
      }
    });
}

function login(req, res, next) {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new Badreq('Не передан емейл или пароль'));
  }
  User.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new Unauthorized('Не авторизован');
      } else {
        return Promise.all([
          user,
          bcrypt.compare(password, user.password),
        ]);
      }
    })
    .then(([user, isPasswordCorrect]) => {
      if (!isPasswordCorrect) {
        throw new Unauthorized('Не авторизован');
      } else {
        const token = generateToken({ email: user.email, type: 'admin' });
        res.send({ token });
      }
    })
    .catch(next);
}

function createUser(req, res, next) {
  const {
    email,
    password,
  } = req.body;
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return bcrypt
          .hash(password, SALT_ROUNDS)
          .then((hash) => User.create({
            email,
            password: hash,
          }));
      }
      throw new Conflict(`${user.email} уже занят`);
    })
    // .then((user) => {
    //   res.status(201).send(user);
    // })
    .then((user) => {
      const {name, about, avatar, email} = user;
      res.status(200).send({name, about, avatar, email})
    })
    .catch((err) => {
      if (err.code === ERROR_DUPLICATE) {
        next(new Conflict('Данный email уже занят'));
      } else if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new Badreq('Некорректные данные'));
      } else {
        next(err);
      }
    });
}

function getUsers(req, res, next) {
  User.find({})
    .then((users) => {
      res
        .status(RES_OK)
        .send(users);
    })
    .catch(next);
}

function getUserId(req, res, next) {
  User.findOne({ _id: req.params.userId })
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователя с таким id не найден'));
        return;
      }
      res
        .status(RES_OK)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new Badreq('Некорректный id'));
      } else {
        next(err);
      }
    });
}

function patchUserProfile(req, res, next) {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user.id, { name, about }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь с таким id не найден'));
        return;
      }
      res
        .status(RES_OK)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new Badreq('Некорректные данные'));
      } else {
        next(err);
      }
    });
}

function patchUserAvatar(req, res, next) {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user.id, { avatar }, { new: true, runValidators: true })
    .then((user) => {
      if (!user) {
        next(new NotFound('Пользователь с таким id не найден'));
        return;
      }
      res
        .status(RES_OK)
        .send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        next(new Badreq('Некорректные данные'));
      } else {
        next(new InternalServer('Что-то пошло не так'));
      }
    });
}

module.exports = {
  createUser,
  getUsers,
  getUserId,
  patchUserProfile,
  patchUserAvatar,
  login,
  getUserProfile,
};
