import express from 'express';
import { createComodo, updateComodoNome, getComodosByCliente, toggleComodoStatus, getEletrosByComodo } from '../controllers/comodo.controller.js';

const router = express.Router();

router.post('/', createComodo);
router.get('/', getComodosByCliente);
router.get('/:id/eletros', getEletrosByComodo);
router.put('/:id', updateComodoNome);
router.patch('/:id/status', toggleComodoStatus);

export default router;


