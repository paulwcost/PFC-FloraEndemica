// Prioriza a URL pública da API (Render); se falhar tenta o servidor local como fallback
const API_PUBLIC = 'https://plataforma-de-dados-com-login.onrender.com';
const API_LOCAL = 'http://127.0.0.1:3000';

const API_BASE_URL = API_PUBLIC; // valor inicial; a função fará fallback se necessário

// Função que carrega o JSON e popula a tela com os dados das espécies
async function carregarEspecies() {
  try {
    // Tenta a API pública primeiro
    let response = null;
    let publicError = null;
    try {
      response = await fetch(`${API_PUBLIC}/especies-locais`);
      if (!response.ok) {
        publicError = `pública respondeu ${response.status} ${response.statusText}`;
        console.warn('API pública retornou erro:', response.status, response.statusText, response.url);
      }
    } catch (err) {
      publicError = `falha de rede na pública: ${err.message}`;
      console.warn('Erro de rede ao acessar API pública:', err);
      response = null;
    }

    // Se não obteve resposta OK, tenta o servidor local
    let localError = null;
    if (!response || !response.ok) {
      try {
        response = await fetch(`${API_LOCAL}/especies-locais`);
        if (!response.ok) {
          localError = `local respondeu ${response.status} ${response.statusText}`;
          console.warn('API local retornou erro:', response.status, response.statusText, response.url);
        }
      } catch (err) {
        localError = `falha de rede no local: ${err.message}`;
        console.warn('Erro de rede ao acessar API local:', err);
        response = null;
      }
    }

    // Se nem a pública nem a local responderam corretamente, tentar fallback estático
    let especies = null;
    if (response && response.ok) {
      // Verifica se o content-type é JSON; alguns hosts retornam HTML de "wakeup"
      const ct = response.headers.get('content-type') || '';
      if (ct.toLowerCase().includes('application/json')) {
        especies = await response.json();
      } else {
        console.warn('Resposta recebida não é JSON (content-type:', ct, '). Tentando fallback estático.');
        especies = null;
      }
    } else {
      // tenta arquivo de fallback local dentro do site
      try {
        const fallbackUrl = window.location.origin + '/html_dados_variaveis/especies-fallback.json';
        const fb = await fetch(fallbackUrl);
        if (fb.ok) {
          especies = await fb.json();
          console.warn('Usando fallback local:', fallbackUrl);
        } else {
          const tentativa = [];
          if (publicError) tentativa.push(`pública: ${publicError}`);
          if (localError) tentativa.push(`local: ${localError}`);
          tentativa.push(`fallback: ${fb.status} ${fb.statusText} (${fallbackUrl})`);
          throw new Error(`Nenhuma API respondeu corretamente. Detalhes: ${tentativa.join(' | ')}`);
        }
      } catch (fbErr) {
        const tentativa = [];
        if (publicError) tentativa.push(`pública: ${publicError}`);
        if (localError) tentativa.push(`local: ${localError}`);
        tentativa.push(`fallback erro: ${fbErr.message}`);
        throw new Error(`Nenhuma API respondeu corretamente. Detalhes: ${tentativa.join(' | ')}`);
      }
    }

    const container = document.querySelector('.grid-especies');
    container.innerHTML = '';

    especies.forEach(especie => {
      // Criar div.quadro
      const quadro = document.createElement('div');
      quadro.classList.add('quadro');

      // Nome Popular
      const titulo = document.createElement('h3');
      titulo.textContent = especie.nome_popular || 'Sem nome popular';
      quadro.appendChild(titulo);

      // Nome Científico (visível)
      const nomeCientifico = document.createElement('p');
      nomeCientifico.innerHTML = `<strong>Nome Científico:</strong> ${especie.nome_cientifico || 'Não informado'}`;
      quadro.appendChild(nomeCientifico);

      // Bloco de detalhes oculto (características, família, status, descrição)
      const detalhes = document.createElement('div');
      detalhes.className = 'detalhes-especie';
      detalhes.style.display = 'none';

      if (especie.caracteristicas_morfologicas) {
        const caracteristicas = document.createElement('p');
        caracteristicas.innerHTML = `<strong>Características Morfológicas:</strong> ${especie.caracteristicas_morfologicas}`;
        detalhes.appendChild(caracteristicas);
      }

      const familia = document.createElement('p');
      familia.innerHTML = `<strong>Família:</strong> ${especie.familia || 'Não informado'}`;
      detalhes.appendChild(familia);

      const status = document.createElement('p');
      status.innerHTML = `<strong>Status de Conservação:</strong> ${especie.status_conservacao || 'Não informado'}`;
      detalhes.appendChild(status);

      const descricao = document.createElement('p');
      descricao.innerHTML = `<strong>Descrição:</strong> ${especie.descricao || 'Não informado'}`;
      detalhes.appendChild(descricao);

      // Botão ver mais / ver menos
      const meta = document.createElement('div');
      meta.className = 'meta';
      const btnDetalhe = document.createElement('button');
      btnDetalhe.className = 'btn-detalhe';
      btnDetalhe.type = 'button';
      btnDetalhe.textContent = 'ver mais';
      btnDetalhe.setAttribute('aria-expanded', 'false');
      btnDetalhe.addEventListener('click', () => {
        const isHidden = detalhes.style.display === 'none';
        detalhes.style.display = isHidden ? 'block' : 'none';
        btnDetalhe.textContent = isHidden ? 'ver menos' : 'ver mais';
        btnDetalhe.setAttribute('aria-expanded', isHidden ? 'true' : 'false');
      });
      meta.appendChild(btnDetalhe);
      quadro.appendChild(detalhes);
      quadro.appendChild(meta);

      // Adicionar o quadro ao container
      container.appendChild(quadro);
    });

  } catch (erro) {
    console.error('Erro ao carregar os dados das espécies:', erro);
    const container = document.querySelector('.grid-especies');
    if (container) container.innerHTML = `
      <div style="color:red">
        <p>Erro ao carregar as espécies.</p>
        <p>Motivo: ${erro.message}</p>
        <p>URLs testadas: ${API_PUBLIC}/especies-locais e ${API_LOCAL}/especies-locais</p>
        <p>Verifique no console do navegador por mensagens de 404, CORS ou falhas de rede.</p>
      </div>
    `;
  }
}

// Chama a função assim que o script for carregado
carregarEspecies();
