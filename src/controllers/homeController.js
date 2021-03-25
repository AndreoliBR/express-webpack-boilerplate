const Contato = require('../models/ContatoModel');

exports.index = async (_, res) => {
  const contatos = await Contato.buscaContatos();

  res.render('index', { contatos });
}