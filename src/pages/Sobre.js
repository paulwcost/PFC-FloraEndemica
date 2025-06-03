import React, { useEffect, useState } from 'react';

function Sobre() {
  const [sobre, setSobre] = useState(null);

  useEffect(() => {
    fetch('/html_dados_variaveis/sobre.json')
      .then(res => res.json())
      .then(setSobre);
  }, []);

  return (
    <div className="sobre">
      <h1>{sobre?.titulo}</h1>
      <p>{sobre?.descricao}</p>
      <section className="missao">
        <h2>Missão</h2>
        <p>{sobre?.missao}</p>
      </section>
      <section className="instituicoes">
        <h2>Instituições Envolvidas</h2>
        <ul>
          {sobre?.instituicoes?.map((inst, idx) => (
            <li key={idx}>{inst}</li>
          ))}
        </ul>
      </section>
      <section className="responsaveis">
        <h2>Responsáveis</h2>
        <div className="responsavel">
          <img src="/img/sobre-equipe.jpg" alt="Equipe" />
          <div>
            <h3>Equipe de Desenvolvimento</h3>
            <p>{sobre?.responsaveis}</p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Sobre;
