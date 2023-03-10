class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'NotFoundError';
  }
}

class RequiredKeyError extends Error {
  constructor(message) {
    super(message);
    this.name = 'RequiredKeyError';
  }
}

module.exports = {
  NotFoundError,
  RequiredKeyError
};
