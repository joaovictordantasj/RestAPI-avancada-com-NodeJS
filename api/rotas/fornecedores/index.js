const roteador = require('express').Router();
const TabelaFornecedor = require('./TabelaFornecedor');
const Fornecedor = require('./Fornecedor');

roteador.get('/', async (req, res) => {
  const resultados = await TabelaFornecedor.listar();
  res.send(
    JSON.stringify(resultados)
  );
});

roteador.post('/', async (req, res) => {
  const dadosRecebidos =  req.body;
  const fornecedor = new Fornecedor(dadosRecebidos);
  await fornecedor.criar();
  res.send(
    JSON.stringify(fornecedor)
  );
});

module.exports = roteador;