export const errormiddleware = (err, req, res, next) => {
  console.error(err);

  res.status(err.statusCode || 500).json({
    message: err.message || "Error interno del servidor",
    details: err.details || null,
  });
};