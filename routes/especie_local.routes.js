const express = require('express');
const router = express.Router();
const EspecieLocal = require('../models/especie_local.js');

// Rota para criar uma nova espécie (POST)
router.post('/', async (req, res) => {
    try {
        const novaEspecie = new EspecieLocal(req.body);
        await novaEspecie.save();
        res.status(201).json(novaEspecie);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar espécie', error: error.message });
    }
});

// Rota para obter todas as espécies (GET)
router.get('/', async (req, res) => {
    try {
        const especies = await EspecieLocal.find();
        res.json(especies);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar espécies', error: error.message });
    }
});

// Rota para obter uma espécie por ID (GET)
router.get('/:id', async (req, res) => {
    try {
        const especie = await EspecieLocal.findById(req.params.id);
        if (!especie) {
            return res.status(404).json({ message: 'Espécie não encontrada' });
        }
        res.json(especie);
    } catch (error) {
        res.status(500).json({ message: 'Erro ao buscar espécie', error: error.message });
    }
});

// Rota para atualizar uma espécie por ID (PUT)
router.put('/:id', async (req, res) => {
    try {
        const especie = await EspecieLocal.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        if (!especie) {
            return res.status(404).json({ message: 'Espécie não encontrada' });
        }
        res.json(especie);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar espécie', error: error.message });
    }
});

// Rota para deletar uma espécie por ID (DELETE)
router.delete('/:id', async (req, res) => {
    try {
        const especie = await EspecieLocal.findByIdAndDelete(req.params.id);
        if (!especie) {
            return res.status(404).json({ message: 'Espécie não encontrada' });
        }
        res.json({ message: 'Espécie deletada com sucesso' });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao deletar espécie', error: error.message });
    }
});

module.exports = router;
