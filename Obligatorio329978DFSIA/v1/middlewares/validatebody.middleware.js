export const validateBodyMiddleware = (schema) => (req, res, next) => {
  const { value, error } = schema.validate(req.body, {
    abortEarly: false,
  });
  if (error) {
    return res
      .status(400)
      .json({ mensaje: "error en validacion", error: error.details });
  }
  req.validatedBody = value;
  next();
};
