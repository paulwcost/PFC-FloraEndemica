const express = require('express');
const router = express.Router();

// Exemplo de rota POST
router.post('/', (req, res) => {
  const novoBanner = req.body;
  // Aqui você salvaria no banco de dados, por exemplo
  res.status(201).json({ message: 'Banner criado', data: novoBanner });
});

module.exports = router;
