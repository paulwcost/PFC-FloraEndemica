const mongoose = require('mongoose');

const especieLocalSchema = new mongoose.Schema({
    nomeCientifico: String,
    nomePopular: String,
    descricao: String,
    habitat: String,
    // Adicione outros campos conforme a estrutura do seu especie_local.json
});

module.exports = mongoose.model('EspecieLocal', especieLocalSchema);
