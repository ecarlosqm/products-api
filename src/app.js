import express from 'express';
import morgan from 'morgan';
import pkg from '../package.json'

//immport routes
import productsRoutes from './routes/products.routes';

const app = express();

//Configurations
app.set('pkg', pkg);
app.use(morgan('dev'));
app.use(express.json());

app.use('/products',productsRoutes);

app.get('/', (req,res)=>{
    res.json({
        name: app.get('pkg').name,
        author: app.get('pkg').author,
        description: app.get('pkg').description,
        version: app.get('pkg').version,
    });
})

export default app;