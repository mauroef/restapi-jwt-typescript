import { Router } from 'express';

const router: Router = Router();

import { TokenValidation } from '../lib/verifyToken';

import { signup, signin, profile } from '../controllers/auth.controller';

router.post('/signup', signup);
router.post('/signin', signin);
router.get('/profile', TokenValidation, profile);

export default router;
