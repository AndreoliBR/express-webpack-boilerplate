exports.paginaInicial = (_, res) => {
  res.render('index', {
    title: 'Este será o título da página',
    numeros: [0, 1, 2, 3, 4]
  });
}