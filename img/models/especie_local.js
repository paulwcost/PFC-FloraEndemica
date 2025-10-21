const mongoose = require('mongoose');

const especieLocalSchema = new mongoose.Schema({
    nome_popular: String,
    nome_cientifico: String,
    caracteristicas_morfologicas: String,
    familia: String,
    status_conservacao: String,
    descricao: String,
    latitude: Number,
    longitude: Number

    // Adicione outros campos conforme a estrutura do seu especie_local.json
});

module.exports = mongoose.model('EspecieLocal', especieLocalSchema, 'especie_local');
