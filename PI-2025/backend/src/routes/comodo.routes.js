import express from 'express';
import { createComodo, updateComodoNome, getComodosByCliente, toggleComodoStatus } from '../controllers/comodo.controller.js';

const router = express.Router();

router.post('/', createComodo);
router.get('/', getComodosByCliente);
router.put('/:id', updateComodoNome);
router.patch('/:id/status', toggleComodoStatus);

export default router;


