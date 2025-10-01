// routes/auth.routes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  const user = await User.findOne({ username });
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ error: 'Credenciais inválidas' });
  }

  const token = jwt.sign(
    { userId: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '2h' }
  );

  res.json({ token });
});

module.exports = router;


router.post("/cadastro", async (req, res) => {
  try {
    const { nome, email, username, password, role, curriculoLattes, areaAtuacao } = req.body;

    // Verifica se o usuário já existe
    let user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "Nome de usuário já existe" });
    }

    user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ error: "Email já cadastrado" });
    }

    // Lógica para análise de currículo Lattes (exemplo simplificado)
    if (role === "pesquisador" && (!curriculoLattes || !areaAtuacao)) {
      return res.status(400).json({ error: "Pesquisadores devem fornecer o currículo Lattes e a área de atuação." });
    }

    // Cria um novo usuário
    user = new User({ nome, email, username, password, role, curriculoLattes, areaAtuacao });
    await user.save();

    res.status(201).json({ message: "Usuário cadastrado com sucesso!" });
  } catch (error) {
    console.error("Erro no cadastro:", error);
    res.status(500).json({ error: "Erro interno do servidor" });
  }
});

