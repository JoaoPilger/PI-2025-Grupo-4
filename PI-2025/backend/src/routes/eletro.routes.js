import express from 'express';
import { 
  getAllEletros, 
  getEletroById, 
  createEletro, 
  updateEletro, 
  deleteEletro,
  saveEletroDetails,
  updateEletroAtivo,
  deleteEletroComodo
} from '../controllers/eletro.controller.js';

const router = express.Router();

router.get("/", getAllEletros);
router.get("/:id", getEletroById);
router.post("/", createEletro);
router.post("/detalhes", saveEletroDetails);
router.post("/detalhes/ativo/:id", updateEletroAtivo);
router.put("/:id", updateEletro);
router.delete("/:id", deleteEletro);
router.delete("/comodo/:id", deleteEletroComodo);

export default router;