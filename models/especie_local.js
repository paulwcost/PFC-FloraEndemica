const mongoose = require('mongoose');

const especieLocalSchema = new mongoose.Schema({
    nome_popular: String,
    nome_cientifico: String,
    familia: String,
    descricao: String,
    status_conservacao: String,

    // Adicione outros campos conforme a estrutura do seu especie_local.json
});

module.exports = mongoose.model('EspecieLocal', especieLocalSchema);
