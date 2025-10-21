const mongoose = require('mongoose');

const footerSchema = new mongoose.Schema({
    textoCopyright: String,
    linksRedesSociais: [
        {
            nome: String,
            url: String,
        },
    ],
    // Adicione outros campos conforme a estrutura do seu footer.json
});

module.exports = mongoose.model('Footer', footerSchema);