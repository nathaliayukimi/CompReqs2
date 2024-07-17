# Informações Importantes

Para melhor uso e iteratividade total desse site, sugerimos que tenha ou faça a instalação do http-server.

Se você já o possui, vá para a *terceira* instrução desse documento.

Caso não o tenha, você pode seguir os passos abaixo.

## Passo 1: Instalar Node.js e npm
### Linux

1. Abra o terminal.
2. Atualize o índice de pacotes:

```bash
sudo apt update
```

3. Instale o Node.js e npm:

```bash
sudo apt install nodejs npm
```

4. Verifique a instalação:

```bash
node -v
npm -v
```

### Windows

1. Baixe o instalador do Node.js:
    - Acesse o site oficial do Node.js: https://nodejs.org/
    - Baixe o instalador LTS para Windows.

2. Execute o instalador e siga as instruções na tela.

3. Verifique a instalação abrindo o Prompt de Comando (cmd) e digitando:

```bash
node -v
npm -v
```

### macOS

1. Baixe o instalador do Node.js:

    - Acesse o site oficial do Node.js: https://nodejs.org/
    - Baixe o instalador LTS para macOS.

2. Execute o instalador e siga as instruções na tela.

3. Verifique a instalação abrindo o Terminal e digitando:

```bash
node -v
npm -v
```

## Passo 2: Instalar http-server

Com o Node.js e npm instalados, agora podemos instalar o http-server.
No terminal/comando:

```bash
npm install -g http-server
```

## Passo 3: Rodar um servidor localmente

1. Navegue até o diretório do projeto onde os arquivos HTML estão localizados:

```bash
cd /caminho/para/seu/diretorio
```

2. Inicie o servidor http-server:

```bash
http-server
```

3. Abra o navegador e acesse: http://localhost:8080/

## Desinstalar http-server e Node.js

**Desinstalar http-server**

No terminal/comando:

```bash
npm uninstall -g http-server
```

**Desinstalar Node.js e npm**

### Linux

1. Remover Node.js e npm:

```bash
sudo apt remove nodejs npm
```

### Windows

1. Abra "Adicionar ou remover programas".

2. Encontre "Node.js" na lista e clique em "Desinstalar".

### macOS

1. Abra o Terminal.

2. Digite o seguinte comando para remover Node.js e npm:

```bash
sudo rm -rf /usr/local/bin/node
sudo rm -rf /usr/local/lib/node_modules
sudo rm -rf /usr/local/include/node
```
