import express from 'express';
import { loginUser, logOut, sessionVer, loginVerify} from '../controllers/auth.controller.js';
const router = express.Router();

router.post('/login', loginUser);
router.post('/logout', logOut);
router.get('/session', sessionVer);
router.get('/loginVerify', loginVerify);

export default router;