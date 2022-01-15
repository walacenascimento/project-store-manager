const connection = require('./connection'); // importando o arquivo de conexão do banco de dados

// função que irá fazer a conexão com o banco de dados e irá executar a query responsável pela inserção dos dados no banco de dados
const create = async (name, quantity) => {
  const connect = await connection(); // conexão com o banco de dados
  const { insertedId } = await connect.collection('products').insertOne({ name, quantity }); // query que irá inserir as informações no banco
    // return { id: insertedId };
  return insertedId;
};

// função que verifica se já existe algum produto no banco de dado fazendo o filtro pelo nome do prodtu
const findProductName = async (name) => {
  const connect = await connection(); // conexão com o banco de dados
  const productNameExist = await connect.collection('products').findOne({ name });// query que executa o filtro, que irá buscar o produto pelo nome.

  return productNameExist; // Retorna o resultado da query que foi executada
};

module.exports = {
  create,
  findProductName,
};
