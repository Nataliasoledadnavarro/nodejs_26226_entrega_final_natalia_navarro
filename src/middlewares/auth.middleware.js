import jwt from "jsonwebtoken";

export const authMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;
  const prefix = "Bearer ";
  if (!authHeader) {
    return res.status(401).json({error: "Acceso denegado"});
  }
  if (!authHeader.startsWith(prefix)) {
    return res.status(401).json({error: "Formato de token no válido"});
  }

  const token = authHeader.slice(prefix.length).trim();
  if (!token) {
    return res.status(401).json({error: "Token no proporcionado"});
  }

  if (typeof process.env.JWT_SECRET !== "string" || process.env.JWT_SECRET.length < 32) {
    return res.status(500).json({error: "La autenticación no está configurada en el servidor"});
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET, {algorithms: ["HS256"]});
    req.user = decoded;
    return next();
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(401).json({error: "El token expiró"});
    }

    return res.status(401).json({error: "Token inválido"});
  }
};