import { Router } from 'express';
import { generateProducts } from '../controllers/productController';

const router = Router();

// Rota para gerar produtos
router.post('/generate', generateProducts);

export default router;
