const db = require('../database');

const Product = {
    async createProduct(userId, name, sku, quantity, price) {
        try {
            // Verificar si faltan atributos
            if (!userId || !name || !sku || !quantity || !price) {
                throw new Error('Faltan atributos en el producto');
            }

            const [result] = await db.query('INSERT INTO products (user_id, name, sku, quantity, price) VALUES (?, ?, ?, ?, ?)', [userId, name, sku, quantity, price]);
            return result.insertId;
        } catch (err) {
        console.log(err);
            throw err;
        }
    },

    async getProducts() {
        try {
            const [rows] = await db.query('SELECT * FROM products WHERE  deleted_at is null');
            return rows;
        } catch (err) {
        console.log(err);
            throw err;
        }
    },

    async getAllProducts() {
        try {
            // Realizar la consulta para obtener todos los productos y el email del usuario asociado
            const sql = `
            SELECT products.*, users.email
            FROM products
            LEFT JOIN users ON products.user_id = users.id
            WHERE products.deleted_at is null
        `;
            const [rows] = await db.query(sql);

            // Formatear el resultado para tener una lista de objetos con la información requerida
            const productsWithUserEmail = rows.map((row) => {
                return {
                    id: row.id,
                    user_id: row.user_id,
                    name: row.name,
                    sku: row.sku,
                    quantity: row.quantity,
                    price: row.price,
                    email: row.email
                };
            });

            return productsWithUserEmail;
        } catch (err) {
        console.log(err);
            throw err;
        }
    },

    async getProductsByUserId(userId) {
        try {
            const [rows] = await db.query('SELECT * FROM products WHERE user_id = ? AND deleted_at is null ORDER BY name', [userId]);
            return rows;
        } catch (err) {
        console.log(err);
            throw err;
        }
    },

    async getProductById(productId) {
        try {
            const [rows] = await db.query('SELECT * FROM products WHERE id = ? AND deleted_at is null', [productId]);
            return rows[0];
        } catch (err) {
        console.log(err);
            throw err;
        }
    },

    async getProductByUserIdAndSku(userId, sku) {
        try {
            const [rows] = await db.query('SELECT * FROM products WHERE user_id = ? AND sku = ? AND deleted_at is null', [userId, sku]);
            return rows[0]; // Retorna el primer producto encontrado o undefined si no hay coincidencias
        } catch (err) {
        console.log(err);
            throw err;
        }
    },

    async updateProduct(productId, userId, name, sku, quantity, price) {
        try {
            // Verificar si faltan atributos
            if (!userId || !name || !sku || !quantity || !price) {
                throw new Error('Faltan atributos en el producto');
            }

            const [result] = await db.query('UPDATE products SET user_id = ?, name = ?, sku = ?, quantity = ?, price = ?, updated_at = NOW() WHERE id = ?', [userId, name, sku, quantity, price, productId]);
            return result.affectedRows > 0;
        } catch (err) {
        console.log(err);
            throw err;
        }
    },

    async deleteProduct(productId) {
        try {
            const [result] = await db.query('UPDATE products SET deleted_at = NOW() WHERE id = ?', [productId]);
            return result.affectedRows > 0;
        } catch (err) {
        console.log(err);
            throw err;
        }
    },
};

module.exports = Product;
