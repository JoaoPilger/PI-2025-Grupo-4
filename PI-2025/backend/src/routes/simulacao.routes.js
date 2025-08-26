import express from 'express';
import { 
  getAllSimulacoes, 
  getSimulacaoById, 
  createSimulacao, 
  updateSimulacao, 
  deleteSimulacao 
} from '../controllers/simulacao.controller.js';

const router = express.Router();

router.get("/", getAllSimulacoes);
router.get("/:id", getSimulacaoById);
router.post("/", createSimulacao);
router.put("/:id", updateSimulacao);
router.delete("/:id", deleteSimulacao);

export default router;