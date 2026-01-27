# Terra Brasilis 🎮

> Jogo isométrico de estratégia em tempo real (RTS) desenvolvido com TypeScript e Canvas API

[![Version](https://img.shields.io/badge/version-0.0.0--alpha.1-orange.svg)](https://github.com/diogo-coelho/terra-brasilis)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)](https://www.mongodb.com/)

## 📋 Sobre o Projeto

Terra Brasilis é um jogo de estratégia em tempo real (RTS) com perspectiva isométrica, desenvolvido do zero utilizando tecnologias web modernas. O projeto combina um **engine de jogo customizado** (Arcade Framework) com uma **arquitetura cliente-servidor** completa, sem dependência de engines ou frameworks de terceiros para o jogo.

### ✨ Características Principais

- 🎮 **Engine de Jogo Customizado**: Framework arcade completo construído em TypeScript puro
- 🖼️ **Renderização Canvas**: Gráficos 2D utilizando Canvas API nativa com suporte a suavização de imagem
- 🎵 **Sistema de Áudio Nativo**: Gerenciamento de sons e música usando HTML5 Audio API
- 🎨 **Sistema de Cenas**: Gerenciador robusto com ciclo de vida completo e eventos personalizados
- 🔘 **Sistema de UI**: Componentes reutilizáveis de interface (botões, grupos de botões)
- 🗄️ **Backend Express**: Servidor Node.js com Express e MongoDB
- 📦 **Build System**: Webpack configurado para desenvolvimento e produção
- 🎯 **TypeScript**: Tipagem estática em todo o projeto com path aliases

## 🏗️ Arquitetura do Projeto

O projeto está organizado em três módulos principais:

### 1. **Arcade Framework** (`src/arcade/`)
Engine de jogo customizado construído do zero:
- **Core**: Classe `Game` com game loop baseado em `requestAnimationFrame` e delta time, `SceneManager` para gerenciamento de cenas
- **Components**: Componentes reutilizáveis (GameObject, Button abstrato, ButtonStandard, ButtonStandardGroup)
- **Events**: Sistema de eventos globais (`GlobalEvents`) e eventos de cena (`SceneEvent`)
- **Images**: Gerenciador de imagens com redimensionamento proporcional e cover
- **Sounds**: Sistema de áudio usando HTMLAudioElement com controle de volume, loop e fade
- **Enums/Interfaces/Types**: Contratos TypeScript para todo o framework

### 2. **Game Logic** (`src/game/`)
Implementação do jogo Terra Brasilis:
- **Scenes**: Cenas do jogo (Boot, MainMenu, Intro, InsertName, LoadGame)
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

O jogo utiliza um sistema de gerenciamento de cenas customizado que permite:

- **Transições suaves** entre diferentes estados do jogo
- **Ciclo de vida completo**: `onEnter()`, `drawScene()`, `handleMouseEvent()`, `onExit()`
- **Eventos customizados** através da classe `SceneEvent`
- **Carregamento de recursos** específicos por cena (imagens, sons)
- **Mapeamento de cenas** via `Map<string, Scene>` para acesso rápido
- **Delta time** para animações consistentes independente do framerate

### Cenas Implementadas

1. **BootScene**: Inicialização e carregamento inicial do jogo
2. **IntroScene**: Tela de introdução com animações e transições
3. **MainMenuScene**: Menu principal com botões interativos e música de fundo
4. **NewGameScene**: Configuração de novo jogo
5. **InsertNameScene**: Interface para inserir nome do Governador-Geral
6. **LoadGame**: Carregamento de partidas salvas

## 🛠️ Tecnologias Utilizadas

### Frontend
- **TypeScript 5.9.3**: Linguagem principal com configuração strict
- **Canvas API**: Renderização gráfica 2D com controle de image smoothing
- **HTML5 Audio API**: Sistema de áudio nativo do navegador
- **SASS 1.97**: Pré-processador CSS para estilos
- **Webpack 5.104**: Bundler com configurações separadas para dev/prod
- **PostCSS**: Processamento de CSS para otimização

### Backend
- **Node.js 16+**: Runtime JavaScript
- **Express 5.2**: Framework web moderno
- **MongoDB 7.0**: Banco de dados NoSQL
- **Mongoose 9.1**: ODM para MongoDB
- **body-parser 2.2**: Middleware para parsing de requisições
- **dotenv 17.2**: Gerenciamento de variáveis de ambiente

### DevOps & Qualidade
- **ESLint 9.39**: Linter com flat config, plugin TypeScript e Prettier
- **Prettier 3.7**: Formatação de código consistente
- **TypeScript 5.9**: Verificação de tipos em modo strict
- **Terser Webpack Plugin 5.3**: Minificação de JavaScript em produção
- **CSS Minimizer Webpack Plugin 7.0**: Otimização e minificação de CSS

## 📁 Estrutura de Diretórios

```
terra-brasilis/
├── src/
│   ├── arcade/              # Framework de jogo customizado
│   │   ├── core/            # Classes principais (Game, SceneManager)
│   │   ├── components/      # Componentes reutilizáveis e abstratos
│   │   │   ├── abstract/    # Classes abstratas (Button, Input)
│   │   │   └── ...          # GameObject, ButtonStandard, InputStandard
│   │   ├── events/          # Sistema de eventos (GlobalEvents, SceneEvent)
│   │   ├── images/          # Gerenciador de imagens
│   │   ├── sounds/          # Gerenciador de sons
│   │   ├── enums/           # Enumerações (KeyboardKey, ErrorState, etc)
│   │   ├── interfaces/      # Interfaces TypeScript (Scene, ButtonEvent, etc)
│   │   ├── errors/          # Classes de erro customizadas
│   │   ├── types/           # Type definitions
│   │   └── assets/          # Recursos do framework
│   │       ├── images/      # Imagens
│   │       ├── sounds/sfx/  # Efeitos sonoros
│   │       └── sass/        # Estilos SASS
│   ├── game/                # Lógica do jogo Terra Brasilis
│   │   ├── scenes/          # Cenas (Boot, Intro, MainMenu, NewGame, etc)
│   │   ├── components/      # Componentes específicos
│   │   │   ├── buttons/     # Botões customizados do jogo
│   │   │   └── inputs/      # Inputs customizados do jogo
│   │   ├── scene-manager/   # Gerenciador de cenas do jogo
│   │   ├── enums/           # Enums do jogo (GameSceneState)
│   │   └── views/           # HTML templates
│   ├── server/              # Backend Node.js + Express
│   │   ├── config/          # Database e configuração do servidor
│   │   ├── controllers/     # Controladores (GameController)
│   │   ├── routes/          # Rotas da API (GameRouter)
│   │   ├── model/           # Models Mongoose (UserModel)
│   │   ├── error/           # Tratamento de erros
│   │   ├── consts/          # Constantes
│   │   ├── utils/           # Utilitários (FormattedDate)
│   │   └── types/           # Type definitions
│   └── types/               # Type definitions globais
├── webpack/                 # Configurações Webpack
│   ├── dev/                 # webpack.client.js e webpack.server.js (dev)
│   └── prod/                # webpack.client.js e webpack.server.js (prod)
├── dist/                    # Arquivos compilados
├── eslint.config.js         # Configuração ESLint (flat config)
├── tsconfig.json            # Configuração TypeScript
├── package.json             # Dependências e scripts
└── README.md                # Este arquivo
```

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Commit suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## 📝 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

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

## 🎯 Funcionalidades Implementadas

### Framework Arcade
- ✅ Game loop com delta time baseado em `requestAnimationFrame`
- ✅ Sistema de cenas com ciclo de vida completo (`onEnter`, `drawScene`, `handleMouseEvent`, `onExit`)
- ✅ Gerenciamento de imagens (carregamento, redimensionamento, image smoothing)
- ✅ Sistema de áudio robusto (play, pause, stop, volume, loop, fade)
- ✅ Componentes de UI abstratos e concretos (Button, Input, ButtonStandardGroup)
- ✅ Sistema de eventos customizados (GlobalEvents, SceneEvent)
- ✅ Tratamento de erros específicos (ImageError, SoundError, ButtonError, InputError, SceneManagerError)
- ✅ Sistema de inputs com validação
- ✅ GameObject base para entidades do jogo

### Jogo
- ✅ 6 cenas implementadas (Boot, Intro, MainMenu, NewGame, InsertName, LoadGame)
- ✅ Componentes customizados (BackToMenuButton, ContinueGameButton, GoToGameButton, NewGameButton)
- ✅ Input para nome do Governador-Geral (GovernorGeneralNameInput)
- ✅ Sistema de música de fundo
- ✅ Botões interativos com estados (hover, click)
- ✅ Transições entre cenas

### Backend
- ✅ Servidor Express 5 configurado
- ✅ Conexão com MongoDB via Mongoose
- ✅ Rotas de API (GameRouter)
- ✅ GameController para lógica de negócio
- ✅ UserModel para persistência
- ✅ Servir arquivos estáticos compilados
- ✅ Suporte a variáveis de ambiente (.env)

## 🗺️ Roadmap

### Próximos Passos
- [ ] Implementar sistema de tiles isométricos
- [ ] Sistema de unidades e movimentação
- [ ] Sistema de recursos e economia
- [ ] Persistência de dados (salvamento de jogo)
- [ ] Sistema de input de teclado completo

### Futuro
- [ ] IA para oponentes
- [ ] Multiplayer online via WebSockets
- [ ] Tutorial interativo
- [ ] Campanha single-player
- [ ] Editor de mapas
- [ ] Sistema de fog of war

## 🧪 Tecnologias e Padrões

### Padrões de Código
- **POO**: Arquitetura orientada a objetos com herança e abstração
- **Path Aliases**: Imports limpos usando `@/` via tsconfig paths
- **Error Handling**: Classes de erro customizadas para cada domínio (ImageError, SoundError, ButtonError, etc)
- **Type Safety**: Interfaces e tipos TypeScript para todos os contratos
- **Strict Mode**: TypeScript configurado em modo strict para máxima segurança
- **ES2020 Target**: Código compilado para ES2020 com suporte CommonJS

### Performance
- **Game Loop**: Baseado em `requestAnimationFrame` para 60 FPS consistentes
- **Delta Time**: Animações independentes do framerate para suavidade
- **Asset Preloading**: Carregamento assíncrono de imagens e sons
- **Code Splitting**: Webpack com builds separados para client e server
- **Minificação**: Terser para JavaScript e CSS Minimizer para estilos em produção
- **Source Maps**: Habilitados para debug facilitado

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!
