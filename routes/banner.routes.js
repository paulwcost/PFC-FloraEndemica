const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth.middleware');
const Banner = require('../models/banner');

// GET /banner - Lista todos os banners
router.get('/', async (req, res) => {
  try {
    const banners = await Banner.find();
    res.json(banners);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar banners' });
  }
});

// GET /banner/:id - Busca um banner por ID
router.get('/:id', async (req, res) => {
  try {
    const banner = await Banner.findById(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner não encontrado' });
    res.json(banner);
  } catch (err) {
    res.status(500).json({ message: 'Erro ao buscar banner' });
  }
});

// POST /banner - Cria um novo banner
router.post('/', protect, async (req, res) => {
  try {
    const novoBanner = new Banner(req.body);
    const bannerSalvo = await novoBanner.save();
    res.status(201).json(bannerSalvo);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao criar banner' });
  }
});

// PUT /banner/:id - Atualiza um banner existente
router.put('/:id', protect, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!banner) return res.status(404).json({ message: 'Banner não encontrado' });
    res.json(banner);
  } catch (err) {
    res.status(400).json({ message: 'Erro ao atualizar banner' });
  }
});

// DELETE /banner/:id - Remove um banner
router.delete('/:id', protect, async (req, res) => {
  try {
    const banner = await Banner.findByIdAndDelete(req.params.id);
    if (!banner) return res.status(404).json({ message: 'Banner não encontrado' });
    res.json({ message: 'Banner removido com sucesso' });
  } catch (err) {
    res.status(500).json({ message: 'Erro ao remover banner' });
  }
});

module.exports = router;
