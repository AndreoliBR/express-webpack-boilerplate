const express = require('express');
const color = require('colors');
const path = require('path');
const routes = require('./src/routes');
const mongoose = require('mongoose');
const { middlewareGlobal, checkCSRFerror, CSRFmiddleware } = require('./src/middlewares/middleware');

require('dotenv').config();

const SERVER_PORT = 3333;
const app = express();

console.log(`${color.yellow('[SERVER]')} Conectando ao banco de dados MongoDB...`);
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false })
  .then(() => {
    app.emit('done');
  })
  .catch((e) => {
    console.error(e);
  });

const session = require('express-session');
const MongoStore = require('connect-mongo');
const flash = require('connect-flash');
const helmet = require('helmet');
const csrf = require('csurf');

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(helmet());

const sessionOptions = session({
  secret: 'sikfj3wirkfj3wikfr3jemn+565grq2sdgfv',
  store: MongoStore.create({ mongoUrl: process.env.MONGODB_CONNECTION }),
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60 * 24 * 7,
    httpOnly: true
  }
});

app.use(sessionOptions);
app.use(flash());


app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(csrf());
app.use(middlewareGlobal);
app.use(checkCSRFerror);
app.use(CSRFmiddleware);
app.use(routes);

app.on('done', () => {
  app.listen(SERVER_PORT, () => {
    console.log(`${color.yellow('[SERVER]')} Servidor executando em ${color.blue(`http://localhost:${SERVER_PORT}`)}`);
  });
});