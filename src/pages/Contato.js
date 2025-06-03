import React, { useEffect, useState } from 'react';

function Contato() {
  const [contato, setContato] = useState(null);

  useEffect(() => {
    fetch('/html_dados_variaveis/contato.json')
      .then(res => res.json())
      .then(setContato);
  }, []);

  return (
    <div className="contato-container">
      <div className="contato-header">
        <h1>{contato?.titulo}</h1>
        <p>{contato?.descricao}</p>
      </div>
      <div className="form-container">
        <form className="contato-form">
          <div className="input-group">
            <label>Nome</label>
            <input type="text" name="nome" required />
          </div>
          <div className="input-group">
            <label>Email</label>
            <input type="email" name="email" required />
          </div>
          <div className="input-group">
            <label>Mensagem</label>
            <textarea name="mensagem" required></textarea>
          </div>
          <button className="botao" type="submit">Enviar</button>
        </form>
      </div>
      <div className="informacoes-contato">
        <h2>Informações de Contato</h2>
        <ul>
          {contato?.informacoes?.map((info, idx) => (
            <li key={idx}><a href={info.href}>{info.texto}</a></li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Contato;
