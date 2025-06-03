import React, { useEffect, useState } from 'react';

function Home() {
  const [header, setHeader] = useState(null);
  const [banner, setBanner] = useState(null);
  const [destaques, setDestaques] = useState([]);
  const [colaborador, setColaborador] = useState(null);
  const [footer, setFooter] = useState('');

  useEffect(() => {
    fetch('/html_dados_variaveis/header.json')
      .then(res => res.json())
      .then(setHeader);
    fetch('/html_dados_variaveis/banner.json')
      .then(res => res.json())
      .then(setBanner);
    fetch('/html_dados_variaveis/destaques.json')
      .then(res => res.json())
      .then(data => setDestaques(data.cards));
    fetch('/html_dados_variaveis/colaborador.json')
      .then(res => res.json())
      .then(setColaborador);
    fetch('/html_dados_variaveis/footer.json')
      .then(res => res.json())
      .then(data => setFooter(data.texto));
  }, []);

  return (
    <div>
      <header>
        <div className="logo">
          <img id="logo_img" src={header?.logo_url?.replace('./img', '/img')} alt="imagem_logo" />
          <span id="titulo-site">{header?.titulo_site}</span>
        </div>
        <nav>
          <ul id="menu-links">
            {header?.menu_links?.map((link, idx) => (
              <li key={idx}><a href={link.href}>{link.texto}</a></li>
            ))}
          </ul>
        </nav>
      </header>
      <section className="banner">
        <h1 id="banner-titulo">{banner?.titulo}</h1>
        <p id="banner-descricao">{banner?.descricao}</p>
        {banner?.botao_texto ? (
          <a id="banner-botao" className="botao" href={banner.botao_link}>{banner.botao_texto}</a>
        ) : null}
      </section>
      <section className="destaques" id="destaques-section">
        {destaques.map((card, idx) => (
          <div className="card" key={idx}>
            <h3>{card.titulo}</h3>
            <p>{card.descricao}</p>
          </div>
        ))}
      </section>
      <section className="colaborador">
        <h1 id="colab-titulo">{colaborador?.titulo}</h1>
        <section className="section">
          <p id="colab-descricao">{colaborador?.descricao}</p>
          <div className="categoria_personas" id="categorias-section">
            {colaborador?.categorias?.map((cat, idx) => (
              <div className="category" key={idx}>
                <h3>{cat.titulo}</h3>
                <p>{cat.descricao}</p>
                <a className="btn" href={cat.href}>{cat.link_texto}</a>
              </div>
            ))}
          </div>
        </section>
      </section>
      <footer>
        <p id="footer-texto" dangerouslySetInnerHTML={{ __html: footer }}></p>
      </footer>
    </div>
  );
}

export default Home;
