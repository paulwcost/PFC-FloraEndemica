const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');

const formData = new FormData();
formData.append('nome', 'Teste');
formData.append('email', 'teste@email.com');
formData.append('username', 'teste');
formData.append('password', '123456');
formData.append('role', 'pesquisador');
formData.append('curriculo', fs.createReadStream('c:\\Users\\Paulo\\Documents\\curriculo.pdf'));

axios.post('http://localhost:3000/cadastro', formData, {
    headers: formData.getHeaders(),
})
.then(response => {
    console.log('Resposta do servidor:', response.data);
})
.catch(error => {
    if (error.response) {
        console.error('Erro na resposta do servidor:', error.response.status, error.response.statusText);
        console.error('Detalhes do erro:', error.response.data);
    } else if (error.request) {
        console.error('Nenhuma resposta recebida do servidor. Detalhes da solicitação:', error.request);
    } else {
        console.error('Erro ao configurar a solicitação:', error.message);
    }
});
