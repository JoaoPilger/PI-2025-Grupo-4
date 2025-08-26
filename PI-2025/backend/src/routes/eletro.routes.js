import express from 'express';
import { 
  getAllEletros, 
  getEletroById, 
  createEletro, 
  updateEletro, 
  deleteEletro,
  saveEletroDetails
} from '../controllers/eletro.controller.js';

const router = express.Router();

router.get("/", getAllEletros);
router.get("/:id", getEletroById);
router.post("/", createEletro);
router.post("/detalhes", saveEletroDetails);
router.put("/:id", updateEletro);
router.delete("/:id", deleteEletro);

export default router;