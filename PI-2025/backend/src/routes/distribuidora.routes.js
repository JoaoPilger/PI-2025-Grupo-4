import express from 'express';
import {
  getAllDistribuidoras,
  getDistribuidoraById,
  createDistribuidora,
  updateDistribuidora,
  deleteDistribuidora
} from '../controllers/distribuidora.controller.js';

const router = express.Router();

router.get('/', getAllDistribuidoras);
router.get('/:id', getDistribuidoraById);
router.post('/', createDistribuidora);
router.put('/:id', updateDistribuidora);
router.delete('/:id', deleteDistribuidora);

export default router;