import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userModel from "../models/user.model.js";

export const register = async (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";

  if (!email || !password) {
    return res.status(400).json({error: "Email y password son obligatorios"});
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({error: "El email no tiene un formato válido"});
  }

  if (password.length < 8) {
    return res.status(400).json({error: "El password debe tener al menos 8 caracteres"});
  }

  const existingUser = await userModel.findUserByEmail(email);
  if (existingUser) {
    return res.status(409).json({error: "Ya existe un usuario registrado con ese email"});
  }

  const passwordHash = await bcrypt.hash(password, 12);
  const user = await userModel.createUser({email, passwordHash});

  return res.status(201).json({
    message: "Usuario creado correctamente",
    user,
  });
};

export const login = async (req, res) => {
  const email = typeof req.body?.email === "string" ? req.body.email.trim().toLowerCase() : "";
  const password = typeof req.body?.password === "string" ? req.body.password : "";

  if (!email || !password) {
    return res.status(400).json({error: "Email y password son obligatorios"});
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return res.status(400).json({error: "El email no tiene un formato válido"});
  }

  if (typeof process.env.JWT_SECRET !== "string" || process.env.JWT_SECRET.length < 32) {
    return res.status(500).json({error: "La autenticación no está configurada en el servidor"});
  }

  try {
    const user = await userModel.findUserByEmail(email);
    const passwordMatches = user?.passwordHash
      ? await bcrypt.compare(password, user.passwordHash)
      : false;

    if (!passwordMatches) {
      return res.status(401).json({error: "Email o contraseña incorrectos"});
    }

    const token = jwt.sign(
      {email: user.email},
      process.env.JWT_SECRET,
      {subject: user.id, expiresIn: "1h"}
    );

    return res.json({
      token,
      tokenType: "Bearer",
      expiresIn: "1h",
      user: {id: user.id, email: user.email},
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    return res.status(500).json({error: "No se pudo iniciar sesión"});
  }
};