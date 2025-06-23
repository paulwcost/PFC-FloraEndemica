// Função que carrega o JSON e popula a tela com os dados das espécies
async function carregarEspecies() {
  const container = document.querySelector('.grid-especies');
  container.innerHTML = '<div style="text-align:center;padding:40px 0;">Carregando espécies...</div>';
  let urlRemota = 'https://plataforma-de-dados-com-login.onrender.com/especies-locais';
  let urlLocal = 'http://localhost:3000/especies-locais';
  try {
    let response;
    try {
      response = await fetch(urlRemota);
    } catch (e) {
      response = null;
    }
    if (!response || !response.ok) {
      // Tenta local se remoto falhar
      response = await fetch(urlLocal);
      if (!response.ok) throw new Error('Erro ao carregar os dados do banco de dados (local)');
    }
    const especies = await response.json();
    container.innerHTML = '';
    especies.forEach(especie => {
      // Criar div.quadro
      const quadro = document.createElement('div');
      quadro.classList.add('quadro');

      // Nome Popular
      const titulo = document.createElement('h3');
      titulo.textContent = especie.nome_popular || 'Sem nome popular';
      quadro.appendChild(titulo);

      // Nome Científico
      const nomeCientifico = document.createElement('p');
      nomeCientifico.innerHTML = `<strong>Nome Científico:</strong> ${especie.nome_cientifico || 'Não informado'}`;
      quadro.appendChild(nomeCientifico);

      // Características Morfológicas
      if (especie.caracteristicas_morfologicas) {
        const caracteristicas = document.createElement('p');
        caracteristicas.innerHTML = `<strong>Características Morfológicas:</strong> ${especie.caracteristicas_morfologicas}`;
        quadro.appendChild(caracteristicas);
      }

      // Família
      const familia = document.createElement('p');
      familia.innerHTML = `<strong>Família:</strong> ${especie.familia || 'Não informado'}`;
      quadro.appendChild(familia);

      // Status de Conservação
      const status = document.createElement('p');
      status.innerHTML = `<strong>Status de Conservação:</strong> ${especie.status_conservacao || 'Não informado'}`;
      quadro.appendChild(status);

      // Descrição
      const descricao = document.createElement('p');
      descricao.innerHTML = `<strong>Descrição:</strong> ${especie.descricao || 'Não informado'}`;
      quadro.appendChild(descricao);

      // Adicionar o quadro ao container
      container.appendChild(quadro);
    });

  } catch (erro) {
    console.error('Erro ao carregar os dados das espécies:', erro);
    if (container) container.innerHTML = '<p style="color:red">Erro ao carregar as espécies.</p>';
  }
}

// Chama a função assim que o script for carregado
carregarEspecies();
