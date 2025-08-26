import express from 'express';
import {
  getAllClientes,
  getClienteById,
  createCliente,
  updateCliente,
  deleteCliente
} from '../controllers/cliente.controller.js';

const router = express.Router();

router.get('/', getAllClientes);
router.get('/:id', getClienteById);
router.post('/cadastro', createCliente);
router.put('/update/:id', updateCliente);
router.delete('/delete/:id', deleteCliente);

export default router;
