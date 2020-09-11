import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json'

import {createRoles} from "./libs/initialSeptup";

//Rutas
import productsRoutes from './routes/products.routes';
import authRoutes from './routes/auth.routes';

//Configuraciones del servidor
const app = express();
createRoles();

app.set('pkg', pkg);
app.use(morgan('dev'));
app.use(express.json());

app.use('/api/products',productsRoutes);
app.use('/api/auth',authRoutes);

app.get('/', (req,res)=>{
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    });
})

export default app;