const express = require('express');
const color = require('colors');
const path = require('path');
const routes = require('./src/routes');
const mongoose = require('mongoose');

require('dotenv').config();

const SERVER_PORT = 3333;
const app = express();

console.log(`${color.yellow('[SERVER]')} Conectando ao banco de dados MongoDB...`);
mongoose.connect(process.env.MONGODB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.emit('done');
  })
  .catch((e) => {
    console.error(e);
  });

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

app.use(routes);

app.on('done', () => {
  app.listen(SERVER_PORT, () => {
    console.log(`${color.yellow('[SERVER]')} Servidor executando em ${color.blue(`http://localhost:${SERVER_PORT}`)}`);
  });
});