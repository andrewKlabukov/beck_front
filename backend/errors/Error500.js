const { ERROR_CODE_500 } = require('../constants/constants');

class InternalServer extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_500;
  }
}

module.exports = InternalServer;
