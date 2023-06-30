const { ERROR_CODE_401 } = require('../constants/constants');

class Unauthorized extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_401;
  }
}

module.exports = Unauthorized;
