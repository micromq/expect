class InvalidData extends Error {
  constructor(message) {
    super();

    this.status = 400;
    this.message = message;
  }
}

module.exports.InvalidData = InvalidData;
