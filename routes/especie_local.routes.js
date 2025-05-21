const express = require('express');
const EspecieLocal = require('../models/especie_local');
const router = express.Router();

// GET /especies-locais - Retorna todas as espécies locais
router.get('/', async (req, res) => {
    try {
        const especiesLocais = await EspecieLocal.find();
        res.json(especiesLocais);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// GET /especies-locais/:id - Retorna uma espécie local específica por ID
router.get('/:id', async (req, res) => {
    try {
        const especieLocal = await EspecieLocal.findById(req.params.id);
        if (!especieLocal) {
            return res.status(404).json({ message: 'Espécie local não encontrada no GET por ID' });
        }
        res.json(especieLocal);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// POST /especies-locais - Cria uma nova espécie local
router.post('/', async (req, res) => {
    const especieLocal = new EspecieLocal(req.body);
    try {
        const newEspecieLocal = await especieLocal.save();
        res.status(201).json(newEspecieLocal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// PUT /especies-locais/:id - Atualiza uma espécie local existente
router.put('/:id', async (req, res) => {
    try {
        const especieLocal = await EspecieLocal.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!especieLocal) {
            return res.status(404).json({ message: 'Espécie local não encontrada no PUT por ID' });
        }
        res.json(especieLocal);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// DELETE /especies-locais/:id - Deleta uma espécie local
router.delete('/:id', async (req, res) => {
    try {
        const especieLocal = await EspecieLocal.findByIdAndDelete(req.params.id);
        if (!especieLocal) {
            return res.status(404).json({ message: 'Espécie local não encontrada ao DELETAR por ID' });
        }
        res.json({ message: 'Espécie local deletada com sucesso' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;