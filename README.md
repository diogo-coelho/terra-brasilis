# Terra Brasilis 🎮

> Jogo de estratégia em tempo real (RTS) isométrico desenvolvido com TypeScript e Canvas API

[![Version](https://img.shields.io/badge/version-0.0.0--alpha.1-orange.svg)](https://github.com/diogo-coelho/terra-brasilis)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)

## 📋 Sobre o Projeto

Terra Brasilis é um jogo de estratégia em tempo real (RTS) com perspectiva isométrica, desenvolvido do zero utilizando tecnologias web modernas. O projeto combina um **engine de jogo customizado** (Arcade Framework) com uma **arquitetura cliente-servidor** completa.

### ✨ Características Principais

- 🎮 **Engine de Jogo Customizado**: Framework arcade completo construído em TypeScript
- 🖼️ **Renderização Canvas**: Gráficos 2D utilizando Canvas API nativa
- 🎵 **Sistema de Áudio**: Gerenciamento de sons e música com Tone.js
- 🎨 **Sistema de Cenas**: Gerenciador robusto de cenas com eventos e transições
- 🔘 **Sistema de UI**: Componentes reutilizáveis de interface (botões, inputs)
- 🗄️ **Backend Express**: Servidor Node.js com Express e MongoDB
- 📦 **Build System**: Webpack configurado para desenvolvimento e produção
- 🎯 **TypeScript**: Tipagem estática em todo o projeto

## 🏗️ Arquitetura do Projeto

O projeto está organizado em três módulos principais:

### 1. **Arcade Framework** (`src/arcade/`)
Engine de jogo customizado com:
- **Core**: Classe `Game` principal e `SceneManager` para gerenciamento de cenas
- **Components**: Componentes reutilizáveis (GameObject, Button, ButtonGroup)
- **Events**: Sistema de eventos globais e de cena
- **Images/Sounds**: Gerenciadores de recursos multimídia
- **Enums/Interfaces**: Tipos e contratos do framework

### 2. **Game Logic** (`src/game/`)
Implementação do jogo Terra Brasilis:
- **Scenes**: Cenas do jogo (Boot, Menu, Intro, InsertName, LoadGame)
- **Components**: Componentes específicos do jogo (botões, inputs)
- **Scene Manager**: Gerenciador customizado para cenas do jogo
- **Enums**: Estados e configurações específicas do jogo

### 3. **Server** (`src/server/`)
Backend Node.js + Express:
- **Config**: Configuração do Express e Database (MongoDB)
- **Controllers**: Lógica de negócio (GameController)
- **Routes**: Rotas da API (GameRouter)
- **Utils**: Utilitários (FormattedDate)

## 🚀 Começando

### Pré-requisitos

- **Node.js** (versão 16 ou superior)
- **npm** ou **yarn**
- **MongoDB** (para funcionalidades do servidor)

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/diogo-coelho/terra-brasilis.git
cd terra-brasilis
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
# Crie um arquivo .env na raiz do projeto
cp .env.example .env
# Edite o arquivo .env com suas configurações
```

### Rodando o Projeto

#### Ambiente de Desenvolvimento
```bash
npm run dev
```
Este comando irá:
1. Compilar o servidor (webpack:dev:server)
2. Compilar o cliente/jogo (webpack:dev:game)
3. Iniciar o servidor Express

#### Build de Produção
```bash
npm run build
```
Este comando irá:
1. Executar o linter e corrigir problemas (lint:fix)
2. Compilar o servidor otimizado (webpack:prod:server)
3. Compilar o cliente otimizado (webpack:prod:game)
4. Iniciar o servidor em modo produção

### Scripts Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Inicia o projeto em modo desenvolvimento |
| `npm run build` | Build otimizado para produção |
| `npm run lint` | Verifica problemas de código com ESLint |
| `npm run lint:fix` | Corrige automaticamente problemas de código |
| `npm start` | Inicia apenas o servidor (requer build prévio) |

## 🎮 Sistema de Cenas

O jogo utiliza um sistema de gerenciamento de cenas que permite:

- **Transições suaves** entre diferentes estados do jogo
- **Ciclo de vida completo**: `onEnter()`, `update()`, `render()`, `onExit()`
- **Eventos customizados** para cada cena
- **Carregamento de recursos** específicos por cena

### Cenas Implementadas

1. **BootScene**: Inicialização e carregamento inicial
2. **IntroScene**: Tela de introdução do jogo
3. **MenuScene**: Menu principal com opções de jogo
4. **InsertNameScene**: Tela para inserir nome do jogador
5. **LoadGame**: Carregamento de jogo salvo

## 🛠️ Tecnologias Utilizadas

### Frontend
- **TypeScript**: Linguagem principal
- **Canvas API**: Renderização gráfica
- **Tone.js**: Sistema de áudio
- **SASS**: Pré-processador CSS
- **Webpack**: Bundler e build tool

### Backend
- **Node.js**: Runtime JavaScript
- **Express**: Framework web
- **MongoDB**: Banco de dados NoSQL
- **Mongoose**: ODM para MongoDB
- **body-parser**: Middleware para parsing de requisições

### DevOps & Qualidade
- **ESLint**: Linter de código
- **Prettier**: Formatação de código
- **TypeScript**: Verificação de tipos
- **Webpack Dev Server**: Servidor de desenvolvimento

## 📁 Estrutura de Diretórios

```
terra-brasilis/
├── src/
│   ├── arcade/          # Framework de jogo
│   │   ├── core/        # Classes principais
│   │   ├── components/  # Componentes reutilizáveis
│   │   ├── events/      # Sistema de eventos
│   │   ├── images/      # Gerenciador de imagens
│   │   ├── sounds/      # Gerenciador de sons
│   │   └── assets/      # Recursos do framework
│   ├── game/            # Lógica do jogo
│   │   ├── scenes/      # Cenas do jogo
│   │   ├── components/  # Componentes do jogo
│   │   └── assets/      # Recursos do jogo
│   └── server/          # Backend
│       ├── config/      # Configurações
│       ├── controllers/ # Controladores
│       ├── routes/      # Rotas da API
│       └── utils/       # Utilitários
├── webpack/             # Configurações Webpack
│   ├── dev/            # Config desenvolvimento
│   └── prod/           # Config produção
└── dist/               # Arquivos compilados
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a licença ISC - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👤 Autor

**Diogo Coelho**

- GitHub: [@diogo-coelho](https://github.com/diogo-coelho)
- Email: [Criar issue no repositório](https://github.com/diogo-coelho/terra-brasilis/issues)

## 🐛 Reportar Bugs

Encontrou um bug? Por favor, abra uma [issue](https://github.com/diogo-coelho/terra-brasilis/issues) com os seguintes detalhes:
- Descrição do bug
- Passos para reproduzir
- Comportamento esperado
- Screenshots (se aplicável)

## 🗺️ Roadmap

- [ ] Sistema de mapas isométricos
- [ ] Sistema de unidades e movimentação
- [ ] Sistema de recursos e economia
- [ ] IA para oponentes
- [ ] Multiplayer online
- [ ] Sistema de salvamento de jogo
- [ ] Tutorial interativo
- [ ] Campanha single-player

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!
