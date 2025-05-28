const formCadastro = document.getElementById('formCadastroEspecie');
const idEspecieEditando = localStorage.getItem('idEspecieEditando');
alert(idEspecieEditando);

if (idEspecieEditando) {
    preencherFormularioParaEdicao(idEspecieEditando);
} else{
    alert("Nenhum ID de espécie encontrado para edição.");
}

async function preencherFormularioParaEdicao(id) {
    try {
        const response = await fetch(`https://plataforma-de-dados-com-login.onrender.com/especies-locais/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar dados.");

        const especie = await response.json();

        document.getElementById('id').value = especie._id || '';
        document.getElementById('nome_popular').value = especie.nome_popular || '';
        document.getElementById('nome_cientifico').value = especie.nome_cientifico || '';
        document.getElementById('descricao').value = especie.descricao || '';
        document.getElementById('familia').value = especie.familia || '';
        document.getElementById('status_conservacao').value = especie.status_conservacao || '';



    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert("Erro ao carregar dados da espécie.");
    }
}

formCadastro.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(formCadastro);
    const dadosEspecie = Object.fromEntries(formData.entries());

    alert("Dados da espécie: " + JSON.stringify(dadosEspecie));

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

        if (!response.ok) {
            const errorData = await response.json();
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
