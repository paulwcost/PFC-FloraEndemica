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
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            let data = {};
            const contentType = response.headers.get('content-type');
            const text = await response.text();
            if (contentType && contentType.includes('application/json') && text.trim().charAt(0) === '{') {
                try {
                    data = JSON.parse(text);
                } catch (e) {
                    throw new Error('Resposta do servidor não é um JSON válido.');
                }
            } else if (text.trim().charAt(0) === '<') {
                throw new Error('O servidor retornou uma página HTML em vez de JSON. Verifique o endpoint e o backend.');
            }
            if (!response.ok) {
                throw new Error((data && data.error) ? data.error : 'Falha no login');
            }
            if (!data.token) {
                throw new Error('Resposta inválida do servidor.');
            }
            localStorage.setItem('authToken', data.token);
            window.location.href = 'admin_dashboard.html';
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
