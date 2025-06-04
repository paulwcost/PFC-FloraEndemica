const express = require('express');
const Footer = require('../models/footer');
const { protect } = require('../middleware/auth.middleware');
const router = express.Router();

// GET /footer - Retorna os dados do footer
router.get('/', async (req, res) => {
    try {
        const footer = await Footer.find();
        // Geralmente só haverá um documento de footer, então podemos retornar o primeiro encontrado
        res.json(footer[0]);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /footer - Cria os dados do footer
router.post('/', protect, async (req, res) => {
    const footer = new Footer(req.body);
    try {
        const newFooter = await footer.save();
        res.status(201).json(newFooter);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /footer/:id - Atualiza os dados do footer (pelo ID do documento, se necessário)
router.put('/:id', protect, async (req, res) => {
    try {
        const footer = await Footer.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!footer) {
            return res.status(404).json({ message: 'Footer não encontrado' });
        }
        res.json(footer);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /footer/:id - Deleta os dados do footer (cuidado com isso)
router.delete('/:id', protect, async (req, res) => {
    try {
        const footer = await Footer.findByIdAndDelete(req.params.id);
        if (!footer) {
            return res.status(404).json({ message: 'Footer não encontrado' });
        }
        res.json({ message: 'Footer deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;