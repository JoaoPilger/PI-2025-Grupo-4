import express from 'express';
import { createComodo, updateComodoNome, getComodosByCliente } from '../controllers/comodo.controller.js';

const router = express.Router();

router.get('/', getComodosByCliente);
router.post('/', createComodo);
router.put('/:id', updateComodoNome);

export default router;


