import React, { useEffect, useState } from 'react';

function Metodologia() {
  const [metodologia, setMetodologia] = useState(null);

  useEffect(() => {
    fetch('/html_dados_variaveis/metodologia.json')
      .then(res => res.json())
      .then(setMetodologia);
  }, []);

  return (
    <div className="metodologia-container">
      <h1>{metodologia?.titulo}</h1>
      {metodologia?.paragrafos?.map((p, idx) => (
        <p key={idx}>{p}</p>
      ))}
      {metodologia?.links?.map((l, idx) => (
        <a key={idx} href={l.href}>{l.texto}</a>
      ))}
    </div>
  );
}

export default Metodologia;
