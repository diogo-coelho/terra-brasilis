# Terra Brasilis 🎮

> Jogo isométrico de estratégia desenvolvido com engine customizado em TypeScript puro

[![Version](https://img.shields.io/badge/version-0.0.0--alpha.2-orange.svg)](https://github.com/diogo-coelho/terra-brasilis)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)](https://www.mongodb.com/)
[![JSDoc](https://img.shields.io/badge/JSDoc-168_blocos-success)](https://jsdoc.app/)

## 📋 Sobre o Projeto

Terra Brasilis é um jogo de estratégia com perspectiva isométrica ambientado no período colonial brasileiro. O projeto foi construído **do zero** sem dependência de engines de terceiros, combinando um **motor de jogo customizado** (Arcade Framework) com uma **arquitetura cliente-servidor completa**.

O diferencial está na construção de todo o ecossistema de desenvolvimento: desde o game loop até o sistema de renderização isométrica, passando por gerenciamento de cenas, animações sprite-based, sistema de áudio e componentes de interface — tudo desenvolvido em TypeScript puro com **documentação JSDoc completa** (168 blocos documentados).

### ✨ Características Principais

- 🎮 **Arcade Framework Customizado**: Motor de jogo completo construído do zero em TypeScript
- 🎨 **Renderização Isométrica**: Sistema de tiles com projeção diamante (45° rotation + 0.5 Y-scale)
- 🖼️ **Canvas API Nativo**: Renderização 2D otimizada com controle de image smoothing
- 🎬 **Sistema de Animação**: Sprite sheets com timing automático e controle frame-by-frame
- 🎵 **Motor de Áudio**: Gerenciamento completo de sons e música (HTML5 Audio API)
- 🎯 **Arquitetura de Cenas**: Lifecycle completo com transições e eventos customizados
- 🔘 **Componentes de UI**: Sistema reutilizável (botões, inputs, grupos) com herança e abstração
- 🗄️ **Backend Node.js**: Servidor Express com MongoDB para persistência
- 📦 **Build System**: Webpack otimizado para dev/prod com code splitting
- 📚 **Documentação JSDoc Completa**: 168 blocos documentados com exemplos práticos
  - 108 blocos no módulo **arcade** (framework)
  - 42 blocos no módulo **game** (lógica do jogo)
  - 18 blocos no módulo **server** (backend)

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura modular dividida em três camadas principais:

### 1. **Arcade Framework** (`src/arcade/`) - 108 blocos JSDoc

Motor de jogo customizado, modular e independente, desenvolvido 100% em TypeScript.

**Principais responsabilidades:**

#### Core Engine
- **Game Loop (Classe Game):** Controla o ciclo principal do jogo, calcula o deltaTime e delega a renderização para a cena ativa. Garante animações fluidas e sincronizadas com o hardware via `requestAnimationFrame`.
- **Gerenciamento de Cenas (Classe SceneManager):** Centraliza o fluxo de navegação, registra todas as cenas, controla a cena ativa e executa transições seguras (onExit/onEnter). Implementa padrão singleton.
- **Sprites & Animação (Classes Sprite e Frame):** Gerencia sprites animados com suporte a spritesheets, animação frame-by-frame automática, múltiplas animações por offset e geração de sombras dinâmicas.

#### Renderização Isométrica
- **Tile e TileMap:** Sistema de tiles isométricos com projeção diamante (45° + 0.5 Y-scale)
- **Scenario e ScenarioMap:** Gerenciamento de cenários e mapas do jogo
- **Unit:** Unidades móveis com direção e estados (idle, moving)
- **GameObject e GameSession:** Base para entidades e sessões de jogo

#### Sistemas de Assets
- **Sistema de Áudio (Classe Sound):** Controle completo de sons e música (play, pause, stop, volume, loop, fade in/out, preload)
- **Gerenciamento de Imagens (Classe Image):** Carregamento assíncrono, redimensionamento proporcional, modos de ajuste (cover/contain), movimento suave

#### Interface de Usuário
- **Componentes Abstract (Button, Input, Text):** Classes base com Template Method pattern
- **ButtonStandard:** Botões com hover, sons, alinhamento automático
- **ButtonStandardGroup:** Grupos de botões com layout vertical/horizontal
- **InputStandard:** Campos de texto com cursor piscante, validação de tamanho
- **TextStandard:** Renderização de texto com customização de fonte

#### Infraestrutura
- **Sistema de Eventos (GlobalEvents):** Gerenciamento global de teclado, mouse e redimensionamento
- **Tratamento de Erros:** 7 classes de erro customizadas (ButtonError, GameSessionError, ImageError, InputError, ScenarioError, SceneManagerError, SoundError)
- **Utilitários de Tempo (Timer, GameCalendar):** Temporizadores de alta precisão para cooldowns e eventos temporais

**Estrutura modular:**
```
arcade/
├── core/                         # Motor principal
│   ├── Game.ts                   # Game loop e controle FPS
│   ├── SceneManager.ts           # Gerenciamento de cenas
│   ├── SceneEvent.ts             # Base para eventos de cena
│   ├── Sprite.ts                 # Sistema de sprites
│   ├── game/                     # Entidades de jogo
│   │   ├── GameObject.ts
│   │   └── GameSession.ts
│   ├── isometric/                # Renderização isométrica
│   │   ├── Scenario.ts
│   │   ├── ScenarioMap.ts
│   │   ├── Tile.ts
│   │   ├── TileMap.ts
│   │   └── Unit.ts
│   └── timer/                    # Sistema de tempo
│       ├── Timer.ts
│       └── GameCalendar.ts
├── ui/                           # Componentes UI
│   ├── abstract/                 # Classes base
│   │   ├── Button.ts
│   │   ├── Input.ts
│   │   └── Text.ts
│   ├── ButtonStandard.ts
│   ├── ButtonStandardGroup.ts
│   ├── InputStandard.ts
│   └── TextStandard.ts
├── sounds/                       # Sistema de áudio
│   └── Sound.ts
├── images/                       # Gerenciamento de imagens
│   └── Image.ts
├── events/                       # Sistema de eventos
│   └── GlobalEvents.ts
├── errors/                       # Erros customizados (7 classes)
│   ├── ButtonError.ts
│   ├── GameSessionError.ts
│   ├── ImageError.ts
│   ├── InputError.ts
│   ├── ScenarioError.ts
│   ├── SceneManagerError.ts
│   └── SoundError.ts
├── enums/                        # Enumerações
├── interfaces/                   # Contratos TypeScript
├── types/                        # Type definitions
└── assets/                       # Recursos (imagens, sons, estilos)
```

### 2. **Game Logic** (`src/game/`) - 42 blocos JSDoc

Implementação específica do jogo Terra Brasilis usando o Arcade Framework.

**Características principais:**

#### Sistema de Cenas (6 cenas implementadas)
- **BootScene:** Tela de boot com "Pressione qualquer tecla"
- **IntroScene:** Introdução com logo animado e música tema
- **MainMenuScene:** Menu principal (Novo Jogo, Continuar)
- **InsertNameScene:** Inserção do nome do Governador-Geral
- **GameScene:** Cena principal de gameplay
- **LoadGame:** Carregamento de partidas salvas

#### Componentes Customizados
- **Botões (4 classes):** BackToMenuButton, ContinueGameButton, GoToGameButton, NewGameButton
- **Inputs (1 classe):** GovernorGeneralNameInput
- Todos estendem componentes do Arcade Framework com comportamentos específicos

#### Sistema Isométrico do Jogo
- **Match:** Gerenciamento de partidas (extends GameSession)
- **ScenarioOne:** Cenário oceânico inicial (extends Scenario)
- **CaravelShip:** Unidade de navio (extends Unit)
- **OceanTile:** Tile de oceano (extends Tile)
- **TileMapper:** Mapeamento de grids para tiles
- **GridScenarioOne:** Grid 10x10 do primeiro cenário

**Estrutura modular:**
```
game/
├── scenes/                       # 6 cenas do jogo
│   ├── BootScene.ts
│   ├── IntroScene.ts
│   ├── MainMenuScene.ts
│   ├── InsertNameScene.ts
│   ├── GameScene.ts
│   └── LoadGame.ts
├── ui/                           # Componentes customizados
│   ├── buttons/                  # 4 botões
│   │   ├── BackToMenuButton.ts
│   │   ├── ContinueGameButton.ts
│   │   ├── GoToGameButton.ts
│   │   └── NewGameButton.ts
│   └── inputs/                   # 1 input
│       └── GovernorGeneralNameInput.ts
├── isometric/                    # Sistema isométrico
│   ├── game-world/
│   │   └── Match.ts              # Gerenciamento de partidas
│   ├── scenarios/
│   │   └── ScenarioOne.ts        # Cenário oceânico
│   ├── units/
│   │   └── CaravelShip.ts        # Unidade de navio
│   ├── tiles/
│   │   └── OceanTile.ts          # Tile de oceano
│   └── grids/
│       ├── TileMapper.ts         # Mapeador de grids
│       └── GridScenarioOne.ts    # Grid 10x10
├── scene-manager/                # Controle de fluxo
│   └── index.ts
├── system/                       # Motor do jogo
│   └── Engine.ts
├── enums/                        # Estados do jogo
│   └── GameSceneState.ts
└── views/                        # Templates HTML
    └── index.html
```

### 3. **Server** (`src/server/`) - 18 blocos JSDoc

Backend Node.js com Express e MongoDB para persistência e API REST.

**Características principais:**
- **HTTP Server (Server):** Servidor Express 5 com middlewares configurados
- **Database (Database):** Conexão MongoDB via Mongoose com event monitoring
- **MainApplication:** Orquestração da inicialização do servidor
- **API REST:** Endpoints para operações do jogo (GameController, GameRouter)
- **Environment Config:** Suporte a variáveis de ambiente (.env)
- **Error Handling:** Classes de erro (ServerError, MongoDBError)
- **FormattedDate:** Utilitário para formatação de datas
- **UserModel:** Schema Mongoose para usuários

**Estrutura modular:**
```
server/
├── config/                       # Configuração
│   ├── Server.ts                 # Servidor Express
│   ├── Database.ts               # Conexão MongoDB
│   └── MainApplication.ts        # Inicialização
├── controllers/                  # Lógica de negócio
│   └── GameController.ts
├── routes/                       # Endpoints REST
│   └── GameRouter.ts
├── model/                        # Schemas Mongoose
│   └── UserModel.ts
├── error/                        # Tratamento de erros
│   ├── ServerError.ts
│   └── MongoDB.ts
├── utils/                        # Utilitários
│   └── FormattedDate.ts
└── types/                        # Type definitions
    └── types.d.ts
```

## 🎮 Fluxo de Funcionamento

### Game Loop

```
requestAnimationFrame() → Calcula deltaTime → Renderiza cena atual → Repete (60 FPS)
```

### Navegação entre Cenas

```
Boot → Intro → MainMenu → [NewGame/LoadGame] → InsertName → GameScene
```

Cada cena possui lifecycle completo: **onEnter()** (inicialização) → **drawScene()** (renderização) → **handleKeyboardEvent()** / **handleMouseEvent()** (interação) → **onExit()** (limpeza)

### Sistema de Renderização Isométrica

```typescript
// Projeção diamante para tiles isométricos
ctx.save()
ctx.scale(1, 0.5)        // Achatar 50% no eixo Y
ctx.rotate(Math.PI / 4)  // Rotacionar 45°
ctx.drawImage(...)       // Desenhar sprite
ctx.restore()
```

Renderização: **back-to-front** (tiles do fundo primeiro para correta sobreposição)

## 🚀 Começando

### Pré-requisitos

- **Node.js** 16+ (recomendado: LTS)
- **npm** ou **yarn**
- **MongoDB** 7.0+ (local ou Atlas)

### Instalação

1. **Clone o repositório:**
```bash
git clone https://github.com/diogo-coelho/terra-brasilis.git
cd terra-brasilis
```

2. **Instale as dependências:**
```bash
npm install
```

3. **Configure as variáveis de ambiente:**
```bash
# Crie o arquivo .env na raiz do projeto
# Exemplo:
URL_MONGO_DB=mongodb://localhost:27017/
DATABASE=terra_brasilis
PORT=3000
```

### Rodando o Projeto

#### Modo Desenvolvimento
```bash
npm run dev
```

**O que acontece:**
1. ✅ Compila servidor (webpack:dev:server)
2. ✅ Compila cliente/jogo (webpack:dev:game)
3. ✅ Inicia servidor Express na porta 3000
4. 🎮 Acesse: `http://localhost:3000`

#### Build de Produção
```bash
npm run build
```

**O que acontece:**
1. ✅ Executa linter e corrige problemas (lint:fix)
2. ✅ Compila servidor otimizado (webpack:prod:server)
3. ✅ Compila cliente minificado (webpack:prod:game)
4. ✅ Inicia servidor em modo produção

### Scripts NPM Disponíveis

| Script | Descrição |
|--------|-----------|
| `npm run dev` | Desenvolvimento: compila e inicia servidor |
| `npm run build` | Produção: lint + build otimizado + start |
| `npm start` | Inicia servidor (requer build prévio) |
| `npm run lint` | Verifica problemas ESLint |
| `npm run lint:fix` | Corrige automaticamente problemas de código |
| `npm run webpack:dev:game` | Compila apenas cliente (dev) |
| `npm run webpack:dev:server` | Compila apenas servidor (dev) |
| `npm run webpack:prod:game` | Build otimizado do cliente |
| `npm run webpack:prod:server` | Build otimizado do servidor |

## 🛠️ Stack Tecnológica

### Frontend / Game Engine

| Tecnologia | Versão | Propósito |
|-----------|--------|-----------|
| **TypeScript** | 5.9.3 | Linguagem principal com strict mode |
| **Canvas API** | Native | Renderização 2D com controle de image smoothing |
| **HTML5 Audio API** | Native | Sistema de áudio para música e SFX |
| **SASS** | 1.97 | Pré-processador CSS |
| **Webpack** | 5.104 | Module bundler com code splitting |

### Backend

| Tecnologia | Versão | Propósito |
|-----------|--------|-----------|
| **Node.js** | 16+ | Runtime JavaScript |
| **Express** | 5.2 | Framework web |
| **MongoDB** | 7.0 | Banco de dados NoSQL |
| **Mongoose** | 9.1 | ODM para MongoDB |
| **body-parser** | 2.2 | Middleware para parsing JSON |
| **dotenv** | 17.2 | Variáveis de ambiente |

### DevOps & Qualidade

| Tecnologia | Versão | Propósito |
|-----------|--------|-----------|
| **ESLint** | 9.39 | Linter com flat config + TypeScript plugin |
| **Prettier** | 3.7 | Formatação de código |
| **Terser** | 5.3 | Minificação JavaScript (prod) |
| **CSS Minimizer** | 7.0 | Otimização CSS (prod) |
| **ts-loader** | 9.5 | Webpack loader para TypeScript |
| **sass-loader** | 16.0 | Webpack loader para SASS |
| **JSDoc** | - | Documentação completa (168 blocos) |

## 📐 Padrões de Projeto e Boas Práticas

### Padrões Arquiteturais

- **Template Method**: Classes abstratas definem fluxo, subclasses implementam detalhes específicos
- **Observer**: Sistema de eventos para comunicação desacoplada entre componentes
- **State**: Gerenciamento de estados através do sistema de cenas
- **Composite**: Agrupamento de componentes (ex: grupos de botões)
- **Singleton**: Pontos únicos de controle para Game e SceneManager
- **Inheritance**: Hierarquia de classes com abstrações (Button, Input, Text, Tile, Unit)

### Convenções de Código

- **POO**: Arquitetura orientada a objetos com herança, composição e encapsulamento
- **Path Aliases**: Imports limpos usando `@/` (configurado em tsconfig)
- **Strict TypeScript**: Modo strict habilitado para máxima segurança de tipos
- **JSDoc Completo**: 168 blocos documentados com exemplos práticos
  - Todas as classes documentadas com @class, @author, @version, @since
  - Métodos com regras de negócio documentados (exceto getters/setters)
  - Exemplos práticos em @example
  - Relacionamentos em @extends, @see, @remarks
- **Error Handling**: Classes de erro customizadas por domínio (7 no arcade, 2 no server)
- **Conventional Commits**: Mensagens padronizadas (feat, fix, docs, refactor, etc.)

## 📊 Performance e Otimizações

### Game Loop
- ✅ **60 FPS alvo** com `requestAnimationFrame`
- ✅ **Delta Time** para animações independentes de frame rate
- ✅ **Renderização sob demanda** (apenas quando necessário)

### Asset Management
- ✅ **Lazy Loading** de imagens e sons por cena
- ✅ **Cache de sprites** para reutilização
- ✅ **Sombras pré-renderizadas** (geradas uma vez)
- ✅ **Preload de áudio** antes de reprodução

### Build & Deployment
- ✅ **Code Splitting** (client vs server bundles)
- ✅ **Minificação** com Terser (prod)
- ✅ **CSS Optimization** com CSS Minimizer
- ✅ **Source Maps** para debugging
- ✅ **Target ES2020** para melhor compatibilidade

### Otimizações de Renderização
- ✅ **Image Smoothing** configurável (pixel art vs HD)
- ✅ **Renderização back-to-front** para tiles isométricos
- ✅ **Transformações Canvas** otimizadas (save/restore)

## 📁 Estrutura de Diretórios

```
terra-brasilis/
├── src/
│   ├── arcade/                    # 🎮 Motor de jogo customizado (108 JSDoc)
│   │   ├── core/                  # Game loop, cenas, sprites
│   │   │   ├── Game.ts
│   │   │   ├── SceneManager.ts
│   │   │   ├── SceneEvent.ts
│   │   │   ├── Sprite.ts
│   │   │   ├── game/              # GameObject, GameSession
│   │   │   ├── isometric/         # Scenario, Tile, TileMap, Unit
│   │   │   └── timer/             # Timer, GameCalendar
│   │   ├── ui/                    # Componentes de interface
│   │   │   ├── abstract/          # Button, Input, Text (base)
│   │   │   ├── ButtonStandard.ts
│   │   │   ├── ButtonStandardGroup.ts
│   │   │   ├── InputStandard.ts
│   │   │   └── TextStandard.ts
│   │   ├── images/                # Image (gerenciamento)
│   │   ├── sounds/                # Sound (sistema de áudio)
│   │   ├── events/                # GlobalEvents
│   │   ├── errors/                # 7 classes de erro customizadas
│   │   ├── enums/                 # Enumerações
│   │   ├── interfaces/            # Contratos TypeScript
│   │   ├── types/                 # Type definitions
│   │   └── assets/                # Recursos (imagens, sons, estilos)
│   │
│   ├── game/                      # 🎯 Lógica do Terra Brasilis (42 JSDoc)
│   │   ├── scenes/                # 6 cenas do jogo
│   │   │   ├── BootScene.ts
│   │   │   ├── IntroScene.ts
│   │   │   ├── MainMenuScene.ts
│   │   │   ├── InsertNameScene.ts
│   │   │   ├── GameScene.ts
│   │   │   └── LoadGame.ts
│   │   ├── ui/                    # Componentes customizados
│   │   │   ├── buttons/           # 4 botões do jogo
│   │   │   └── inputs/            # 1 input customizado
│   │   ├── isometric/             # Sistema isométrico
│   │   │   ├── game-world/        # Match
│   │   │   ├── scenarios/         # ScenarioOne
│   │   │   ├── units/             # CaravelShip
│   │   │   ├── tiles/             # OceanTile
│   │   │   └── grids/             # TileMapper, GridScenarioOne
│   │   ├── scene-manager/         # Gerenciador de fluxo
│   │   ├── system/                # Engine
│   │   ├── enums/                 # GameSceneState
│   │   └── views/                 # Templates HTML
│   │
│   ├── server/                    # 🗄️ Backend Node.js (18 JSDoc)
│   │   ├── config/                # Server, Database, MainApplication
│   │   ├── controllers/           # GameController
│   │   ├── routes/                # GameRouter
│   │   ├── model/                 # UserModel (Mongoose)
│   │   ├── error/                 # ServerError, MongoDBError
│   │   ├── utils/                 # FormattedDate
│   │   └── types/                 # Type definitions
│   │
│   └── types/                     # Type definitions globais
│
├── webpack/                       # ⚙️ Configurações Webpack
│   ├── dev/                       # webpack.client.js, webpack.server.js
│   └── prod/                      # webpack.client.js, webpack.server.js
│
├── dist/                          # 📦 Arquivos compilados (gerado)
├── .env                           # 🔒 Variáveis de ambiente
├── eslint.config.js               # Configuração ESLint (flat config)
├── tsconfig.json                  # Configuração TypeScript
├── package.json                   # Dependências e scripts
├── CHANGELOG.md                   # Histórico de mudanças
├── LICENSE                        # Licença MIT
└── README.md                      # Este arquivo
```

## ✅ Estado do Projeto

### 📚 Documentação JSDoc - **168 blocos completos**

| Módulo | Blocos JSDoc | Status |
|--------|--------------|--------|
| **arcade/** | 108 | ✅ Completo |
| **game/** | 42 | ✅ Completo |
| **server/** | 18 | ✅ Completo |
| **Total** | **168** | ✅ **100% documentado** |

**Padrão de documentação:**
- ✅ Todas as classes com @class, @author, @version, @since
- ✅ Métodos com regras de negócio documentados (getters/setters excluídos)
- ✅ Exemplos práticos em @example
- ✅ Relacionamentos em @extends, @see, @remarks
- ✅ Parâmetros, retornos e exceções documentados

### Arcade Framework (Engine)

| Módulo | Status | Descrição |
|--------|--------|-----------|
| ✅ Game Loop | Completo | Loop de renderização com deltaTime e 60 FPS |
| ✅ Scene System | Completo | 6 cenas + gerenciamento e transições |
| ✅ Sprite & Animation | Completo | Sistema de sprites animados com sombras |
| ✅ Isometric Rendering | Completo | Renderização isométrica 45° (Tile, TileMap, Unit) |
| ✅ Audio System | Completo | Sound com fade, loop, volume, preload |
| ✅ Image System | Completo | Carregamento, redimensionamento, movimento |
| ✅ UI Components | Completo | Button, Input, Text + grupos |
| ✅ Event System | Completo | GlobalEvents (teclado, mouse, resize) |
| ✅ Error Handling | Completo | 7 classes de erro customizadas |
| ✅ Timer System | Completo | Timer e GameCalendar |
| ✅ JSDoc | **Completo** | **108 blocos documentados** |

### Game (Terra Brasilis)

| Feature | Status | Descrição |
|---------|--------|-----------|
| ✅ Menu System | Completo | Boot, Intro, MainMenu, InsertName |
| ✅ Navigation Flow | Completo | Transições entre cenas com música |
| ✅ Custom UI | Completo | 4 botões + 1 input customizados |
| ✅ Isometric Setup | Completo | Match, ScenarioOne, CaravelShip, OceanTile |
| ⏳ Gameplay Core | Em desenvolvimento | Mecânicas de jogo e interação |
| ⏳ Save/Load | Parcial | LoadGame implementado, lógica em desenvolvimento |
| ✅ JSDoc | **Completo** | **42 blocos documentados** |

### Backend

| Feature | Status | Descrição |
|---------|--------|-----------|
| ✅ HTTP Server | Completo | Express 5 configurado (Server, MainApplication) |
| ✅ Database | Completo | MongoDB + Mongoose (Database) |
| ✅ API Structure | Completo | GameController + GameRouter |
| ✅ Models | Completo | UserModel (Mongoose schema) |
| ✅ Error Handling | Completo | ServerError, MongoDBError |
| ⏳ Game Logic | Em desenvolvimento | Endpoints de gameplay e persistência |
| ✅ JSDoc | **Completo** | **18 blocos documentados** |
## 🗺️ Roadmap

### 🔄 Em Desenvolvimento (v0.0.0-alpha.3)

- [ ] **Sistema de Gameplay Principal**: Mapa isométrico totalmente jogável
- [ ] **Mecânicas de Unidades**: Seleção, movimentação e comandos
- [ ] **Sistema de Salvamento**: Persistência completa no MongoDB
- [ ] **Load Game Funcional**: Carregar e restaurar partidas salvas

### 📋 Próximas Features (v0.0.0-alpha.4+)

- [ ] **Sistema de Recursos**: Madeira, ouro, alimentos, população
- [ ] **Construções**: Edifícios e infraestrutura colonial
- [ ] **Economia**: Produção, comércio e gerenciamento
- [ ] **Input de Teclado**: Atalhos e controles avançados
- [ ] **Minimapa**: Visão geral do mapa
- [ ] **Fog of War**: Sistema de visibilidade estratégica
- [ ] **Tutorial**: Guia interativo para novos jogadores

### 🚀 Futuro (v0.1.0+)

- [ ] **IA**: Oponentes com comportamento estratégico
- [ ] **Multiplayer**: WebSockets para partidas online
- [ ] **Campanha Single-Player**: História com missões temáticas
- [ ] **Editor de Mapas**: Criação de cenários customizados
- [ ] **Sistema de Pesquisa**: Tecnologias e upgrades
- [ ] **Eventos Históricos**: Acontecimentos do período colonial
- [ ] **Conquistas**: Sistema de achievements
- [ ] **Mods**: Suporte a modificações da comunidade

## 🎓 Aprendizados e Desafios

Este projeto foi desenvolvido como uma experiência de **construção de game engine do zero**, sem frameworks como Phaser, PixiJS ou Unity.

### Conceitos Implementados

- **Canvas API**: Manipulação direta de contexto 2D para renderização
- **Game Loop Architecture**: Timing preciso com `requestAnimationFrame` e deltaTime
- **Projeção Isométrica**: Matemática de transformação para perspectiva 45° (diamond/staggered)
- **TypeScript Avançado**: Generics, abstracts, interfaces, strict mode, path aliases
- **Design Patterns**: Template Method, Observer, State, Composite, Singleton, Inheritance
- **Build Pipeline**: Webpack customizado para desenvolvimento e produção
- **Full-Stack Integration**: Cliente Canvas + Servidor Express + MongoDB
- **Documentação Técnica**: JSDoc completo com 168 blocos (padrão profissional)

### Desafios Técnicos Superados

- ✅ Renderização isométrica com transformações Canvas
- ✅ Sistema de animação frame-by-frame sincronizado
- ✅ Gerenciamento de estado entre cenas
- ✅ Fade in/out de áudio com controle preciso
- ✅ Movimento suave de imagens com deltaTime
- ✅ Cursor piscante em campos de input
- ✅ Build system para cliente e servidor separados
- ✅ Documentação completa de 168 classes/métodos

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature:
   ```bash
   git checkout -b feature/MinhaFeature
   ```
3. **Commit** suas mudanças seguindo [Conventional Commits](https://www.conventionalcommits.org/):
   ```bash
   git commit -m 'feat: adiciona sistema de unidades'
   ```
4. **Push** para a branch:
   ```bash
   git push origin feature/MinhaFeature
   ```
5. Abra um **Pull Request**

### Convenções de Commit

Seguimos [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` Nova funcionalidade
- `fix:` Correção de bug
- `docs:` Documentação
- `style:` Formatação (não afeta código)
- `refactor:` Refatoração de código
- `test:` Testes
- `chore:` Manutenção

### Padrões de Código

Antes de enviar PR, certifique-se de:
- ✅ Executar `npm run lint:fix` para corrigir problemas de código
- ✅ Adicionar JSDoc completo para novas classes/métodos
  - @class, @author (Diogo Coelho), @version (1.0.0), @since (2024-06-20)
  - @description, @example, @remarks quando aplicável
  - @param, @returns, @throws para métodos
- ✅ Seguir arquitetura existente (herança, abstração, composição)
- ✅ Manter strict mode do TypeScript
- ✅ Testar em desenvolvimento (`npm run dev`)

## 📝 Licença

Este projeto está licenciado sob a **licença MIT** - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 👤 Autor

**Diogo Coelho**

- GitHub: [@diogo-coelho](https://github.com/diogo-coelho)
- Projeto: [Terra Brasilis](https://github.com/diogo-coelho/terra-brasilis)
- Issues: [Reportar problemas](https://github.com/diogo-coelho/terra-brasilis/issues)

## 🐛 Reportar Bugs

Encontrou um bug? Abra uma [issue](https://github.com/diogo-coelho/terra-brasilis/issues) com:

- **Descrição clara** do problema
- **Passos para reproduzir**
- **Comportamento esperado** vs **comportamento atual**
- **Screenshots** (se aplicável)
- **Ambiente**: OS, navegador, versão Node.js

## 💡 Perguntas Frequentes (FAQ)

**Q: Por que criar um engine do zero em vez de usar Phaser/PixiJS?**  
A: Objetivo educacional de entender fundamentos de game development, ter controle total sobre a arquitetura e criar algo 100% customizado.

**Q: O projeto está pronto para jogar?**  
A: Não.

**Q: Posso usar o Arcade Framework em outros projetos?**  
A: Sim! O código é MIT License. O framework `src/arcade/` é independente, bem documentado e reutilizável em qualquer projeto Canvas 2D.

**Q: Qual a diferença entre `arcade/` e `game/`?**  
A: 
- `arcade/` é o **engine genérico** (108 classes documentadas) - reutilizável em qualquer jogo
- `game/` é a **implementação específica** do Terra Brasilis (42 classes documentadas)

**Q: Preciso instalar MongoDB para testar?**  
A: Atualmente não é obrigatório para visualizar as cenas e navegação. MongoDB será necessário quando o sistema de save/load estiver completo.

**Q: Como funciona a documentação JSDoc?**  
A: Todo o projeto possui 168 blocos JSDoc completos. Para gerar a documentação HTML:
```bash
# Instale JSDoc globalmente
npm install -g jsdoc

# Gere a documentação
jsdoc -r src/ -d docs/
```

---

<div align="center">

⭐ **Se este projeto foi útil ou interessante, considere dar uma estrela!** ⭐

**Construído com ❤️ usando TypeScript puro, sem frameworks de terceiros**

**168 blocos JSDoc** • **3 módulos** • **16+ classes documentadas**

[🏠 Início](#terra-brasilis-) • [📖 Documentação](#-arquitetura-do-projeto) • [🚀 Getting Started](#-começando) • [🤝 Contribuir](#-contribuindo)

</div>