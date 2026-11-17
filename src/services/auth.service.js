import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import * as userModel from "../models/user.model.js";
import {HttpError} from "./http-error.service.js";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const validateCredentials = (email, password) => {
  const normalizedEmail = typeof email === "string" ? email.trim().toLowerCase() : "";
  const normalizedPassword = typeof password === "string" ? password : "";

  if (!normalizedEmail || !normalizedPassword) {
    throw new HttpError(400, "Email y password son obligatorios");
  }
  if (!emailPattern.test(normalizedEmail)) {
    throw new HttpError(400, "El email no tiene un formato válido");
  }

  return {email: normalizedEmail, password: normalizedPassword};
};

export const registerUser = async ({email, password}) => {
  const credentials = validateCredentials(email, password);
  if (credentials.password.length < 8) {
    throw new HttpError(400, "El password debe tener al menos 8 caracteres");
  }

  const existingUser = await userModel.findUserByEmail(credentials.email);
  if (existingUser) {
    throw new HttpError(409, "Ya existe un usuario registrado con ese email");
  }

  const passwordHash = await bcrypt.hash(credentials.password, 12);
  return userModel.createUser({email: credentials.email, passwordHash});
};

export const loginUser = async ({email, password}) => {
  const credentials = validateCredentials(email, password);
  if (typeof process.env.JWT_SECRET !== "string" || process.env.JWT_SECRET.length < 32) {
    throw new HttpError(500, "La autenticación no está configurada en el servidor");
  }

  const user = await userModel.findUserByEmail(credentials.email);
  const passwordMatches = user?.passwordHash
    ? await bcrypt.compare(credentials.password, user.passwordHash)
    : false;

  if (!passwordMatches) {
    throw new HttpError(401, "Email o contraseña incorrectos");
  }

  const token = jwt.sign(
    {email: user.email},
    process.env.JWT_SECRET,
    {subject: user.id, expiresIn: "1h"}
  );

  return {
    token,
    tokenType: "Bearer",
    expiresIn: "1h",
    user: {id: user.id, email: user.email},
  };
};
