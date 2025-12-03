const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

// POST /auth/login - Rota de login
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Usuário e senha são obrigatórios.' });
    }

    try {
        // 1. Encontrar o usuário pelo username
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(401).json({ error: 'Credenciais inválidas.' }); // Usuário não encontrado
        }

        // 2. Comparar a senha fornecida com a senha hash no banco de dados
        const isMatch = await user.comparePassword(password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Credenciais inválidas.' }); // Senha incorreta
        }

        // 3. Gerar um token JWT
        const payload = {
            id: user._id,
            username: user.username,
            role: user.role
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' } // Token expira em 1 hora
        );

        // 4. Enviar o token como resposta
        res.json({ token });

    } catch (error) {
        console.error('Erro no processo de login:', error);
        res.status(500).json({ error: 'Erro interno do servidor.' });
    }
});

module.exports = router;
