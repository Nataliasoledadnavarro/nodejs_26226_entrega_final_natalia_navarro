import * as authService from "../services/auth.service.js";
import {HttpError} from "../services/http-error.service.js";

const handleServiceError = (error, res, next) => {
  if (error instanceof HttpError) {
    return res.status(error.status).json({error: error.message});
  }
  return next(error);
};

export const register = async (req, res, next) => {
  try {
    const user = await authService.registerUser(req.body ?? {});
    return res.status(201).json({
      message: "Usuario creado correctamente",
      user,
    });
  } catch (error) {
    return handleServiceError(error, res, next);
  }
};

export const login = async (req, res, next) => {
  try {
    const session = await authService.loginUser(req.body ?? {});
    return res.json(session);
  } catch (error) {
    return handleServiceError(error, res, next);
  }
};