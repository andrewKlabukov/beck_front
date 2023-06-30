const { ERROR_CODE_403 } = require('../constants/constants');

class Forbidden extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_403;
  }
}

module.exports = Forbidden;
