const mongoose = require('mongoose');

const metodologiaSchema = new mongoose.Schema({
    tituloSecao: String,
    conteudo: String,
    // Adicione outros campos conforme a estrutura do seu metodologia.json
});

module.exports = mongoose.model('Metodologia', metodologiaSchema);