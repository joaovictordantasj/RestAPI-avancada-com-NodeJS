const TabelaFornecedor = require('./TabelaFornecedor');
class Fornecedor {
  constructor({ id, empresa, email, categoria, dataCriacao, dataAtualizacao, versao }) {
    this.id = id;
    this.empresa = empresa;
    this.email = email;
    this.categoria = categoria;
    this.dataCriacao = dataCriacao;
    this.dataAtualizacao = dataAtualizacao;
    this.versao = versao;
  }

  async criar() {
    const res = await TabelaFornecedor.inserir({
      empresa: this.empresa,
      email: this.email,
      categoria: this.categoria
    });

    this.id = res.id;
    this.dataCriacao = res.dataCriacao;
    this.dataAtualizacao = res.dataAtualizacao;
    this.versao = res.versao;
  }

  async carregar () {
    const encontrado = await TabelaFornecedor.pegarPorId(this.id);
    this.empresa = encontrado.empresa; 
    this.email = encontrado.email; 
    this.categoria = encontrado.categoria; 
    this.dataCriacao = encontrado.dataCriacao; 
    this.dataAtualizacao = encontrado.dataAtualizacao; 
    this.versao = encontrado.versao; 
  }
}

module.exports = Fornecedor;