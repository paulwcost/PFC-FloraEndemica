const express = require('express');
const { protect } = require('../middleware/auth.middleware');

const Colaborador = require('../models/colaborador');

const router = express.Router();

// GET /colaboradores - Retorna todos os colaboradores
router.get('/', async (req, res) => {
    try {
        const colaboradores = await Colaborador.find();
        res.json(colaboradores);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /colaboradores/:id - Retorna um colaborador específico por ID
router.get('/:id', async (req, res) => {
    try {
        const colaborador = await Colaborador.findById(req.params.id);
        if (!colaborador) {
            return res.status(404).json({ message: 'Colaborador não encontrado' });
        }
        res.json(colaborador);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /colaboradores - Cria um novo colaborador
router.post('/', protect, async (req, res) => {
    const colaborador = new Colaborador(req.body);
    try {
        const newColaborador = await colaborador.save();
        res.status(201).json(newColaborador);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /colaboradores/:id - Atualiza um colaborador existente
router.put('/:id', protect, async (req, res) => {
    try {
        const colaborador = await Colaborador.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!colaborador) {
            return res.status(404).json({ message: 'Colaborador não encontrado' });
        }
        res.json(colaborador);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /colaboradores/:id - Deleta um colaborador
router.delete('/:id', protect, async (req, res) => {
    try {
        const colaborador = await Colaborador.findByIdAndDelete(req.params.id);
        if (!colaborador) {
            return res.status(404).json({ message: 'Colaborador não encontrado' });
        }
        res.json({ message: 'Colaborador deletado com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;