const express = require('express');
const route = express.Router();
const homeController = require('./controllers/homeController');
const contatoController = require('./controllers/contatoController');

route.get('/', homeController.paginaInicial);

route.get('/contato', contatoController.contato);

route.get('*', (_, res) => {
  res.sendStatus(404);
});

module.exports = route;