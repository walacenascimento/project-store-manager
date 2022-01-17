const Joi = require('@hapi/joi');
const models = require('../models/salesModel');

const validateJoi = Joi.array().items(
    Joi.object({
        productId: Joi.string().hex().length(24),
        quantity: Joi.number().min(1).required(),
    }),
);

const salesCreate = async (array) => {
    const errorObj = {
        code: 'invalid_data',
        status: 422,
        message: 'Wrong product ID or invalid quantity',
    };

    const { error } = validateJoi.validate(array);

    if (error) throw errorObj;

    const { insertedId } = await models.create(array);

    const newProduct = { _id: insertedId, itensSold: array };

    return newProduct;
};

// Requisito 6
const findAllSales = async () => {
  const findSales = await models.AllSales();

  const allSales = {
      sales: findSales,
  };

  return allSales;
};

const findSalesId = async (id) => {
  const sale = await models.SalesId(id);

    const objErrorNotFound = {
        code: 'not_found',
        status: 404,
        message: 'Sale not found',
    };

    if (!sale) throw objErrorNotFound;

    return sale;
};

// Requisito 7
const salesUpdate = async (id, productId, quantityProduct) => {
  const errorObj = {
    code: 'invalid_data',
    status: 422,
    message: 'Wrong product ID or invalid quantity',
};

if (quantityProduct <= 0) throw errorObj;
if (typeof quantityProduct !== 'number') throw errorObj;

const { _id, itensSold } = await models.SalesUp(id, productId, quantityProduct);

const product = { _id, itensSold };

return product;
};

// Requisito 8
const saleDelete = async (id) => {
  const sale = await models.saleDel(id);

    return sale;
};

module.exports = {
  salesCreate,
  findAllSales,
  findSalesId,
  salesUpdate,
  saleDelete,
};
