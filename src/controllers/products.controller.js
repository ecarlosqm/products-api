import Product from '../models/product'

export const createProduct = async (req, res) => {
    const { name, category, price, imgUrl } = req.body;
    const newProduct = new Product({ name, category, price, imgUrl });
    const productSaved = await newProduct.save().catch((err)=>console.error(err));
    res.status(201).json(productSaved);
}

export const getProducts = async (req, res) => {
    const products = await Product.find().catch((err)=>console.error(err));
    res.status(200).json(products);
}

export const getProductById =async (req, res) => {
    const product = await Product.findById(req.params.productId).catch((err)=>console.error(err));
    res.status(200).json(product);
}

export const updateProductById = async (req, res) => {
    const updatedProduct = await Product.findOneAndUpdate(req.params.productId, req.body, {new:true}).catch((err)=>console.error(err));
    res.status(200).json(updatedProduct);
}

export const deleteProductById = async (req, res) => {
    await Product.findOneAndDelete(req.params.productId).catch((err)=>console.error(err));
    res.status(204).json();
}