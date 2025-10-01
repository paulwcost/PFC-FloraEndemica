document.addEventListener('DOMContentLoaded', function () {
    // Coordenadas de Assis Chateaubriand
    const centerLat = -24.3839;
    const centerLng = -53.5222;

    // Inicializa o mapa
    const map = L.map('map').setView([centerLat, centerLng], 13);

    // Adiciona o tile layer do OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(map);

    // Ícone customizado de árvore
    const treeIcon = L.divIcon({
        html: '🌳',
        className: 'tree-icon',
        iconSize: [30, 30],
        iconAnchor: [15, 30]
    });

    // Busca os dados das espécies no backend
    fetch('http://localhost:3000/especies-locais')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Adiciona os marcadores para cada espécie
            data.forEach(especie => {
                if (especie.latitude && especie.longitude) {
                    const marker = L.marker([especie.latitude, especie.longitude], { icon: treeIcon }).addTo(map);
                    marker.bindPopup(`<b>${especie.nome_popular}</b><br>${especie.nome_cientifico}`);
                }
            });
        })
        .catch(error => console.error('Erro ao buscar dados das espécies:', error));
});