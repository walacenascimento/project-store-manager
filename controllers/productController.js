const services = require('../services/productServices'); //  importando o productsSevices da camada de serviço e armazenando na constante services.

// Middleware createPorduto, responsavel pela requisição da função productCreate quem vem da camada de serviço.
const createProduct = async (req, res, _next) => {
    const { name, quantity } = req.body;
    // console.log(name, quantity);
    const newProduct = await services.productCreate(name, quantity); // constante newProduct que armazena o resultado da chamada da função productCreate que vem da camada de services

    if (newProduct.status) {
      const error = {
        err: { code: 'invalid_data', message: newProduct.message },
      }; // condição que verificar o status da constante newProduct que armazena o resultado da chamada da função productCreate.

      return res.status(newProduct.status).json(error);// retorno do requisção com status de erro.
    }

    return res.status(201).json(newProduct);//  retorno requisição com status de OK!
};

module.exports = {
  createProduct,
}; // modulo de exportação das funções.
