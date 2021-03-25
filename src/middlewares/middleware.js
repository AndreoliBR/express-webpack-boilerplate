exports.middlewareGlobal = (req, res, next) => {
  res.locals.errors = req.flash('errors');
  res.locals.success = req.flash('success');
  res.locals.user = req.session.user;
  next();
}

exports.checkCSRFerror = (err, req, res, next) => {
  if (err) {
    return res.sendStatus(403);
  }

  next();
}

exports.CSRFmiddleware = (req, res, next) => {
  res.locals.CSRFTOKEN = req.csrfToken();
  next();
}

exports.loginRequired = (req, res, next) => {
  if (!req.session.user) {
    req.flash('errors', 'EUSERNOTLOGGED');
    req.session.save(() => res.redirect('/'));
    return;
  }

  next();
}