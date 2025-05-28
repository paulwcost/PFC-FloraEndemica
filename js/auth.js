// Função auxiliar para obter o token do localStorage
function getAuthToken() {
    return localStorage.getItem('authToken');
}

// Lógica de login
const loginForm = document.getElementById('login-form');
if (loginForm) {
    loginForm.addEventListener('submit', async function (event) {
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        try {
            const response = await fetch('https://plataforma-de-dados-com-login.onrender.com/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || 'Falha no login');
            }
            const data = await response.json();
            localStorage.setItem('authToken', data.token);
            window.location.href = 'admin_lista_especies.html';
        } catch (error) {
            const erroEl = document.getElementById('login-erro');
            if (erroEl) {
                erroEl.textContent = error.message;
                erroEl.style.display = 'block';
            } else {
                alert(error.message);
            }
        }
    });
}

// Função de logout
function logout() {
    localStorage.removeItem('authToken');
    window.location.href = 'admin_login.html';
}

// Proteção de rotas administrativas
function protegerRota() {
    if (!getAuthToken()) {
        window.location.href = 'admin_login.html';
    }
}
