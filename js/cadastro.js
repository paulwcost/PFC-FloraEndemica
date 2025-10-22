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

        // Monta o corpo da requisição
        const bodyData = { nome, email, username, password, role };

        try {
            const response = await fetch('https://plataforma-de-dados-com-login.onrender.com/auth/cadastro', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(bodyData)
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Erro ao cadastrar usuário');
            }

            alert('Cadastro realizado com sucesso! Faça login para acessar.');
            window.location.href = 'admin_login.html';
        } catch (error) {
            erroEl.textContent = error.message;
            erroEl.style.display = 'block';
        }
    });
}

// Mostra ou esconde o campo Currículo Lattes
const roleSelect = document.getElementById("role");
const curriculoLattesGroup = document.getElementById("curriculoLattesGroup");
const curriculoLattesInput = document.getElementById("curriculoLattes");
const areaAtuacaoSelect = document.getElementById("areaAtuacao");

if (roleSelect) {
    roleSelect.addEventListener("change", function() {
        if (this.value === "pesquisador") {
            curriculoLattesGroup.style.display = "block";
            curriculoLattesInput.required = true;
            areaAtuacaoSelect.required = true;
        } else {
            curriculoLattesGroup.style.display = "none";
            curriculoLattesInput.required = false;
            areaAtuacaoSelect.required = false;
        }
    });
}
