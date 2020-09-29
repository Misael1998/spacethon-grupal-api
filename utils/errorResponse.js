class ErrorResponse extends Error {
  constructor(message, code, body) {
    super(message);
    this.code = code;
    this.body = body;
  }
}

module.exports = ErrorResponse;
