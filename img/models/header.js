const mongoose = require('mongoose');

const headerSchema = new mongoose.Schema({
    logo: String,
    linksMenu: [
        {
            texto: String,
            url: String,
        },
    ],
    // Adicione outros campos conforme a estrutura do seu header.json
});

module.exports = mongoose.model('Header', headerSchema);