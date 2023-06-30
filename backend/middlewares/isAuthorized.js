const { checkToken } = require('../helpers/jwt');
const User = require('../models/user');

const Unauthorized = require('../errors/Error401');
const NotFound = require('../errors/Error404');

function isAuthorized(req, res, next) {
  const auth = req.headers.authorization;
  if (!auth) {
    next(new Unauthorized('Авторизуйтесь для доступа'));
    return;
  }

  const token = auth.replace('Bearer ', '');

  try {
    const payload = checkToken(token);
    User.findOne({ email: payload.email })
      .then((user) => {
        if (!user) {
          next(new NotFound('Пользователь не найден'));
        }
        req.user = { id: user._id };
        next();
      });
  } catch (err) {
    next(new Unauthorized('Авторизуйтесь для доступа'));
  }

}

module.exports = { isAuthorized };
