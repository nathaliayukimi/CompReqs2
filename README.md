# CompReqs2
Codificação de uma segunda versão para o CompReqs, do grupo de extensão CodeLab

## Motivações
Acho extremamente interessante a ideia que o [CompReqs](https://bccdev.ime.usp.br/compreqs/) (original) teve ao construir uma página que mostrasse, em graus, os pré-requisitos de uma dada matéria.  
Ainda assim, fico um pouco triste que a página não funciona atualmente, pois é uma ideia deveras interessante!  
Deixo os devidos créditos aos autores, do grupo de extensão do [USPCodeLab](https://codelab.ime.usp.br/#/)

## Observações
Essencialmente, tenho dado uma atenção, uma energia especial e maiores esforços ao grupo de extensão [MaratonUSP](https://www.ime.usp.br/~maratona/).  
Entretnto, ainda eu seja motivada por uma curiosidade irracional de experimentar um pouquinho de cada grupo de extensão que o IME-USP oferece!

Veja que não faço parte do USPCodeLab, apesar de ter participado do curso de webDev em 2023. Mas, acho muito legal o desenvolvimento front-end.  
Então, apesar de tudo, quero que entendam que esse projeto foi mais uma experiência pessoal de entender como integrar o html e o css com o javascript, além de mexer com um json via Node.js e o D3.js. Também adaptar algum algoritmo de grafos na prática.  

Sinceramente, não sou nenhuma especialista UX/UI, então, o design do site não está lá essas coisas.

Finalmente, gostaria de acrescentar que eu gostei de trabalhar nesse projeto e fico à disposição para qualquer pontos de melhoria que vocês possam dar :)

## Premissa
Inspirado no CompReqs, este site busca todas as camadas de pré-requisitos, a partir de uma dada disciplina. Nesse caso, digite o **código** da matéria que você quer pesquisar e lhe serão dadas uma lista dos pré-requisitos e um grafo da ordem deles. 

Por exemplo, para "MAC0323" - Algoritmos e Estrutura de Dados II, serão apresentados uma lista da forma
- "MAC0110" - Introdução à Computação
- "MAC0121" - Algoritmos e Estrutura de Dados I

Além de um grafo da forma "MAC0323" <- "MAC0121" <- "MAC0110", onde o nó de cor roxa é a disciplina de interesse. As setas indicam o sentido de "crescimento/ evolução" do prérequisito, isto é, dados dois vértices v -> w, v é o prérequisito de w.

Não insista em colocar o nome ou a alcunha da matéria ("EDII"), vai dar erro!

## Grafo Inicial
Na tela de carregamento do site, há um grafo geral com todas as disciplinas. Certamente, estará meio bugado, então, se um dia eu tiver paciência, eu arrumo isso huashushuahus

## Dependências
É importante que você esteja no diretório contendo o index.html, style.css, base.css, reset.css, DFS.js, logo.png e Disciplinas.json. Disto, é necessário rodar um servidor local. Você tem 2 opções:
- Usar o comando no terminal (você precisa ter python3 instalado):
  ```bash
  python -m http.server 8000
  ```
  - E acessar http://0.0.0.0:8000/
- Ou acessar via http-server (As instruções estão nesse repositório)

## Extrai.py
Este programa extrai as disciplinas, códigos e pré-requisitos do JúpiterWeb. Essecialmente, não se preocupe em rodá-lo. Mas, se quiser, vai ser necessário ter o bs4 instalado.

## Sugestões e Melhorias
Entendam que foi um programinha para se fazer nas férias. Então, se quiserem mandar sugestões de melhorias, ficarei bem agradecida!
