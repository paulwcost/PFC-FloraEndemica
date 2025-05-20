// Função que carrega o JSON e popula a tela com os dados das espécies
async function carregarEspecies() {
  try {
    const response = await fetch('./html_dados_variaveis/especie_local.json');
    if (!response.ok) throw new Error('Erro ao carregar o arquivo JSON');

    const especies = await response.json(); // Parse do JSON
    const container = document.querySelector('.grid-especies'); // Container das espécies

    especies.forEach(especie => {
      // Criar div.quadro
      const quadro = document.createElement('div');
      quadro.classList.add('quadro');

      // Criar imagem
      const imagem = document.createElement('img');
      imagem.src = `./img/${especie.imagem}`; // <-- Caminho ajustado para a pasta 'img'
      imagem.alt = especie.nomePopular;

      // Criar título (h3)
      const titulo = document.createElement('h3');
      titulo.textContent = especie.nomePopular;

      // Criar parágrafos
      const nomeCientifico = document.createElement('p');
      nomeCientifico.innerHTML = `<strong>Nome Científico:</strong> ${especie.nomeCientifico}`;

      const floracao = document.createElement('p');
      floracao.innerHTML = `<strong>Floração:</strong> ${especie.floracao || 'Não informado'}`;

      const frutificacao = document.createElement('p');
      frutificacao.innerHTML = `<strong>Frutificação:</strong> ${especie.frutificacao || 'Não informado'}`;

      const altura = document.createElement('p');
      altura.innerHTML = `<strong>Altura Média:</strong> ${especie.alturaMedia || 'Não informado'}`;

      // Adicionar todos os elementos à div.quadro
      quadro.appendChild(imagem);
      quadro.appendChild(titulo);
      quadro.appendChild(nomeCientifico);
      quadro.appendChild(floracao);
      quadro.appendChild(frutificacao);
      quadro.appendChild(altura);

      // Adicionar o quadro ao container
      container.appendChild(quadro);
    });

  } catch (erro) {
    console.error('Erro ao carregar os dados das espécies:', erro);
  }
}

// Chama a função assim que o script for carregado
carregarEspecies();
