import express from 'express';
import { createComodo, updateComodoNome } from '../controllers/comodo.controller.js';

const router = express.Router();

router.post('/', createComodo);
router.put('/:id', updateComodoNome);

export default router;


