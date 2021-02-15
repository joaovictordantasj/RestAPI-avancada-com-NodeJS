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

roteador.get('/:idFornecedor', async (req, res) => {
  try {
    const id = req.params.idFornecedor;
    const fornecedor = new Fornecedor({ id: id });
    await fornecedor.carregar();

    res.send(JSON.stringify(fornecedor));
  } catch (err) {
    res.send(JSON.stringify({ Erro : err.message }));
  }
});

module.exports = roteador;