const express = require('express');
const bodyParser = require('body-parser');

const {
  createProduct,
  getAllProducts,
  getProductId,
  updateProduct,
  deleteProduct,
} = require('./controllers/productController');

const {
  createSales,
  getAllSales,
  getSalesId,
  updateSales,
  deleteSales,
} = require('./controllers/salesController');

const error = require('./middleware/errorMiddleware');

const app = express();

app.use(bodyParser.json());

const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
response.send();
});

app.get('/', (req, res) => res.send('Testando a conexão!'));

// Requisistos 1,2,3,4
app.post('/products', createProduct); // Verbo http usando o método Post, recebendo a rota /products e o middleware createProduct que vem da camada de controllers.
app.get('/products', getAllProducts); // Lista todos os produtos
app.get('/products/:id', getProductId); // lista os produtos pelo id
app.put('/products/:id', updateProduct); // atualiza os produtos individualmente, pelo id de cada um.
app.delete('/products/:id', deleteProduct);

// Requisitos 5,6,7,8
app.post('/sales', createSales);
app.get('/sales', getAllSales);
app.get('/sales/:id', getSalesId);
app.put('/sales/:id', updateSales);
app.delete('/sales/:id', deleteSales);

app.use(error);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
