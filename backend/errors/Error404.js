const { ERROR_CODE_404 } = require('../constants/constants');

class NotFound extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_404;
  }
}

module.exports = NotFound;
