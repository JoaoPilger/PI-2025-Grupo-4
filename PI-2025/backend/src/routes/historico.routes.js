import express from "express";
import { getSimulacoes } from "../controllers/historico.controller.js";

const router = express.Router();

router.get("/", getSimulacoes);

export default router;