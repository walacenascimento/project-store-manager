const models = require('../models/productModel');// importando a productModel  da camada de  models
// const Joi = require('@hapy/joi');

// função que valida as regra de negocio dos atributos name e quantity na criação do novo produto no banco
const validateProduct = (name, quantity) => {
  if (name.length < 5) {
    return ({ status: 422, message: '"name" length must be at least 5 characters long' });// condição que verifa se o nome do produto possui menos de 5 caracteres.
  }

  if (quantity <= 0) {
    return ({ status: 422, message: '"quantity" must be larger than or equal to 1' }); // condição que verifica se a quantidade do produto é menor ou igual a 0.
  }

  if (typeof quantity !== 'number') {
    return ({ status: 422, message: '"quantity" must be a number' }); // condição que verifica se o tipo de dado do quantity é diferente de numero.
  }
};

// função que armazena o valor da função create da camada de model e retorna na constante newPordut o novo produto que foi criado pela função create
const productCreate = async (name, quantity) => {
  const productNameExist = await models.findProductName(name); // constante que recebe o valor da função findProductName da camanada de models

  if (productNameExist) {
    return ({ status: 422, message: 'Product already exists' });
  } // condição que verifica se o produto existe

  const productValidate = await validateProduct(name, quantity); // constante que armazena o valor da função validateProduct

  if (productValidate && productValidate.status) {
    return {
      status: productValidate.status,
      message: productValidate.message,
    };
  }// condição que verifica o valor armazenado na constante productValidate e retornar o status e mensagem.

  const newProduct = await models.create(name, quantity);
  return {
    _id: newProduct, name, quantity,
  };
}; // constante que recebe o valor da funçaõ create na camada de model e retorna o novo produto que foi cadastrado

// Requisito 2
// busca todos os produtos
const getAllProd = async () => {
  const getAllProducts = await models.findAllProducts();

    // const allProducts = {
    //   products: getAllProducts,
    // };
  return getAllProducts;
};

// busca os produtos pelo Id
const findProductId = async (id) => {
  const product = await models.findProductById(id);

  if (!product) {
    return {
      status: 422, message: 'Wrong id format',
    };
  }

  return product;
};

// Requisito 3

 const updateProd = async (id, prodName, prodQuantity) => {
   const productValidate = await validateProduct(prodName, prodQuantity);

    if (productValidate && productValidate.status) {
     return {
       status: productValidate.status,
       message: productValidate.message,
      };
    }

    const { _id, name, quantity } = await models.productUpdate(id, prodName, prodQuantity);
    const product = { _id, name, quantity };
     return product;
 };

 // Requisito 4
 const deleteProd = async (id) => {
  const product = await models.deleteProductId(id);

  if (!product) {
      return { status: 422, message: 'Wrong id format',
      };
  }

  return product;
};

module.exports = {
  productCreate,
  getAllProd,
  findProductId,
  updateProd,
  deleteProd,
};
