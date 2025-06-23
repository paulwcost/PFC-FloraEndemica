const formCadastro = document.getElementById('formCadastroEspecie');
const idEspecieEditando = localStorage.getItem('idEspecieEditando');
alert(idEspecieEditando);

if (idEspecieEditando) {
    preencherFormularioParaEdicao(idEspecieEditando);
}

async function preencherFormularioParaEdicao(id) {
    try {
        const response = await fetch(`https://plataforma-de-dados-com-login.onrender.com/especies-locais/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar dados.");

        const especie = await response.json();

        document.getElementById('nome_popular').value = especie.nome_popular || '';
        document.getElementById('nome_cientifico').value = especie.nome_cientifico || '';
        document.getElementById('caracteristicas_morfologicas').value = especie.caracteristicas_morfologicas || '';
        document.getElementById('familia').value = especie.familia || '';
        document.getElementById('status_conservacao').value = especie.status_conservacao || '';
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

    // Log para depuração
    console.log('Dados enviados para API:', dadosEspecie);

    const metodo = dadosEspecie.id ? 'PUT' : 'POST';
    const url = dadosEspecie.id
        ? `https://plataforma-de-dados-com-login.onrender.com/especies-locais/${dadosEspecie.id}`
        : 'https://plataforma-de-dados-com-login.onrender.com/especies-locais';

    try {
        const response = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + (getAuthToken ? getAuthToken() : localStorage.getItem('authToken'))
            },
            body: JSON.stringify(dadosEspecie)
        });

        // Log da resposta para depuração
        const respostaApi = await response.clone().json().catch(() => null);
        console.log('Resposta da API:', respostaApi);

        if (!response.ok) {
            const errorData = respostaApi || await response.json();
            throw new Error(`Erro ${response.status}: ${errorData.message || 'Erro desconhecido'}`);
        }

        alert(idEspecieEditando>0 ? "Espécie atualizada com sucesso!" : "Espécie cadastrada com sucesso!");
        localStorage.removeItem('idEspecieEditando');
        formCadastro.reset();
        window.location.href = "admin_lista_especies.html";
    } catch (error) {
        console.error('Erro ao salvar espécie:', error);
        alert(`Erro: ${error.message}`);
    }
});
