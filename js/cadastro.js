// cadastro.js
const cadastroForm = document.getElementById('cadastro-form');
const erroEl = document.getElementById('cadastro-erro');

if (cadastroForm) {
    cadastroForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        erroEl.style.display = 'none';
        const nome = document.getElementById('nome').value;
        const email = document.getElementById('email').value;
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        const confirmarSenha = document.getElementById('confirmar-senha').value;
        const role = document.getElementById('role').value;

        if (password !== confirmarSenha) {
            erroEl.textContent = 'As senhas não coincidem.';
            erroEl.style.display = 'block';
            return;
        }

        try {
            const response = await fetch('https://plataforma-de-dados-com-login.onrender.com/users', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ nome, email, username, password, role })
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Erro ao cadastrar usuário');
            }
            alert('Cadastro realizado com sucesso! Faça login para acessar.');
            window.location.href = 'login.html';
        } catch (error) {
            erroEl.textContent = error.message;
            erroEl.style.display = 'block';
        }
    });
}
