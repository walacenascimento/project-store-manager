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
        status: 422,
        message: 'Wrong product ID or invalid quantity',
    };

    const { error } = validateJoi.validate(array);

    if (error) throw errorObj;

    const { insertedId } = await models.create(array);

    const newProduct = { _id: insertedId, itensSold: array };

    return newProduct;
};

module.exports = {
  salesCreate,
};
