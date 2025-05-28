// routes/user.routes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const { protect } = require('../middleware/auth.middleware');

// Criar novo usuário (não protegido para permitir criação inicial)
router.post('/', async (req, res) => {
  try {

    console.log('Dados recebidos:', req.body); // Log dos dados recebidos
    const { username, password, role, nome, email } = req.body;
    const user = new User({ username, password, role, nome, email });
    await user.save();
    console.log('Usuário criado:', user); // Log do usuário criado
    res.status(201).json({ message: 'Usuário criado com sucesso!' });
  } catch (err) {
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Nome de usuário já existe.' });
    }
    res.status(500).json({ error: 'Erro ao criar usuário.' });
  }
});

// Listar todos os usuários
router.get('/', protect, async (req, res) => {
  try {
    const users = await User.find({}, '-password'); // Não retorna a senha
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuários.' });
  }
});

// Obter usuário por ID
router.get('/:id', protect, async (req, res) => {
  try {
    const user = await User.findById(req.params.id, '-password');
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: 'Erro ao buscar usuário.' });
  }
});

// Atualizar usuário
router.put('/:id', protect, async (req, res) => {
  try {
    const { username, password, role } = req.body;
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    if (username) user.username = username;
    if (role) user.role = role;
    if (password) user.password = password;
    await user.save();
    res.json({ message: 'Usuário atualizado com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao atualizar usuário.' });
  }
});

// Excluir usuário
router.delete('/:id', protect, async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) return res.status(404).json({ error: 'Usuário não encontrado.' });
    res.json({ message: 'Usuário excluído com sucesso!' });
  } catch (err) {
    res.status(500).json({ error: 'Erro ao excluir usuário.' });
  }
});

module.exports = router;
