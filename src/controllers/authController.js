const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const secretKey = '9Z5oH!30U560vMbOU@9%#t*T1SW@OR8sPTtwIGcfD0yvcvW9Pa';

async function register(req, res) {
    try {
        const {email, password, userType} = req.body;
        // Verificar si el usuario ya existe en la base de datos
        const existingUser = await User.findByUsername(email);
        if (existingUser) {
            return res.status(200).json({error: 'El usuario ya existe'});
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const userId = await User.createUser(email, hashedPassword, userType);

        const token = jwt.sign({userId, email}, secretKey, {expiresIn: '1h'});
        res.status(201).json({message: 'Registro exitoso', token, user: email, user_type: userType});
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Error al registrar el usuario', err});
    }
}

async function login(req, res) {
    try {
        const {email, password} = req.body;
        const user = await User.findByUsername(email);

        if (!user) {
            return res.status(200).json({error: 'Usuario no encontrado'});
        }

        const validPassword = await bcrypt.compare(password, user.password);

        if (!validPassword) {
            return res.status(200).json({error: 'Contraseña incorrecta'});
        }

        const token = jwt.sign({userId: user.id, email}, secretKey, {expiresIn: '1h'});
        const response = {token, user: user.email, user_type: user.user_type};

        res.json(response);
    } catch (err) {
        console.log(err);
        res.status(500).json({error: 'Error al iniciar sesión', err});
    }
}

function isTokenValid(token) {
    try {
        jwt.verify(token, secretKey);
        return true; // El token es válido
    } catch (err) {
        console.log(err);
        return false; // El token no es válido o ha expirado
    }
}

// Función para verificar la validez del token y devolver el resultado
function verifyToken(req, res) {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(200).json({isValid: false});
    }

    const isValid = isTokenValid(token);
    res.json({isValid});
}


module.exports = {register, login, verifyToken};
