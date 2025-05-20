const mongoose = require('mongoose');

const colaboradorSchema = new mongoose.Schema({
    nome: String,
    cargo: String,
    foto: String,
    // Adicione outros campos conforme a estrutura do seu colaborador.json
});

module.exports = mongoose.model('Colaborador', colaboradorSchema);