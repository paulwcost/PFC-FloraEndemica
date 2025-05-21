// js/admin_form_especie.js

const formCadastro = document.getElementById('formCadastroEspecie');
const idEspecieEditando = localStorage.getItem('idEspecieEditando');

if (idEspecieEditando) {
    preencherFormularioParaEdicao(idEspecieEditando);
}

async function preencherFormularioParaEdicao(id) {
    try {
        const response = await fetch(`http://localhost:3000/especies-locais/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar dados.");

        const especie = await response.json();

        document.getElementById('nome_popular').value = especie.nome_popular || '';
        document.getElementById('nome_cientifico').value = especie.nome_cientifico || '';
        document.getElementById('descricao').value = especie.descricao || '';
    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert("Erro ao carregar dados da espécie.");
    }
}

formCadastro.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(formCadastro);
    const dadosEspecie = Object.fromEntries(formData.entries());

    const metodo = idEspecieEditando ? 'PUT' : 'POST';
    const url = idEspecieEditando
        ? `http://localhost:3000/especies-locais/${idEspecieEditando}`
        : 'http://localhost:3000/especies-locais';

    try {
        const response = await fetch(url, {
            method: metodo,
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(dadosEspecie)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`Erro ${response.status}: ${errorData.message || 'Erro desconhecido'}`);
        }

        alert(idEspecieEditando ? "Espécie atualizada com sucesso!" : "Espécie cadastrada com sucesso!");
        localStorage.removeItem('idEspecieEditando');
        formCadastro.reset();
        window.location.href = "admin_lista_especies.html";
    } catch (error) {
        console.error('Erro ao salvar espécie:', error);
        alert(`Erro: ${error.message}`);
    }
});
