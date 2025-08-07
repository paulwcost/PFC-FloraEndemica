const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Para o Express entender dados JSON nas requisições

// Importar as rotas
// js/server.js

const bannerRoutes = require('../routes/banner.routes.js');
const colaboradorRoutes = require('../routes/colaborador.routes.js');
const destaqueRoutes = require('../routes/destaques.routes.js');
const especieLocalRoutes = require('../routes/especie_local.routes.js');
const footerRoutes = require('../routes/footer.routes.js');
const headerRoutes = require('../routes/header.routes.js');
const metodologiaRoutes = require('../routes/metodologia.routes.js');

// Usar as rotas
app.use('/banner', bannerRoutes);
app.use('/colaboradores', colaboradorRoutes);
app.use('/destaques', destaqueRoutes);
app.use('/especies-locais', especieLocalRoutes);
app.use('/footer', footerRoutes);
app.use('/header', headerRoutes);
app.use('/metodologia', metodologiaRoutes);

// Conexão com o MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});