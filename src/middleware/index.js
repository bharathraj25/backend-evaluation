const { ValidationError } = require('joi/lib/errors');
const { NotFoundError, RequiredKeyError } = require('../error');

const middleWareErrorHandle = (err, req, res, next) => {
  if (res.headersSent) {
    return next(err);
  }

  switch (err.constructor) {
  case RequiredKeyError:
  case ValidationError: {
    return res.status(400).json({ message: err.message });
  }
  case NotFoundError: {
    return res.status(404).json({ message: err.message });
  }
  default: {
    return res.status(500).json({ message: 'something unexpected happened' });
  }
  }
};

module.exports = {
  middleWareErrorHandle
};