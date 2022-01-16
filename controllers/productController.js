const services = require('../services/productServices'); //  importando o productsSevices da camada de serviço e armazenando na constante services.

// Requisito 1
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

// Requisito 2
// busca todos os produtos
const getAllProducts = async (req, res, _next) => {
  const products = await services.getAllProd();
  return res.status(200).json({ products });
};

// busca o produto pelo Id.
const getProductId = async (req, res, _next) => {
  const { id } = req.params;
  const product = await services.findProductId(id);

  if (product.status) {
     const error = {
       err: {
         code: 'invalid_data', message: product.message,
       },
     };

     return res.status(product.status).json(error);
   }

   return res.status(200).json(product);
};

// Requisito 3
const updateProduct = async (req, res, _next) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const update = await services.updateProd(id, name, quantity);

  if (update.status) {
    const error = {
      err: { code: 'invalid_data', message: update.message },
    };
    return res.status(update.status).json(error);
  }

  return res.status(200).json(update);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProductId,
  updateProduct,
}; // modulo de exportação das funções.
