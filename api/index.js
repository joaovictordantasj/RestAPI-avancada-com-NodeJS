const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const config = require('config');
const NaoEncontrado = require('./erros/NaoEncontrado');
const CampoInvalido = require('./erros/CampoInvalido');
const DadosNaoFornecidos = require('./erros/DadosNaoFornecidos');

app.use(bodyParser.json());

const roteador = require('./rotas/fornecedores')
app.use('/api/fornecedores', roteador);

app.use((err, req, res, proximo) => {
  let status = 500;

  if (err instanceof NaoEncontrado) {
    status = 404;
  } 

  if (err instanceof CampoInvalido || err instanceof DadosNaoFornecidos) {
    status = 400;
  }

  res.status(status);

  res.send(
    JSON.stringify({
      Erro : err.message,
      Id : err.idErro
    })
  );
});

app.listen(config.get('api.porta'), () => console.log('Api Funcionando'));