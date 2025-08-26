import express from 'express';
import { loginUser, logOut, sessionVer } from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', logOut);
router.get('/session', sessionVer);

export default router;