const db = require('../database');

const User = {
    async createUser(email, hashedPassword, userType) {
        try {
            const [result] = await db.query('INSERT INTO users (email, password, user_type) VALUES (?, ?, ?)', [email, hashedPassword, userType]);
            return result.insertId;
        } catch (err) {
        console.log(err);
            throw err;
        }
    },

    async findByUsername(email) {
        try {
            const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0];
        } catch (err) {
        console.log(err);
            throw err;
        }
    },
};

module.exports = User;
