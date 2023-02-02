const validateFieldTitle = (req, res, next) => {
  const { title } = req.body;

  if (title === undefined) {
    return res.status(400).json({ message: 'The field "title" is required ' });
  }

  if (title === '') {
    return res.status(400).json({ message: 'Title cannot be empty ' });
  }

  next();
};

const validateFieldStatus = (req, res, next) => {
  const { status } = req.body;

  if (status === undefined) {
    return res.status(400).json({ message: 'The field "status" is required ' });
  }

  if (status === '') {
    return res.status(400).json({ message: 'Status cannot be empty ' });
  }

  next();
};

module.exports = {
  validateFieldTitle,
  validateFieldStatus,
};
