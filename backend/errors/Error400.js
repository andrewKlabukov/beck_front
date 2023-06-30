const { ERROR_CODE_400 } = require('../constants/constants');

class Badreq extends Error {
  constructor(message) {
    super(message);
    this.statusCode = ERROR_CODE_400;
  }
}

module.exports = Badreq;
