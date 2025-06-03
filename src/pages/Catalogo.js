import React, { useEffect, useState } from 'react';

function Catalogo() {
  const [especies, setEspecies] = useState([]);
  const [erro, setErro] = useState('');

  useEffect(() => {
    fetch('/html_dados_variaveis/especie_local.json')
      .then(res => res.json())
      .then(setEspecies)
      .catch(() => setErro('Erro ao buscar espécies.'));
  }, []);

  return (
    <main className="catalogo">
      <h1>Catálogo de Espécies</h1>
      <p>Veja as principais espécies nativas catalogadas.</p>
      {erro && <p style={{color:'red'}}>{erro}</p>}
      <div className="grid-especies">
        {especies.map((esp, idx) => (
          <div className="quadro" key={idx}>
            <img src={esp.imagem?.replace('./img', '/img')} alt={esp.nome} />
            <h3>{esp.nome}</h3>
            <p>{esp.descricao}</p>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Catalogo;
