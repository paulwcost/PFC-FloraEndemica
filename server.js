const express = require('express');
const compression = require('compression');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const helmet = require('helmet'); // Importa o Helmet

dotenv.config(); // Carrega as variáveis de ambiente do arquivo .env

const app = express();
const port = process.env.PORT || 3000;

// Middlewares
app.use(cors());
app.use(express.json()); // Para o Express entender dados JSON nas requisições
app.use(compression()); // Ativa compressão Gzip para todas as respostas

// Limite de requisições para rotas sensíveis (exemplo: login)
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutos
    max: 10, // Limita a 10 requisições por IP por janela
    message: 'Muitas tentativas de login. Tente novamente em 15 minutos.'
});
app.use('/auth/login', authLimiter);
app.use(express.static('.')); // Servir arquivos estáticos da raiz do projeto

// Configuração do Helmet para segurança dos headers
app.use(helmet());
app.use(helmet.contentSecurityPolicy({
    directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'"], // Pode precisar de ajuste dependendo dos scripts externos
        styleSrc: ["'self'", "'unsafe-inline'"], // Pode precisar de ajuste dependendo dos estilos externos
        imgSrc: ["'self'", "data:", "https://*"] // Permite imagens de self, data URIs e qualquer HTTPS
    }
}));
app.use(helmet.frameguard({ action: 'DENY' })); // X-Frame-Options
app.use(helmet.noSniff()); // X-Content-Type-Options
app.use(helmet.referrerPolicy({ policy: 'no-referrer-when-downgrade' })); // Referrer-Policy
app.use(helmet.hsts({
    maxAge: 31536000, // 1 ano em segundos
    includeSubDomains: true,
    preload: true
}));

// Importar as rotas
const bannerRoutes = require('./routes/banner.routes');
const colaboradorRoutes = require('./routes/colaborador.routes');
const destaqueRoutes = require('./routes/destaques.routes');
const especieLocalRoutes = require('./routes/especie_local.routes');
const footerRoutes = require('./routes/footer.routes');
const headerRoutes = require('./routes/header.routes');
const metodologiaRoutes = require('./routes/metodologia.routes');
const userRoutes = require('./routes/user.routes');
const authRoutes = require('./routes/auth.routes');

// Usar as rotas
app.use('/banner', bannerRoutes);
app.use('/colaboradores', colaboradorRoutes);
app.use('/destaques', destaqueRoutes);
app.use('/especies-locais', especieLocalRoutes);
app.use('/footer', footerRoutes);
app.use('/header', headerRoutes);
app.use('/metodologia', metodologiaRoutes);
app.use('/users', userRoutes);
app.use('/auth', authRoutes);

// Conexão com o MongoDB
const mongoURI = process.env.MONGO_URI;

mongoose.connect(mongoURI)
.then(() => console.log('Conectado ao MongoDB'))
.catch((err) => console.error('Erro ao conectar ao MongoDB:', err));

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});


