const services = require('../services/salesServices');

// Requisito 5
const createSales = async (req, res, next) => {
    try {
        const array = req.body;
        const newSale = await services.salesCreate(array);

        return res.status(200).json(newSale);
    } catch (error) {
        console.log(`POST ERROR: ${error}`);
        return next(error);
    }
};

// Requisito 6
const getAllSales = async (req, res, next) => {
  try {
    const allSales = await services.findAllSales();

    return res.status(200).json(allSales);
} catch (error) {
    console.log(`GET ALL ERROR: ${error}`);
    return next(error);
}
};

const getSalesId = async (req, res, next) => {
  try {
    const { id } = req.params;

    const saleId = await services.findSalesId(id);

    return res.status(200).json(saleId);
} catch (error) {
    console.log(`GET SALE BY ID: ${error}`);
    return next(error);
}
};

// Requisto 7
const updateSales = async (req, res, next) => {
  try {
    const { id } = req.params;
    const array = req.body;

    const { productId, quantity } = array[0];

    const update = await services.salesUpdate(id, productId, quantity);

    return res.status(200).json(update);
} catch (error) {
    console.log(`PUT ERROR: ${error}`);
    return next(error);
  }
};

module.exports = {
  createSales,
  getAllSales,
  getSalesId,
  updateSales,
};
