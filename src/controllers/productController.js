// productController.js
const Product = require('../models/Product');

async function createProduct(req, res) {
    try {
        const {name, sku, quantity, price} = req.body;
        const missingFields = [];

        if (!name) missingFields.push('nombre');
        if (!sku) missingFields.push('sku');
        if (!quantity) missingFields.push('cantidad');
        if (!price) missingFields.push('precio');

        if (missingFields.length > 0) {
            return res.status(400).json({error: 'Faltan los siguientes campos: ' + missingFields.join(', ')});
        }

        const userId = req.user.userId; // Obtiene el user_id del usuario autenticado

        // Verificar si ya existe un producto con el mismo sku y user_id
        const existingProduct = await Product.getProductByUserIdAndSku(userId, sku);
        if (existingProduct) {
            return res.status(400).json({error: 'Ya existe un producto con el mismo SKU para este usuario'});
        }

        const productId = await Product.createProduct(userId, name, sku, quantity, price);
        res.status(201).json({message: 'Producto creado exitosamente', productId});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Error al crear el producto'});
    }
}

async function getAllProducts(req, res) {
    try {
        const products = await Product.getProducts();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Error al obtener los productos'});
    }
}

async function getAllProductsAdmin(req, res) {
    try {
        const products = await Product.getAllProducts();
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Error al obtener los productos'});
    }
}

async function getProductsByUserId(req, res) {
    try {
        const userId = req.user.userId; // Obtiene el user_id del usuario autenticado
        const products = await Product.getProductsByUserId(userId);
        res.json(products);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Error al obtener los productos del usuario'});
    }
}

async function getProductById(req, res) {
    try {
        const productId = req.params.id;
        const product = await Product.getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({error: 'Producto no encontrado'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Error al obtener el producto'});
    }
}

async function updateProduct(req, res) {
    try {
        const productId = req.params.id;
        const {name, sku, quantity, price} = req.body;
        const missingFields = [];

        if (!name) missingFields.push('nombre');
        if (!sku) missingFields.push('sku');
        if (!quantity) missingFields.push('cantidad');
        if (!price) missingFields.push('precio');

        if (missingFields.length > 0) {
            return res.status(400).json({error: 'Faltan los siguientes campos: ' + missingFields.join(', ')});
        }

        const userId = req.user.userId; // Obtiene el user_id del usuario autenticado
        // Verificar si ya existe otro producto con el mismo sku y user_id
        const existingProduct = await Product.getProductByUserIdAndSku(userId, sku);
        if (existingProduct && existingProduct.id !== productId) {
            return res.status(400).json({error: 'Ya existe otro producto con el mismo SKU para este usuario'});
        }
        const updated = await Product.updateProduct(productId, userId, name, sku, quantity, price);

        if (updated) {
            res.json({message: 'Producto actualizado exitosamente'});
        } else {
            res.status(404).json({error: 'Producto no encontrado'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Error al actualizar el producto'});
    }
}

async function deleteProduct(req, res) {
    try {
        const productId = req.params.id;
        const deleted = await Product.deleteProduct(productId);
        if (deleted) {
            res.json({message: 'Producto eliminado exitosamente'});
        } else {
            res.status(404).json({error: 'Producto no encontrado'});
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Error al eliminar el producto'});
    }
}

module.exports = {
    createProduct,
    getAllProducts,
    getProductsByUserId,
    getProductById,
    updateProduct,
    deleteProduct,
    getAllProductsAdmin
};
