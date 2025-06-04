const express = require('express');
const Metodologia = require('../models/metodologia');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

// GET /metodologia - Retorna os dados da metodologia
router.get('/', async (req, res) => {
    try {
        const metodologia = await Metodologia.find();
        // Geralmente só haverá um documento de metodologia, então podemos retornar o primeiro encontrado
        res.json(metodologia[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /metodologia - Cria os dados da metodologia
router.post('/', protect, async (req, res) => {
    const metodologia = new Metodologia(req.body);
    try {
        const newMetodologia = await metodologia.save();
        res.status(201).json(newMetodologia);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /metodologia/:id - Atualiza os dados da metodologia (pelo ID do documento, se necessário)
router.put('/:id', protect, async (req, res) => {
    try {
        const metodologia = await Metodologia.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!metodologia) {
            return res.status(404).json({ message: 'Metodologia não encontrada' });
        }
        res.json(metodologia);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /metodologia/:id - Deleta os dados da metodologia (cuidado com isso)
router.delete('/:id', protect, async (req, res) => {
    try {
        const metodologia = await Metodologia.findByIdAndDelete(req.params.id);
        if (!metodologia) {
            return res.status(404).json({ message: 'Metodologia não encontrada' });
        }
        res.json({ message: 'Metodologia deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;