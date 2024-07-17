// Variáveis Globais
let grafo = [[]];
let symbolGraph = new Map(); // Tradução código para número no grafo
let nome = []; // Tradução do número do grafo para o código
let codDisc = new Map(); // Tradução do código para o nome da disciplina
let cont = 1;
let nodes = [];
let links = [];

// SETUP para o funcionamento da DFS
let vis = [];
let prereqList = [];

const width = 1920; // Precisa condizer com o svg
const height = 1080; // Precisa condizer com o svg

/*
    Plotagem
*/

//DEFAULT
std = () => {
    // SETUP dos nós e dos links
    nodes = [];
    links = [];

    for(let [codigo, pr] of symbolGraph.entries()){
        nodes.push({ id: codigo, color: "#13c8b5" });

        grafo[pr].forEach(w => {
            links.push({ source: nome[w], target: codigo});
        });
    }
}

redefine = (nomeDisc) => {
    // SETUP dos nós e dos links
    nodes = [];
    links = [];

    prereqList.forEach(id => {
        if(id == nomeDisc){
            nodes.push({ id: id, color: "#7375a5" });
        }
        else{
            nodes.push({ id: id, color: "#13c8b5" });
        }
    });

    prereqList.forEach(w => {
        grafo[symbolGraph.get(w)].forEach(v => {
            links.push({ source: nome[v], target: w});
        });
    });
}

const plot = () => {
    const svg = d3.select("svg");
    svg.selectAll("*").remove();

    // Defina a largura e altura do SVG com base no contêiner
    const svgWidth = document.querySelector("#chart-container").clientWidth;
    const svgHeight = document.querySelector("#chart-container").clientHeight;

    svg.attr("width", svgWidth)
       .attr("height", svgHeight);

    svg.append("defs").selectAll("marker")
        .data(["end"])
        .enter().append("marker")
        .attr("id", String)
        .attr("viewBox", "0 -5 10 10")
        .attr("refX", 15)
        .attr("refY", 0)
        .attr("markerWidth", 10)
        .attr("markerHeight", 10)
        .attr("orient", "auto")
        .append("path")
        .attr("d", "M0,-5L10,0L0,5")
        .attr("fill", "#6cf3d5"); // Cor da seta

    const simulation = d3.forceSimulation(nodes)
        .force("link", d3.forceLink(links).id(d => d.id).distance(100))
        .force("charge", d3.forceManyBody().strength(-30))
        .force("center", d3.forceCenter(svgWidth / 2 + 50, svgHeight / 2 + 50)); // Ajuste a posição inicial do gráfico

    const link = svg.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .attr("stroke", "#6cf3d5")
        .attr("stroke-width", 2)
        .attr("marker-end", "url(#end)");

    const dragstarted = (event, d) => {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
    };

    const dragged = (event, d) => {
        d.fx = event.x;
        d.fy = event.y;
    };

    const dragended = (event, d) => {
        if (!event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    };

    const node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(nodes)
        .enter().append("circle")
        .attr("class", "node")
        .attr("r", 10)
        .attr("fill", d => d.color)
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    const text = svg.append("g")
        .attr("class", "labels")
        .selectAll("text")
        .data(nodes)
        .enter().append("text")
        .attr("class", "label")
        .attr("stroke", "#2b364a")
        .attr("dy", -15)
        .attr("text-anchor", "middle")
        .text(d => d.id);

    node.append("title")
        .text(d => d.id);

    simulation.on("tick", () => {
        link
            .attr("x1", d => d.source.x)
            .attr("y1", d => d.source.y)
            .attr("x2", d => d.target.x)
            .attr("y2", d => d.target.y);

        node
            .attr("cx", d => {
                d.x = Math.max(10, Math.min(svgWidth - 10, d.x));
                return d.x;
            })
            .attr("cy", d => {
                d.y = Math.max(10, Math.min(svgHeight - 10, d.y));
                return d.y;
            });

        text
            .attr("x", d => d.x)
            .attr("y", d => d.y);
    });
};

// Chame a função plot ao redimensionar a janela
window.addEventListener('resize', plot);

/*

    DFS
*/

setup = (size) => {
    for(let i = 0; i < size + 2; i++){
        vis[i] = false;
    }
}

dfs = (atual) => {
    vis[atual] = true;

    for(let i = 0; i < grafo[atual].length; i++){
        if(!vis[grafo[atual][i]]){
            dfs(grafo[atual][i]);
        }
    }

    prereqList.push(nome[atual]);
}

/*
    FIND
*/

verifica = (nomeDisc) => {
    if(symbolGraph.has(nomeDisc)){
        return true;
    }
    return false;
}

find = (nomeDisc) => {
    if(!verifica(nomeDisc)){
        alert('Disciplina não encontrada :(');
        return;
    }

    // Setup do grafo
    setup(cont);
    prereqList = [];

    // Aplica a dfs
    dfs(symbolGraph.get(nomeDisc));

    // Organiza o array
    prereqList.sort();

    // Impressão na tela
    const atual = document.querySelector('#found');
    atual.innerHTML = '<h3>Disciplina Atual: ' + codDisc.get(nomeDisc) + '</h3>';

    const listaDisciplinas = document.querySelector('#results');
    listaDisciplinas.innerHTML = '';

    prereqList.forEach(pr => {
        if(pr != nomeDisc){
            const item = document.createElement('li');
            item.innerHTML = `<b>${pr} :</b> ${codDisc.get(pr)}`;
            listaDisciplinas.appendChild(item); 
        }
    });

    redefine(nomeDisc);
    plot();
}


/*
    GRAFO
*/
PreencheNomes = (size) => {
    for(let i = 0; i < size + 3; i++){
        nome[i] = -1;
    }
}

async function prepare() {
    // Fetch e Promises
    let response = await fetch('Disciplinas.json');
    let data = await response.json();

    // Inserção no grafo
    // Setup
    grafo = [[]];
    symbolGraph = new Map();
    codDisc = new Map();
    cont = 1;
    const size = data.length;

    // Setup do Grafo
    PreencheNomes(size);

    data.forEach(v => {
        
        if(!symbolGraph.has(v.codigo)){ // Atualizar a base de dados
            symbolGraph.set(v.codigo, cont);
            nome[cont] = v.codigo;
            cont++;
            codDisc.set(v.codigo, v.disciplina);
            grafo.push([]);
        }

        // Array de Prerequisitos
        let prerequisitosArray = v.prerequisitos;

        prerequisitosArray.forEach(w =>{
            if(!symbolGraph.has(w)){ // Atualizar a base de dados
                symbolGraph.set(w, cont);
                nome[cont] = w;
                cont++;
            }
            grafo[symbolGraph.get(v.codigo)].push(symbolGraph.get(w));
        })

        codDisc.set(v.codigo, v.disciplina);
    });

    std();
    plot();
}

window.onload = () => {
    prepare();
    var input = document.querySelector("#nome");
    input.value = "";
}

// Adicionar evento ao clicar o botão
document.querySelector("form").addEventListener("submit", function(event){
    event.preventDefault();

    // SETUP de integração entre html e js
    let nomeDisc = document.querySelector("#nome").value.toUpperCase().trim().replace(" ", "");

    // Busca os prerequisitos
    find(nomeDisc);
})