// js/admin_form_banner.js

const API_URL = 'http://localhost:3000/banner';

// Caminho relativo para as rotas do backend
const form = document.getElementById('banner-form');
const feedback = document.getElementById('feedback');
const idInput = document.getElementById('banner-id');
const tituloInput = document.getElementById('titulo');
const descricaoInput = document.getElementById('descricao');
const formTitle = document.getElementById('form-title');

function getToken() {
  return localStorage.getItem('token');
}

function showFeedback(msg, isError = false) {
  feedback.textContent = msg;
  feedback.style.color = isError ? 'red' : 'green';
}

function getBannerIdFromUrl() {
  const params = new URLSearchParams(window.location.search);
  return params.get('id');
}

function loadBanner(id) {
  fetch(`${API_URL}/${id}`)
    .then(res => {
      if (!res.ok) throw new Error();
      return res.json();
    })
    .then(banner => {
      idInput.value = banner._id;
      tituloInput.value = banner.titulo;
      descricaoInput.value = banner.descricao;
      formTitle.textContent = 'Editar Banner';
    })
    .catch(() => showFeedback('Erro ao carregar banner', true));
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  const id = idInput.value;
  const method = id ? 'PUT' : 'POST';
  const formData = new FormData();
  formData.append('titulo', tituloInput.value);
  formData.append('descricao', descricaoInput.value);
  const imagemInput = document.getElementById('imagem');
  if (imagemInput.files.length > 0) {
    formData.append('imagem', imagemInput.files[0]);
  }
  fetch(id ? `${API_URL}/${id}` : API_URL, {
    method,
    headers: {
      'Authorization': 'Bearer ' + getToken()
    },
    body: formData
  })
    .then(res => {
      if (!res.ok) {
        return res.json().then(data => { throw new Error(data.message || 'Erro ao salvar banner'); });
      }
      showFeedback('Banner salvo com sucesso!');
      setTimeout(() => window.location.href = 'admin_banners.html', 1000);
    })
    .catch(err => showFeedback(err.message || 'Erro ao salvar banner', true));
});

const bannerId = getBannerIdFromUrl();
if (bannerId) {
  loadBanner(bannerId);
}
