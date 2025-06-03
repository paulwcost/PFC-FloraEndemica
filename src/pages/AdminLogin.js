import React, { useState } from 'react';

function AdminLogin() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');

  function handleSubmit(e) {
    e.preventDefault();
    // Simulação de login (substitua por autenticação real se necessário)
    if (usuario === 'admin' && senha === 'admin') {
      setErro('');
      alert('Login realizado com sucesso!');
    } else {
      setErro('Usuário ou senha inválidos!');
    }
  }

  return (
    <div className="admin-login-container">
      <div className="login-icone">
        <img src="/img/logo.png" alt="Logo" />
      </div>
      <h1>Admin Login</h1>
      {erro && <div className="mensagem-erro">{erro}</div>}
      <form onSubmit={handleSubmit}>
        <label>Usuário</label>
        <input type="text" value={usuario} onChange={e => setUsuario(e.target.value)} required />
        <label>Senha</label>
        <input type="password" value={senha} onChange={e => setSenha(e.target.value)} required />
        <button className="botao" type="submit">Entrar</button>
      </form>
    </div>
  );
}

export default AdminLogin;
