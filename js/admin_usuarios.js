// admin_usuarios.js
// Lista usuários, permite editar/excluir
async function carregarUsuarios() {
    const tabela = document.getElementById('tabela-usuarios');
    tabela.innerHTML = '<tr><td colspan="4">Carregando...</td></tr>';
    try {
        const response = await fetch('https://plataforma-de-dados-com-login.onrender.com/users', {
            headers: {
                'Authorization': 'Bearer ' + (getAuthToken ? getAuthToken() : localStorage.getItem('authToken'))
            }
        });
        if (!response.ok) throw new Error('Erro ao buscar usuários');
        const usuarios = await response.json();
        if (!Array.isArray(usuarios) || usuarios.length === 0) {
            tabela.innerHTML = '<tr><td colspan="4">Nenhum usuário encontrado.</td></tr>';
            return;
        }
        tabela.innerHTML = '';
        usuarios.forEach(usuario => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${usuario._id}</td>
                <td>${usuario.username}</td>
                <td>${usuario.role}</td>
                <td>
                    <button class="botao-acao botao-editar" onclick="editarUsuario('${usuario._id}')">Editar</button>
                    <button class="botao-acao botao-excluir" onclick="excluirUsuario('${usuario._id}')">Excluir</button>
                </td>
            `;
            tabela.appendChild(tr);
        });
    } catch (error) {
        tabela.innerHTML = `<tr><td colspan="4">Erro: ${error.message}</td></tr>`;
    }
}

function editarUsuario(id) {
    window.location.href = 'admin_form_usuario.html?id=' + encodeURIComponent(id);
}

async function excluirUsuario(id) {
    if (!confirm('Tem certeza que deseja excluir este usuário?')) return;
    try {
        const response = await fetch(`/users/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Bearer ' + (getAuthToken ? getAuthToken() : localStorage.getItem('authToken'))
            }
        });
        if (!response.ok) throw new Error('Erro ao excluir usuário');
        alert('Usuário excluído com sucesso!');
        carregarUsuarios();
    } catch (error) {
        alert('Erro ao excluir: ' + error.message);
    }
}

window.addEventListener('DOMContentLoaded', carregarUsuarios);
