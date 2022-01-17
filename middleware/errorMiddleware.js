module.exports = (err, req, res, _next) => {
  console.log(err);
  if (err.status) {
      return res.status(err.status).json({
          err: { code: err.code, message: err.message },
       });
  }
  return res.status(500).json({ message: 'Internal Server Error' });
};
