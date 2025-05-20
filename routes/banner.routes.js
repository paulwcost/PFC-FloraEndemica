const express = require('express');
const Banner = require('../models/banner');
const router = express.Router();

// GET /banner - Retorna todos os banners
router.get('/', async (req, res) => {
    try {
        const banners = await Banner.find();
        res.json(banners);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /banner/:id - Retorna um banner específico por ID
router.get('/:id', async (req, res) => {
    try {
        const banner = await Banner.findById(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner não encontrado' });
        }
        res.json(banner);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /banner - Cria um novo banner
router.post('/', async (req, res) => {
    const banner = new Banner(req.body);
    try {
        const newBanner = await banner.save();
        res.status(201).json(newBanner);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /banner/:id - Atualiza um banner existente
router.put('/:id', async (req, res) => {
    try {
        const banner = await Banner.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!banner) {
            return res.status(404).json({ message: 'Banner não encontrado' });
        }
        res.json(banner);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /banner/:id - Deleta um banner
router.delete('/:id', async (req, res) => {
    try {
        const banner = await Banner.findByIdAndDelete(req.params.id);
        if (!banner) {
            return res.status(404).json({ message: 'Banner não encontrado' });
        }
        res.json({ message: 'Banner deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;