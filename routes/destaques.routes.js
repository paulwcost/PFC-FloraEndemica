const express = require('express');
const Destaque = require('../models/destaque');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

// GET /destaques - Retorna todos os destaques
router.get('/', async (req, res) => {
    try {
        const destaques = await Destaque.find();
        res.json(destaques);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /destaques/:id - Retorna um destaque específico por ID
router.get('/:id', async (req, res) => {
    try {
        const destaque = await Destaque.findById(req.params.id);
        if (!destaque) {
            return res.status(404).json({ message: 'Destaque não encontrado' });
        }
        res.json(destaque);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /destaques - Cria um novo destaque
router.post('/', protect, async (req, res) => {
    const destaque = new Destaque(req.body);
    try {
        const newDestaque = await destaque.save();
        res.status(201).json(newDestaque);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /destaques/:id - Atualiza um destaque existente
router.put('/:id', protect, async (req, res) => {
    try {
        const destaque = await Destaque.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!destaque) {
            return res.status(404).json({ message: 'Destaque não encontrado' });
        }
        res.json(destaque);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /destaques/:id - Deleta um destaque
router.delete('/:id', protect, async (req, res) => {
    try {
        const destaque = await Destaque.findByIdAndDelete(req.params.id);
        if (!destaque) {
            return res.status(404).json({ message: 'Destaque não encontrado' });
        }
        res.json({ message: 'Destaque deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;