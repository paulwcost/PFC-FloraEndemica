// admin_form_usuario.js
// Formulário de cadastro/edição de usuário
function getIdFromQuery() {
    const params = new URLSearchParams(window.location.search);
    return params.get('id');
}

const form = document.getElementById('formUsuario');
const erroEl = document.getElementById('usuario-erro');
const id = getIdFromQuery();

if (id) {
    document.getElementById('titulo-form').textContent = 'Editar Usuário';
    carregarUsuario(id);
    document.getElementById('password').required = false;
    document.getElementById('confirm_password').required = false;
}

async function carregarUsuario(id) {
    try {
        const response = await fetch(`https://plataforma-de-dados-com-login.onrender.com/users/${id}`, {
            headers: {
                'Authorization': 'Bearer ' + (getAuthToken ? getAuthToken() : localStorage.getItem('authToken'))
            }
        });
        if (!response.ok) throw new Error('Erro ao buscar usuário');
        const usuario = await response.json();
        document.getElementById('id').value = usuario._id;
        document.getElementById('username').value = usuario.username;
        document.getElementById('role').value = usuario.role;
    } catch (error) {
        erroEl.textContent = error.message;
        erroEl.style.display = 'block';
    }
}

form.addEventListener('submit', async function (e) {
    e.preventDefault();
    erroEl.style.display = 'none';
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const confirm_password = document.getElementById('confirm_password').value;
    const role = document.getElementById('role').value;
    if (password !== confirm_password) {
        erroEl.textContent = 'As senhas não coincidem.';
        erroEl.style.display = 'block';
        return;
    }
    const payload = { username, role };
    if (password) payload.password = password;
    const method = id ? 'PUT' : 'POST';
    const url = id ? `/users/${id}` : '/users';
    try {
        const response = await fetch(url, {
            method,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (getAuthToken ? getAuthToken() : localStorage.getItem('authToken'))
            },
            body: JSON.stringify(payload)
        });
        if (!response.ok) {
            const data = await response.json();
            throw new Error(data.error || 'Erro ao salvar usuário');
        }
        alert('Usuário salvo com sucesso!');
        window.location.href = 'admin_lista_usuarios.html';
    } catch (error) {
        erroEl.textContent = error.message;
        erroEl.style.display = 'block';
    }
});
