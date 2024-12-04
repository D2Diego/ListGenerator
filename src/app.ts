import express from 'express';
import productRoutes from './routes/productRoutes';

export const app = express();

// Middleware para JSON
app.use(express.json());

// Registro das rotas
app.use('/api/products', productRoutes);
