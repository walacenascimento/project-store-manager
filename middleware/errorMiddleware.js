module.exports = (err, req, res, _next) => {
  console.log(err);
  if (err.status) {
      return res.status(err.status).json({
        // err: { code: 'invalid_data', message: err.message }, // Passa o requisito 5
        err: { code: err.code, message: err.message }, // passa o requisito 6 e quebra o requisito 5
       });
  }
  return res.status(500).json({ message: 'Internal Server Error' });
};
