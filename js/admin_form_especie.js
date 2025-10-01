const formCadastro = document.getElementById('formCadastroEspecie');
const idEspecieEditando = localStorage.getItem('idEspecieEditando');

// Elementos do Modal e Mapa
const mapModal = document.getElementById('mapModal');
const btnSelecionarLocalizacao = document.getElementById('btnSelecionarLocalizacao');
const closeButton = document.querySelector('.close-button');
const btnConfirmarLocalizacao = document.getElementById('btnConfirmarLocalizacao');
let map;
let marker;
let selectedCoords = null;

if (idEspecieEditando) {
    preencherFormularioParaEdicao(idEspecieEditando);
}

async function preencherFormularioParaEdicao(id) {
    try {
        const response = await fetch(`/especies-locais/${id}`);
        if (!response.ok) throw new Error("Erro ao buscar dados.");

        const especie = await response.json();

        document.getElementById('id').value = especie._id || '';
        document.getElementById('nome_popular').value = especie.nome_popular || '';
        document.getElementById('nome_cientifico').value = especie.nome_cientifico || '';
        document.getElementById('caracteristicas_morfologicas').value = especie.caracteristicas_morfologicas || '';
        document.getElementById('familia').value = especie.familia || '';
        document.getElementById('status_conservacao').value = especie.status_conservacao || '';
        document.getElementById('descricao').value = especie.descricao || '';
        document.getElementById('latitude').value = especie.latitude || '';
        document.getElementById('longitude').value = especie.longitude || '';

    } catch (error) {
        console.error('Erro ao carregar dados:', error);
        alert("Erro ao carregar dados da espécie.");
    }
}

formCadastro.addEventListener('submit', async function (event) {
    event.preventDefault();

    const formData = new FormData(formCadastro);
    const dadosEspecie = Object.fromEntries(formData.entries());

    const metodo = dadosEspecie.id ? 'PUT' : 'POST';
    const url = dadosEspecie.id
        ? `http://localhost:3000/especies-locais/${dadosEspecie.id}`
        : 'http://localhost:3000/especies-locais';

    try {
        const response = await fetch(url, {
            method: metodo,
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosEspecie),
        });

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`);
        }

        const resultado = await response.json();
        alert('Espécie salva com sucesso!');
        window.location.href = '/admin_lista_especies.html';
    } catch (error) {
        console.error('Erro ao salvar espécie:', error);
        alert('Erro ao salvar espécie. Verifique os dados e tente novamente.');
    }
});

// --- Lógica do Mapa com Leaflet ---

function initAdminMap() {
    map = L.map('mapContainer').setView([-24.3836, -53.5183], 13); // Centro em Assis Chateaubriand

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    map.on('click', function(e) {
        if (marker) {
            map.removeLayer(marker);
        }
        marker = L.marker(e.latlng).addTo(map);
        selectedCoords = e.latlng;
    });
}

btnSelecionarLocalizacao.addEventListener('click', () => {
    mapModal.style.display = 'block';
    if (!map) {
        initAdminMap();
    }
    // Invalidate map size to fix rendering issues in modal
    setTimeout(() => {
        map.invalidateSize();
    }, 10);
});

closeButton.addEventListener('click', () => {
    mapModal.style.display = 'none';
});

btnConfirmarLocalizacao.addEventListener('click', () => {
    if (selectedCoords) {
        document.getElementById('latitude').value = selectedCoords.lat;
        document.getElementById('longitude').value = selectedCoords.lng;
        mapModal.style.display = 'none';
    }
});

window.addEventListener('click', (event) => {
    if (event.target == mapModal) {
        mapModal.style.display = 'none';
    }
});