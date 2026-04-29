export const errormiddleware = (err, req, res, next) => {
    //solo en desarrollo
    console.error(err.stack || err);
    res.status(err.status || 500).json({
        message: err.message || "Error interno del servidor",
        details: err.details || null
    });
}