async function carregarEspecies() {
    try {
        const response = await fetch('https://plataforma-de-dados-com-login.onrender.com/especies-locais', {
            headers: {
                'Authorization': 'Bearer ' + (getAuthToken ? getAuthToken() : localStorage.getItem('authToken'))
            }
        });
        if (!response.ok) {
            throw new Error(`Erro HTTP: ${response.status}`);
        }
        const especies = await response.json();
        renderizarEspecies(especies);
    } catch (error) {
        console.error('Erro ao buscar espécies:', error);
        const tabela = document.getElementById('tabela-especies');
        if (tabela) {
            tabela.innerHTML = '<tr><td colspan="4">Erro ao carregar espécies. Verifique sua conexão ou se a API está online.</td></tr>';
        }
    }
}

function renderizarEspecies(especies) {
    const tabela = document.getElementById('tabela-especies');
    tabela.innerHTML = '';

    especies.forEach(especie => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
            <td>${especie.nome_popular}</td>
            <td>${especie.nome_cientifico}</td>
            <td>${especie.caracteristicas_morfologicas}</td>
            <td>${especie.familia}</td>
            <td>${especie.status_conservacao}</td>
            <td>${especie.descricao}</td>
            <td>
                <button onclick="editarEspecie('${especie._id}')">Editar</button>
                <button onclick="excluirEspecie('${especie._id}')">Excluir</button>
            </td>
        `;
        tabela.appendChild(linha);
    });

    filtrarEspecies();
}

function filtrarEspecies() {
    const searchTerm = document.getElementById('search-input').value.toLowerCase();
    const linhas = document.querySelectorAll('#tabela-especies tr');

    linhas.forEach(linha => {
        const textoLinha = linha.textContent.toLowerCase();
        if (textoLinha.includes(searchTerm)) {
            linha.style.display = '';
        } else {
            linha.style.display = 'none';
        }
    });
}

function editarEspecie(id) {

    if (id>0) {
        alert("ID inválido para edição.");
        return;
    } 
    localStorage.setItem('idEspecieEditando', id);
    window.location.href = 'admin_form_especie.html';
}

async function excluirEspecie(id) {
    const confirmacao = confirm("Tem certeza que deseja excluir esta espécie?");
    if (!confirmacao) return;

    try {
        const response = await fetch(`/especies-locais/${id}`,
            {
                method: 'DELETE',
                headers: {
                    'Authorization': 'Bearer ' + (getAuthToken ? getAuthToken() : localStorage.getItem('authToken'))
                }
            }
        );

        if (!response.ok) {
            throw new Error(`Erro ao excluir: ${response.status}`);
        }

        alert("Espécie excluída com sucesso!");
        carregarEspecies();
    } catch (error) {
        console.error('Erro ao excluir espécie:', error);
        alert(`Erro: ${error.message}
Verifique sua conexão ou se a API está online.`);
    }
}

window.addEventListener('DOMContentLoaded', () => {
    carregarEspecies();
    document.getElementById('search-input').addEventListener('keyup', filtrarEspecies);
});
