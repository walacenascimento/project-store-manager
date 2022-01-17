const { ObjectId } = require('mongodb');
const connection = require('./connection');

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
  const objErrorNotFound = {
    code: 'not_found',
    status: 404,
    message: 'Sale not found',
};

if (!ObjectId.isValid(id)) throw objErrorNotFound;

const connect = await connection();
const saleId = await connect.collection('sales').findOne({ _id: ObjectId(id) });

// console.log(saleId);
return saleId;
};

// Requisito 7
const SalesUp = async (id, productId, quantity) => {
  const objErrorNotFound = {
    code: 'not_found',
    status: 404,
    message: 'Sale not found',
};

if (!ObjectId.isValid(id)) throw objErrorNotFound;

const connect = await connection();
await connect.collection('sales').updateOne(
  { _id: ObjectId(id) },
  { $set: { itensSold: [{ productId, quantity }] } },
  );

const sale = await connect.collection('sales').findOne({ _id: ObjectId(id) });

return sale;
};

module.exports = {
  create,
  AllSales,
  SalesId,
  SalesUp,
};
