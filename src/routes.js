const express = require('express');
const route = express.Router();
const homeController = require('./controllers/homeController');
const loginController = require('./controllers/loginController');
const contatoController = require('./controllers/contatoController');
const { loginRequired } = require('./middlewares/middleware');

// Rotas de home
route.get('/', homeController.index);

// Rotas de login
route.get('/login', loginController.index);
route.post('/login/register', loginController.register);
route.post('/login/login', loginController.login);
route.get('/login/logout', loginController.logout);

// Rotas de contato
route.get('/contato', loginRequired, contatoController.index);
route.post('/contato/new', loginRequired, contatoController.new);
route.get('/contato/:id', loginRequired, contatoController.editIndex);
route.post('/contato/edit/:id', loginRequired, contatoController.edit);
route.get('/contato/delete/:id', loginRequired, contatoController.delete);

module.exports = route;