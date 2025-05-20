const mongoose = require('mongoose');

const destaqueSchema = new mongoose.Schema({
    titulo: String,
    texto: String,
    imagem: String,
    dataPublicacao: Date,
    // Adicione outros campos conforme a estrutura do seu destaques.json
});

module.exports = mongoose.model('Destaque', destaqueSchema);