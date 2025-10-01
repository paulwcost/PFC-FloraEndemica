document.addEventListener("DOMContentLoaded", function () {
    const menuToggle = document.querySelector('.menu-toggle');
    const navContent = document.getElementById('nav-content');

    if (menuToggle && navContent) {
        menuToggle.addEventListener('click', function () {
            navContent.classList.toggle('active');
            menuToggle.classList.toggle('active');
        });
    } else {
        console.warn('Menu toggle or nav content not found on this page.');
    }

    // demove o segundo listener e chama a função aqui
    carregarDados();

    // Busca por palavra-chave
    const searchForm = document.getElementById("search-form");
    const searchInput = document.getElementById("search-keyword");
    const destaquesSection = document.getElementById("destaques-section");
    // Exemplo de dados de espécies (substitua por dados reais ou API)
    const especies = [
        { nome: "Myracrodruon urundeuva", descricao: "Árvore nativa brasileira, conhecida como aroeira." },
        { nome: "Tabebuia impetiginosa", descricao: "Popularmente chamada de ipê-roxo." },
        { nome: "Cecropia pachystachya", descricao: "Conhecida como embaúba, comum em áreas de floresta." }
    ];

    if (searchForm && searchInput && destaquesSection) {
        searchForm.addEventListener("submit", function (e) {
            e.preventDefault();
            const termo = searchInput.value.trim().toLowerCase();
            destaquesSection.innerHTML = "";
            const resultados = especies.filter(e => e.nome.toLowerCase().includes(termo) || e.descricao.toLowerCase().includes(termo));
            if (resultados.length === 0) {
                destaquesSection.innerHTML = `<p>Nenhuma espécie encontrada para "${termo}".</p>`;
            } else {
                resultados.forEach(e => {
                    const div = document.createElement("div");
                    div.className = "card";
                    div.innerHTML = `<h3>${e.nome}</h3><p>${e.descricao}</p>`;
                    destaquesSection.appendChild(div);
                });
            }
        });
    }
    const listaFamilias = document.getElementById("lista-familias");
    const detalhesEspecie = document.getElementById("detalhes-especie");
    const url = "https://servicos.jbrj.gov.br/v2/flora/families";  // URL para as famílias
    const itemsPorPagina = 12;
    let familias = [];
    let paginaAtual = 1;

    function exibirPagina(pagina) {
        if (!listaFamilias) return;
        listaFamilias.innerHTML = "";

        const inicio = (pagina - 1) * itemsPorPagina;
        const fim = inicio + itemsPorPagina;
        const familiasPagina = familias.slice(inicio, fim);

        const container = document.createElement("div");
        container.classList.add("familias-container");


        familiasPagina.forEach(familia => {
            const card = document.createElement("div");
            card.classList.add("card");
            card.style.cursor = 'pointer';
            const titulo = document.createElement("h3");
            titulo.textContent = familia;
            card.appendChild(titulo);
            card.addEventListener('click', async function() {
                await exibirEspeciesDaFamilia(familia);
            });
            container.appendChild(card);
        });
// Função para buscar e exibir espécies de uma família
async function exibirEspeciesDaFamilia(familia) {
    if (!listaFamilias) return;
    listaFamilias.innerHTML = `<h2>Espécies da Família ${familia}</h2><div id="especies-list"></div><button id="voltar-familias">Voltar</button>`;
    document.getElementById('voltar-familias').onclick = () => exibirPagina(paginaAtual);
    const especiesList = document.getElementById('especies-list');
    try {
        const response = await fetch(`https://servicos.jbrj.gov.br/v2/flora/species/${familia}`);
        const data = await response.json();
        if (!data || data.length === 0) {
            especiesList.innerHTML = '<p>Nenhuma espécie encontrada para esta família.</p>';
            return;
        }
        data.forEach(species => {
            const div = document.createElement('div');
            div.className = 'species-card';
            div.innerHTML = `
                <h3>${species.scientificname || 'Nome científico não disponível'}</h3>
                ${species.popularname ? `<p><strong>Nome popular:</strong> ${species.popularname}</p>` : ''}
                ${species.author ? `<p><strong>Autor:</strong> ${species.author}</p>` : ''}
                ${species.description ? `<p><strong>Descrição:</strong> ${species.description}</p>` : ''}
                ${species.threatstatus ? `<p><strong>Status de ameaça:</strong> ${species.threatstatus}</p>` : ''}
                ${species.distribution ? `<p><strong>Distribuição:</strong> ${species.distribution}</p>` : ''}
                ${species.imageurl ? `<img src="${species.imageurl}" alt="Imagem da espécie ${species.scientificname}" loading="lazy" style="max-width:200px;">` : ''}
                ${species.source ? `<p><strong>Fonte:</strong> <a href="${species.source}" target="_blank">${species.source}</a></p>` : ''}
                <button class="btn-detalhe-especie">Ver detalhes</button>
            `;
            div.querySelector('.btn-detalhe-especie').onclick = () => {
                // Passa o nome científico na URL (encode)
                window.location.href = `especies.html?scientificname=${encodeURIComponent(species.scientificname)}`;
            };
            especiesList.appendChild(div);
        });
    } catch (err) {
        especiesList.innerHTML = `<p style="color:red">Erro ao buscar espécies: ${err.message}</p>`;
    }
}

        if (!listaFamilias) return;
        listaFamilias.appendChild(container);
        atualizarPaginacao();
    }

    function atualizarPaginacao() {
        let paginacaoDiv = document.getElementById("paginacao");

        if (!paginacaoDiv) {
            paginacaoDiv = document.createElement("div");
            paginacaoDiv.id = "paginacao";
            paginacaoDiv.classList.add("paginacao");

            const botaoAnterior = document.createElement("button");
            botaoAnterior.id = "btn-anterior";
            botaoAnterior.textContent = "Anterior";
            botaoAnterior.addEventListener("click", function () {
                if (paginaAtual > 1) {
                    paginaAtual--;
                    exibirPagina(paginaAtual);
                }
            });

            const botaoProximo = document.createElement("button");
            botaoProximo.id = "btn-proximo";
            botaoProximo.textContent = "Próximo";
            botaoProximo.addEventListener("click", function () {
                if (paginaAtual * itemsPorPagina < familias.length) {
                    paginaAtual++;
                    exibirPagina(paginaAtual);
                }
            });

            paginacaoDiv.appendChild(botaoAnterior);
            paginacaoDiv.appendChild(botaoProximo);
            if (!listaFamilias) return;
            listaFamilias.appendChild(paginacaoDiv);
        }

        document.getElementById("btn-anterior").disabled = paginaAtual === 1;
        document.getElementById("btn-proximo").disabled = paginaAtual * itemsPorPagina >= familias.length;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro na requisição: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            familias = data;
            exibirPagina(paginaAtual);
        })
        .catch(error => {
            if (listaFamilias) {
                listaFamilias.innerHTML = `<p style="color: red;">Erro ao buscar famílias: ${error.message}</p>`;
            }
        });
    
    // Página especies.html: exibe detalhes de uma espécie específica
    if (detalhesEspecie) {
        const params = new URLSearchParams(window.location.search);
        const scientificname = params.get("scientificname");
        if (scientificname) {
            detalhesEspecie.innerHTML = '<div class="loader"></div>';
            // Timeout para evitar loader infinito
            let carregou = false;
            const timeout = setTimeout(() => {
                if (!carregou) {
                    detalhesEspecie.innerHTML = '<p style="color:red">Tempo de resposta excedido. Tente novamente mais tarde.</p>';
                }
            }, 10000);
            fetch(`https://servicos.jbrj.gov.br/v2/flora/species?scientificname=${encodeURIComponent(scientificname)}`)
                .then(response => response.json())
                .then(data => {
                    carregou = true;
                    clearTimeout(timeout);
                    if (!data || data.length === 0) {
                        detalhesEspecie.innerHTML = `<p>Espécie não encontrada.<br>Verifique se o nome científico está correto ou tente outra espécie.</p>`;
                        return;
                    }
                    const species = data[0];
                    detalhesEspecie.innerHTML = `
                        <h2>${species.scientificname || 'Nome científico não disponível'}</h2>
                        ${species.popularname ? `<p><strong>Nome popular:</strong> ${species.popularname}</p>` : ''}
                        ${species.author ? `<p><strong>Autor:</strong> ${species.author}</p>` : ''}
                        ${species.description ? `<p><strong>Descrição:</strong> ${species.description}</p>` : ''}
                        ${species.threatstatus ? `<p><strong>Status de ameaça:</strong> ${species.threatstatus}</p>` : ''}
                        ${species.distribution ? `<p><strong>Distribuição:</strong> ${species.distribution}</p>` : ''}
                        ${species.imageurl ? `<img src="${species.imageurl}" alt="Imagem da espécie ${species.scientificname}" loading="lazy" style="max-width:300px;">` : ''}
                        ${species.source ? `<p><strong>Fonte:</strong> <a href="${species.source}" target="_blank">${species.source}</a></p>` : ''}
                    `;
                })
                .catch(error => {
                    carregou = true;
                    clearTimeout(timeout);
                    detalhesEspecie.innerHTML = `<p style="color: red;">Erro ao carregar as informações da espécie.</p>`;
                });
        }
    }
});

async function carregarJSON(url) {
    const resposta = await fetch(url);
    return await resposta.json();
}

async function carregarDados() {
    // HEADER
    const header = await carregarJSON("./html_dados_variaveis/header.json");
    if (document.getElementById("logo_img"))
        document.getElementById("logo_img").src = header.logo_url;
    if (document.getElementById("titulo-site"))
        document.getElementById("titulo-site").textContent = header.titulo_site;
    const menu = document.getElementById("menu-links");
    if (menu && header.menu_links) {
        header.menu_links.forEach(link => {
            const li = document.createElement("li");
            li.innerHTML = `<a href="${link.href}">${link.texto}</a>`;
            menu.appendChild(li);
        });
    }

    // BANNER
    const banner = await carregarJSON("html_dados_variaveis/banner.json");
    if (document.getElementById("banner-titulo"))
        document.getElementById("banner-titulo").textContent = banner.titulo;
    if (document.getElementById("banner-descricao"))
        document.getElementById("banner-descricao").textContent = banner.descricao;
    const botao = document.getElementById("banner-botao");
    if (botao) {
        botao.textContent = banner.botao_texto;
        botao.href = banner.botao_link;
    }

    // DESTAQUES
    const destaques = await carregarJSON("html_dados_variaveis/destaques.json");
    const destaquesSec = document.getElementById("destaques-section");
    if (destaquesSec && destaques.cards) {
        destaques.cards.forEach(card => {
            const div = document.createElement("div");
            div.className = "card";
            div.innerHTML = `<h3>${card.titulo}</h3><p>${card.descricao}</p>`;
            destaquesSec.appendChild(div);
        });
    }

    // COLABORADOR
    const colaborador = await carregarJSON("html_dados_variaveis/colaborador.json");
    if (document.getElementById("colab-titulo"))
        document.getElementById("colab-titulo").textContent = colaborador.titulo;
    if (document.getElementById("colab-descricao"))
        document.getElementById("colab-descricao").textContent = colaborador.descricao;
    const categorias = document.getElementById("categorias-section");
    if (categorias && colaborador.categorias) {
        colaborador.categorias.forEach(cat => {
            const div = document.createElement("div");
            div.className = "category";
            div.innerHTML = `
                <h3>${cat.titulo}</h3>
                <p>${cat.descricao}</p>
                <a href="${cat.href}" class="btn">${cat.link_texto}</a>
            `;
            categorias.appendChild(div);
        });
    }

    // FOOTER
    const footer = await carregarJSON("html_dados_variaveis/footer.json");
    if (document.getElementById("footer-texto"))
        document.getElementById("footer-texto").innerHTML = footer.texto;
}