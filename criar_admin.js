const mongoose = require('mongoose');
const User = require('./models/user.model');

// Troque pela sua string de conexão do MongoDB
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/seu_banco';

mongoose.connect(mongoURI)
  .then(async () => {
    const usuario = new User({
      username: 'admin',
      password: 'senha123', // Troque para uma senha forte!
      role: 'admin'
    });
    await usuario.save();
    console.log('Usuário admin criado com sucesso!');
    mongoose.disconnect();
  })
  .catch(err => {
    console.error('Erro ao conectar/criar usuário:', err);
  });
