exports.middlewareGlobal = (req, res, next) => {
  res.locals.variavel = 'teste deu certo'
  next();
}

exports.checkCSRFerror = (err, req, res, next) => {
  if (err && err.code === 'EBADCSRFTOKEN') {
    return res.sendStatus(403);
  }
}

exports.CSRFmiddleware = (req, res, next) => {
  res.locals.CSRFTOKEN = req.csrfToken();
  next();
}