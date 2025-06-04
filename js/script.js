document.addEventListener("DOMContentLoaded", function () {
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
            const card = document.createElement("a");
            card.classList.add("card");
            // Atualize o href para redirecionar para a página "Especies.html" com o parâmetro family
            card.href = `especies.html?family=${familia}`;
            card.style.cursor = 'pointer'; // Garantir que o cursor seja o de mãozinha

            const titulo = document.createElement("h3");
            titulo.textContent = familia;
            
            card.appendChild(titulo);
            container.appendChild(card);
        });

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
    
    if (detalhesEspecie) {
        const params = new URLSearchParams(window.location.search);
        const familia = params.get("family");
        
        console.log(familia);

        fetch(`https://servicos.jbrj.gov.br/v2/flora/species/${familia}`)
    .then(response => response.json())
    .then(data => {
        // Verifique os dados retornados
        console.log(data); // Verifique o que está sendo retornado da API

        // Se o array de espécies estiver vazio, exiba uma mensagem
        if (data.length === 0) {
            detalhesEspecie.innerHTML = `<p>Não há espécies disponíveis para esta família.</p>`;
        } else {
            detalhesEspecie.innerHTML = `<h2>Espécies da Família ${familia}</h2>`;

            // Loop para cada espécie retornada
            data.forEach(species => {
                console.log("Está são as espécies: ", species); // Verifique a estrutura de cada espécie

                let div = document.createElement("div");
                div.classList.add("species-item");

                // Ajuste conforme os nomes corretos dos campos
                const scientificName = species.scientificname; // Usar o nome correto

                // Se os dados existem, exiba-os
                if (scientificName) {
                    div.innerHTML = `<strong>${scientificName}</strong>}`;
                } else {
                    div.innerHTML = `<strong>Informação não disponível</strong>`;
                }

                // Adicione o novo elemento à página
                detalhesEspecie.appendChild(div);
            });
        }
    })
    .catch(error => {
        console.error("Erro ao buscar detalhes da espécie: ", error);
        detalhesEspecie.innerHTML = `<p style="color: red;">Erro ao carregar as informações da espécie.</p>`;
    });

    
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

document.addEventListener("DOMContentLoaded", carregarDados);

window.addEventListener('DOMContentLoaded', function() {
    // MENU SANDUÍCHE
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const menuOverlay = document.getElementById('menu-overlay');
    if (menuToggle && navMenu && menuOverlay) {
        menuToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            menuOverlay.classList.toggle('active');
        });
        menuOverlay.addEventListener('click', function() {
            navMenu.classList.remove('active');
            menuOverlay.classList.remove('active');
        });
        // Fecha o menu ao clicar em um link
        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navMenu.classList.remove('active');
                menuOverlay.classList.remove('active');
            });
        });
    }
});
