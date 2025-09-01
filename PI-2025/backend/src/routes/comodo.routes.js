import express from 'express';
import { createComodo, updateComodoNome, getComodosByCliente, toggleComodoStatus, getEletrosByComodo, deleteComodo, toggleComodoVisibilidade } from '../controllers/comodo.controller.js';

const router = express.Router();

router.post('/', createComodo);
router.get('/', getComodosByCliente);
router.get('/:id/eletros', getEletrosByComodo);
router.put('/:id', updateComodoNome);
router.patch('/:id/status', toggleComodoStatus);
router.patch('/:id/visibilidade', toggleComodoVisibilidade);
router.delete('/:id', deleteComodo);

export default router;


