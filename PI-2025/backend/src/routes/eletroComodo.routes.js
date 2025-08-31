import express from 'express';
import { getAllEletros, getEletroById, deleteEletroComodo } from '../controllers/eletroComodo.controller.js';
const router = express.Router();

router.get("/", getAllEletros);
router.get("/:id", getEletroById);
router.delete("/:id", deleteEletroComodo);

export default router;