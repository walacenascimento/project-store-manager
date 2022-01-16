const connection = require('./connection');

const create = async (array) => {
  const connect = await connection();
  const query = await connect.collection('sales').insertOne({ itensSold: array });

  return query;
};

module.exports = {
  create,
};
