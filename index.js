const express = require('express');
const bodyParser = require('body-parser');

const controllers = require('./controllers/productController');

const app = express();

app.use(bodyParser.json());

const port = 3000;

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
response.send();
});

app.get('/', (req, res) => res.send('Testando a conexão!'));

app.post('/products', controllers.createProduct); // Verbo http usando o método Post, recebendo a rota /products e o middleware createProduct que vem da camada de controllers.
app.get('/products', controllers.getAllProducts); // Lista todos os produtos
app.get('/products/:id', controllers.getProductId); // lista os produtos pelo id
app.put('/products/:id', controllers.updateProduct); // atualiza os produtos individualmente, pelo id de cada um.
app.delete('/products/:id', controllers.deleteProduct);

app.listen(port, () => console.log(`Example app listening on port ${port}!`));
