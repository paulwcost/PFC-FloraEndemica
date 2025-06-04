// js/index_loader.js

// Carrega header
fetch('http://localhost:3000/header')
  .then(res => res.json())
  .then(header => {
    document.getElementById('logo_img').src = header.logo;
    document.getElementById('titulo-site').textContent = header.tituloSite || header.titulo_site;
    const menu = document.getElementById('menu-links');
    menu.innerHTML = '';
    (header.linksMenu || header.menu_links).forEach(link => {
      const li = document.createElement('li');
      const a = document.createElement('a');
      a.href = link.url || link.href;
      a.textContent = link.texto;
      li.appendChild(a);
      menu.appendChild(li);
    });
  });

// Carrega banner
fetch('http://localhost:3000/banner')
  .then(res => res.json())
  .then(banners => {
    const banner = Array.isArray(banners) ? banners[0] : banners;
    document.getElementById('banner-titulo').textContent = banner.titulo;
    document.getElementById('banner-descricao').textContent = banner.descricao;
    const botao = document.getElementById('banner-botao');
    if (banner.botao_texto && banner.botao_link) {
      botao.textContent = banner.botao_texto;
      botao.href = banner.botao_link;
      botao.style.display = 'inline-block';
    } else {
      botao.style.display = 'none';
    }
  });

// Carrega destaques
fetch('http://localhost:3000/destaques')
  .then(res => res.json())
  .then(destaques => {
    const section = document.getElementById('destaques-section');
    section.innerHTML = '';
    destaques.forEach(card => {
      const div = document.createElement('div');
      div.className = 'destaque-card';
      div.innerHTML = `<h3>${card.titulo}</h3><p>${card.texto || card.descricao}</p>`;
      section.appendChild(div);
    });
  });

// Carrega footer
fetch('http://localhost:3000/footer')
  .then(res => res.json())
  .then(footer => {
    document.getElementById('footer-texto').textContent = footer.textoCopyright || footer.texto;
  });
