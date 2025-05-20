fetch('./html_dados_variaveis/metodologia.json')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('metodologia');

        const titulo = document.createElement('h1');
        titulo.textContent = data.titulo;
        container.appendChild(titulo);

        const descricao = document.createElement('p');
        descricao.textContent = data.descricao;
        container.appendChild(descricao);

        data.etapas.forEach(etapa => {
          const h2 = document.createElement('h2');
          h2.textContent = etapa.titulo;
          container.appendChild(h2);

          const p = document.createElement('p');
          p.textContent = etapa.descricao;
          container.appendChild(p);
        });

        const mensagemFinal = document.createElement('p');
        mensagemFinal.textContent = data.mensagem_final;
        container.appendChild(mensagemFinal);
      })
      .catch(error => {
        console.error('Erro ao carregar o JSON:', error);
      });