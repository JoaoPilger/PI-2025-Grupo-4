import express from "express";
import { criarSimulacao } from "../controllers/simulacao.controller.js";

const router = express.Router();

// Middleware simples de autenticação
function authMiddleware(req, res, next) {
  if (!req.session.user) {
    return res.status(401).json({ error: "Usuário não autenticado" });
  }
  next();
}

router.post("/", authMiddleware, criarSimulacao);

export default router;
