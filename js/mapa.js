let map;
let markers = [];

// Simulação: verifique se o usuário é admin (substitua por lógica real de autenticação)
const isAdmin = localStorage.getItem('userRole') === 'admin';

function initMap() {
    // Coordenadas para centralizar o mapa (ex: centro do Brasil)
    const initialCoords = { lat: -14.235004, lng: -51.92528 };
    
    map = new google.maps.Map(document.getElementById("map"), {
        center: initialCoords,
        zoom: 5,
        mapId: 'DEMO_MAP_ID' // Usando um Map ID de demonstração para evitar erros de estilo
    });

    if (isAdmin) {
        document.getElementById('infoMsg').textContent = "Clique no mapa para adicionar um novo marcador.";
        map.addListener("click", (e) => {
            addMarker(e.latLng);
        });
    } else {
        document.getElementById('infoMsg').textContent = "Apenas administradores podem adicionar novos pontos no mapa.";
    }
    
    // Exemplo de como carregar marcadores existentes de uma API
    // fetch('/api/locations').then(res => res.json()).then(locations => {
    //     locations.forEach(loc => addMarker(new google.maps.LatLng(loc.lat, loc.lng)));
    // });
}

function addMarker(location) {
    const marker = new google.maps.Marker({
        position: location,
        map: map,
        animation: google.maps.Animation.DROP
    });
    markers.push(marker);

    // Adiciona um infowindow para exibir as coordenadas
    const infowindow = new google.maps.InfoWindow({
        content: `<b>Coordenadas:</b><br>Lat: ${location.lat().toFixed(6)}<br>Lng: ${location.lng().toFixed(6)}`
    });

    marker.addListener("click", () => {
        infowindow.open(map, marker);
    });

    // Lógica para salvar o novo marcador no backend (exemplo)
    // if(isAdmin) {
    //     fetch('/api/locations', {
    //         method: 'POST',
    //         headers: { 'Content-Type': 'application/json' },
    //         body: JSON.stringify({ lat: location.lat(), lng: location.lng() })
    //     });
    // }
}
