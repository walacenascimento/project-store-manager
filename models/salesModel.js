const { ObjectId } = require('mongodb');
const connection = require('./connection');

const errorNotFound = {
  code: 'not_found',
  status: 404,
  message: 'Sale not found',
};

const errorInvalidData = {
  code: 'invalid_data',
  status: 422,
  message: 'Wrong sale ID format',
};

// Requisito 5
const create = async (array) => {
  const connect = await connection();
  const query = await connect.collection('sales').insertOne({ itensSold: array });

  return query;
};

// Requisito 6
const AllSales = async () => {
  const connect = await connection();
    const salesAll = await connect.collection('sales').find({}).toArray();

    return salesAll;
};

const SalesId = async (id) => {
if (!ObjectId.isValid(id)) throw errorNotFound; // objErrorNotFound;

const connect = await connection();
const saleId = await connect.collection('sales').findOne({ _id: ObjectId(id) });

  // console.log(saleId);
  return saleId;
};

// Requisito 7
const SalesUp = async (id, productId, quantity) => {
  // const objErrorNotFound = {
  //   code: 'not_found',
  //   status: 404,
  //   message: 'Sale not found',
// };

if (!ObjectId.isValid(id)) throw errorNotFound; // objErrorNotFound;

const connect = await connection();
await connect.collection('sales').updateOne(
  { _id: ObjectId(id) },
  { $set: { itensSold: [{ productId, quantity }] } },
  );

const sale = await connect.collection('sales').findOne({ _id: ObjectId(id) });

return sale;
};

// Requisito 8
const saleDel = async (id) => {
  if (!ObjectId.isValid(id)) throw errorInvalidData; // errorObj;

    const connect = await connection();
    const saleId = await connect.collection('sales').findOne({ _id: ObjectId(id) });

    if (!saleId) throw errorInvalidData; // errorObj;

    await connect.collection('sales').deleteOne({ _id: ObjectId(id) });

    return saleId;
};

module.exports = {
  create,
  AllSales,
  SalesId,
  SalesUp,
  saleDel,
};
