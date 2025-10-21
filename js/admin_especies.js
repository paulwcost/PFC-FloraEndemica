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

        // Helper para criar célula com texto seguro
        function criarCelulaTexto(texto, classe) {
            const td = document.createElement('td');
            const div = document.createElement('div');
            div.className = 'campo-texto ' + (classe || '');
            // garantir que texto nulo/undefined seja string vazia
            div.textContent = texto || '';
            td.appendChild(div);
            return td;
        }

    // Células simples (nome popular e científico) com classes para estilização
    const tdNomePopular = criarCelulaTexto(especie.nome_popular);
    tdNomePopular.classList.add('col-nome-popular');
    linha.appendChild(tdNomePopular);

    const tdNomeCientifico = criarCelulaTexto(especie.nome_cientifico);
    tdNomeCientifico.classList.add('col-nome-cientifico');
    linha.appendChild(tdNomeCientifico);

        // Características morfológicas com botão ver mais
        const tdCaracteristicas = document.createElement('td');
        const divCarac = document.createElement('div');
        divCarac.className = 'campo-texto truncado';
        divCarac.textContent = especie.caracteristicas_morfologicas || '';
        tdCaracteristicas.appendChild(divCarac);
        const btnCarac = document.createElement('button');
        btnCarac.type = 'button';
        btnCarac.className = 'btn-ver-mais';
        btnCarac.textContent = 'ver mais';
        btnCarac.addEventListener('click', () => toggleVerMais(divCarac, btnCarac));
        tdCaracteristicas.appendChild(btnCarac);
        linha.appendChild(tdCaracteristicas);

    // Demais campos simples
    linha.appendChild(criarCelulaTexto(especie.familia));
    const tdStatus = criarCelulaTexto(especie.status_conservacao);
    tdStatus.classList.add('col-status');
    linha.appendChild(tdStatus);

        // Descrição com botão ver mais
        const tdDescricao = document.createElement('td');
        const divDesc = document.createElement('div');
        divDesc.className = 'campo-texto truncado';
        divDesc.textContent = especie.descricao || '';
        tdDescricao.appendChild(divDesc);
        const btnDesc = document.createElement('button');
        btnDesc.type = 'button';
        btnDesc.className = 'btn-ver-mais';
        btnDesc.textContent = 'ver mais';
        btnDesc.addEventListener('click', () => toggleVerMais(divDesc, btnDesc));
        tdDescricao.appendChild(btnDesc);
        linha.appendChild(tdDescricao);

        // Ações
        const tdAcoes = document.createElement('td');
    const btnEditar = document.createElement('button');
    btnEditar.type = 'button';
    btnEditar.textContent = 'Editar';
    btnEditar.className = 'btn-editar botao-acao';
    btnEditar.addEventListener('click', () => editarEspecie(especie._id));
    const btnExcluir = document.createElement('button');
    btnExcluir.type = 'button';
    btnExcluir.textContent = 'Excluir';
    btnExcluir.className = 'btn-excluir botao-acao';
    btnExcluir.addEventListener('click', () => excluirEspecie(especie._id));
    tdAcoes.classList.add('col-acoes');
    tdAcoes.appendChild(btnEditar);
    tdAcoes.appendChild(btnExcluir);
        linha.appendChild(tdAcoes);

        tabela.appendChild(linha);
    });

    filtrarEspecies();
}

// Alterna entre truncado e expandido
function toggleVerMais(div, botao) {
    const isTruncado = div.classList.contains('truncado');
    if (isTruncado) {
        div.classList.remove('truncado');
        botao.textContent = 'ver menos';
    } else {
        div.classList.add('truncado');
        botao.textContent = 'ver mais';
    }
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
