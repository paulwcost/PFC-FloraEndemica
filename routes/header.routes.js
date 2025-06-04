const express = require('express');
const Header = require('../models/header');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

// GET /header - Retorna os dados do cabeçalho
router.get('/', async (req, res) => {
    try {
        const header = await Header.find();
        // Geralmente só haverá um documento de cabeçalho, então podemos retornar o primeiro encontrado
        res.json(header[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /header - Cria os dados do cabeçalho
router.post('/', protect, async (req, res) => {
    const header = new Header(req.body);
    try {
        const newHeader = await header.save();
        res.status(201).json(newHeader);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /header/:id - Atualiza os dados do cabeçalho (pelo ID do documento, se necessário)
router.put('/:id', protect, async (req, res) => {
    try {
        const header = await Header.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!header) {
            return res.status(404).json({ message: 'Cabeçalho não encontrado' });
        }
        res.json(header);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /header/:id - Deleta os dados do cabeçalho (cuidado com isso)
router.delete('/:id', protect, async (req, res) => {
    try {
        const header = await Header.findByIdAndDelete(req.params.id);
        if (!header) {
            return res.status(404).json({ message: 'Cabeçalho não encontrado' });
        }
        res.json({ message: 'Cabeçalho deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;