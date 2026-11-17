export const notFoundMiddleware = (req, res) => {
  res.status(404).json({
    error: "Ruta no encontrada",
    path: req.originalUrl,
  });
};

export const errorMiddleware = (error, req, res, next) => {
  if (res.headersSent) {
    return next(error);
  }

  console.error("Error inesperado:", error);

  return res.status(500).json({
    error: "Error interno del servidor",
  });
};
