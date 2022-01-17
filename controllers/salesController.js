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

module.exports = {
  createSales,
  getAllSales,
  getSalesId,
};
