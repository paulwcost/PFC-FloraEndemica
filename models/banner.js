const mongoose = require('mongoose');

const bannerSchema = new mongoose.Schema({
    titulo: String,
    imagem: String,
    descricao: String,
    // Adicione outros campos conforme a estrutura do seu banner.json
});

module.exports = mongoose.model('Banner', bannerSchema);