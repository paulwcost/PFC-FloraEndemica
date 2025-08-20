// js/admin_banners.js

const API_URL = 'http://localhost:3000/banner';
const tableBody = document.querySelector('#banners-table tbody');
const feedback = document.getElementById('feedback');

function getToken() {
  return localStorage.getItem('token');
}

function showFeedback(msg, isError = false) {
  if (!feedback) return;
  feedback.textContent = msg;
  feedback.style.color = isError ? 'red' : 'green';
}

function renderBanners(banners) {
  if (!tableBody) return;
  tableBody.innerHTML = '';
  banners.forEach(banner => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${banner.titulo}</td>
      <td>${banner.descricao}</td>
      <td><img src="${banner.imagem}" alt="Banner" style="max-width:100px;" loading="lazy"></td>
      <td>
        <button onclick="editBanner('${banner._id}')">Editar</button>
        <button onclick="deleteBanner('${banner._id}')">Excluir</button>
      </td>
    `;
    tableBody.appendChild(tr);
  });
}

function fetchBanners() {
  if (!tableBody) return;
  fetch(API_URL)
    .then(res => res.json())
    .then(renderBanners)
    .catch(() => showFeedback('Erro ao carregar banners', true));
}

window.editBanner = function(id) {
  window.location.href = `admin_form_banner.html?id=${id}`;
};

window.deleteBanner = function(id) {
  if (!confirm('Tem certeza que deseja excluir este banner?')) return;
  fetch(`${API_URL}/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer ' + getToken()
    }
  })
    .then(res => {
      if (!res.ok) throw new Error();
      showFeedback('Banner excluído com sucesso!');
      fetchBanners();
    })
    .catch(() => showFeedback('Erro ao excluir banner', true));
};

fetchBanners();
