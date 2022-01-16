const services = require('../services/salesServices');

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

module.exports = {
  createSales,
};
