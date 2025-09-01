import express from 'express';
import { createComodo, updateComodoNome, getComodosByCliente, getAllComodosByCliente, toggleComodoStatus, getEletrosByComodo, deleteComodo, toggleComodoVisibilidade } from '../controllers/comodo.controller.js';

const router = express.Router();

router.post('/', createComodo);
router.get('/', getAllComodosByCliente); // Agora retorna todos os cômodos
router.get('/ativos', getComodosByCliente); // Nova rota para apenas cômodos ativos
router.put('/:id', updateComodoNome);
router.patch('/:id/status', toggleComodoStatus);
router.patch('/:id/visibilidade', toggleComodoVisibilidade);
router.delete('/:id', deleteComodo);
router.get('/:id/eletros', getEletrosByComodo); // Mover para o final para evitar conflitos

export default router;


