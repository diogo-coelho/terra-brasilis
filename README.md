# Terra Brasilis 🎮

> Jogo isométrico de estratégia desenvolvido com engine customizado em TypeScript puro

[![Version](https://img.shields.io/badge/version-0.0.0--alpha.1-orange.svg)](https://github.com/diogo-coelho/terra-brasilis)
[![License](https://img.shields.io/badge/license-MIT-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)
[![Node.js](https://img.shields.io/badge/Node.js-16%2B-green)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-7.0-green)](https://www.mongodb.com/)

## 📋 Sobre o Projeto

Terra Brasilis é um jogo de estratégia com perspectiva isométrica ambientado no período colonial brasileiro. O projeto foi construído **do zero** sem dependência de engines de terceiros, combinando um **motor de jogo customizado** (Arcade Framework) com uma **arquitetura cliente-servidor completa**.

O diferencial está na construção de todo o ecossistema de desenvolvimento: desde o game loop até o sistema de renderização isométrica, passando por gerenciamento de cenas, animações sprite-based, sistema de áudio e componentes de interface — tudo desenvolvido em TypeScript puro.

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
- 🎓 **Documentação JSDoc**: Toda codebase documentada com exemplos práticos

## 🏗️ Arquitetura do Projeto

O projeto segue uma arquitetura modular dividida em três camadas principais:


### 1. **Arcade Framework** (`src/arcade/`)

Motor de jogo customizado, modular e independente, desenvolvido 100% em TypeScript.

**Principais responsabilidades e arquitetura:**
- **Game Loop (Classe Game):** Controla o ciclo principal do jogo, calcula o deltaTime e delega a renderização para a cena ativa. Garante animações fluidas e sincronizadas com o hardware.
- **Gerenciamento de Cenas (Classe SceneManager):** Centraliza o fluxo de navegação, registra todas as cenas, controla a cena ativa e executa transições seguras (onExit/onEnter). Implementa padrão singleton.
- **Sprites & Animação (Classes Sprite e Frame):** Gerencia sprites animados com suporte a spritesheets, animação frame-by-frame automática, múltiplas animações por offset e geração de sombras dinâmicas.
- **Renderização Isométrica:** Projeção diamante (45° + 0.5 Y-scale) para tiles, com renderização back-to-front.
- **Sistema de Áudio:** Controle completo de sons e música (play, pause, stop, volume, loop, fade).
- **Gerenciamento de Imagens:** Carregamento assíncrono, redimensionamento e modos de ajuste para assets visuais.
- **Componentes de UI:** Botões, inputs e grupos reutilizáveis, com sistema de herança e abstração.
- **Sistema de Eventos:** Comunicação desacoplada entre componentes e cenas.
- **Tratamento de Erros:** Classes de erro customizadas por domínio, com mensagens descritivas.
- **Utilitários de Tempo:** Temporizadores de alta precisão para cooldowns e eventos temporais.

**Principais módulos:**
- `core/` - Núcleo do engine: Game, SceneManager, Sprite, Frame, etc.
- `components/` - Componentes de UI e entidades reutilizáveis
- `images/` e `sounds/` - Gerenciamento de assets
- `events/` - Sistema de eventos
- `errors/` - Tratamento de erros customizado
- `interfaces/`, `enums/`, `types/` - Contratos e tipos TypeScript

### 2. **Game Logic** (`src/game/`)

Implementação específica do jogo Terra Brasilis usando o Arcade Framework.

**Características principais:**
- **Sistema de Cenas**: 6 cenas implementadas (Boot, Intro, MainMenu, NewGame, InsertName, LoadGame)
- **Fluxo de Navegação**: Transições suaves entre menus e telas com música de fundo
- **Componentes Customizados**: Botões e inputs específicos do jogo estendendo o framework
- **Validação de Input**: Sistema de validação para entrada de dados do jogador
- **Asset Management**: Carregamento e organização de recursos visuais e sonoros

**Estrutura modular:**
- `scenes/` - Cenas específicas do jogo
- `components/` - Botões e inputs customizados
- `scene-manager/` - Controle de fluxo entre cenas
- `enums/` - Estados e configurações do jogo
- `views/` - Templates HTML

### 3. **Server** (`src/server/`)

Backend Node.js com Express e MongoDB para persistência e API REST.

**Características principais:**
- **HTTP Server**: Servidor Express 5 com middlewares configurados
- **Database**: Conexão MongoDB via Mongoose com event monitoring
- **API REST**: Endpoints para operações do jogo
- **Environment Config**: Suporte a variáveis de ambiente (.env)
- **Error Handling**: Tratamento de erros de servidor e banco de dados
- **Static Files**: Servir arquivos compilados do cliente

**Estrutura modular:**
- `config/` - Configuração de servidor e banco de dados
- `controllers/` - Lógica de negócio
- `routes/` - Definição de endpoints
- `model/` - Schemas Mongoose
- `error/` - Tratamento de erros
- `utils/` - Utilitários e helpers

## 🎮 Fluxo de Funcionamento

### Game Loop

```
requestAnimationFrame() → Calcula deltaTime → Renderiza cena atual → Repete (60 FPS)
```

### Navegação entre Cenas

```
Boot → Intro → MainMenu → [NewGame/LoadGame] → InsertName → [Gameplay]
```

Cada cena possui lifecycle completo: **onEnter()** (inicialização) → **drawScene()** (renderização) → **handleMouseEvent()** (interação) → **onExit()** (limpeza)

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
# Copie o arquivo de exemplo
cp .env.example .env

# Edite o .env com suas configurações
# URL_MONGO_DB=mongodb://localhost:27017/
# DATABASE=terra_brasilis
# PORT=3000
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

## 📐 Padrões de Projeto e Boas Práticas

### Padrões Arquiteturais

- **Template Method**: Classes abstratas definem fluxo, subclasses implementam detalhes específicos
- **Observer**: Sistema de eventos para comunicação desacoplada entre componentes
- **State**: Gerenciamento de estados através do sistema de cenas
- **Composite**: Agrupamento de componentes (ex: grupos de botões)
- **Singleton**: Pontos únicos de controle para Game e SceneManager

### Convenções de Código

- **POO**: Arquitetura orientada a objetos com herança, composição e encapsulamento
- **Path Aliases**: Imports limpos usando `@/` (configurado em tsconfig)
- **Strict TypeScript**: Modo strict habilitado para máxima segurança de tipos
- **JSDoc Completo**: Toda API documentada com exemplos práticos
- **Error Handling**: Classes de erro customizadas por domínio

## 📊 Performance e Otimizações

### Game Loop
- ✅ **60 FPS alvo** com `requestAnimationFrame`
- ✅ **Delta Time** para animações independentes de frame rate
- ✅ **Renderização sob demanda** (apenas quando necessário)

### Asset Management
- ✅ **Lazy Loading** de imagens e sons por cena
- ✅ **Cache de sprites** para reutilização
- ✅ **Sombras pré-renderizadas** (geradas uma vez)

### Build & Deployment
- ✅ **Code Splitting** (client vs server bundles)
- ✅ **Minificação** com Terser (prod)
- ✅ **CSS Optimization** com CSS Minimizer
- ✅ **Source Maps** para debugging
- ✅ **Target ES2020** para melhor compatibilidade

### Otimizações de Renderização
- ✅ **Image Smoothing** configurável (pixel art vs HD)
- ✅ **Culling** de elementos fora da tela
- ✅ **Batch rendering** de sprites similares

## 📁 Estrutura de Diretórios

```
terra-brasilis/
├── src/
│   ├── arcade/                    # 🎮 Motor de jogo customizado
│   │   ├── core/                  # Game loop, cenas, sprites, renderização
│   │   ├── components/            # GameObject, botões, inputs
│   │   ├── events/                # Sistema de eventos
│   │   ├── images/                # Gerenciamento de imagens
│   │   ├── sounds/                # Sistema de áudio
│   │   ├── errors/                # Erros customizados
│   │   ├── enums/                 # Enumerações
│   │   ├── interfaces/            # Contratos TypeScript
│   │   ├── types/                 # Type definitions
│   │   └── assets/                # Recursos (imagens, sons, estilos)
│   │
│   ├── game/                      # 🎯 Lógica do Terra Brasilis
│   │   ├── scenes/                # Cenas do jogo
│   │   ├── components/            # Componentes customizados
│   │   ├── scene-manager/         # Gerenciador de fluxo
│   │   ├── enums/                 # Estados do jogo
│   │   └── views/                 # Templates HTML
│   │
│   ├── server/                    # 🗄️ Backend Node.js
│   │   ├── config/                # Servidor e banco de dados
│   │   ├── controllers/           # Lógica de negócio
│   │   ├── routes/                # Endpoints REST
│   │   ├── model/                 # Schemas Mongoose
│   │   ├── error/                 # Tratamento de erros
│   │   ├── utils/                 # Utilitários
│   │   └── types/                 # Type definitions
│   │
│   └── types/                     # Type definitions globais
│
├── webpack/                       # ⚙️ Configurações Webpack
│   ├── dev/                       # Build desenvolvimento
│   └── prod/                      # Build produção (minificado)
│
├── dist/                          # 📦 Arquivos compilados (gerado)
├── .env                           # 🔒 Variáveis de ambiente
├── eslint.config.js               # Configuração ESLint
├── tsconfig.json                  # Configuração TypeScript
└── package.json                   # Dependências e scripts
```

## ✅ Estado do Projeto

### Arcade Framework (Engine)

| Módulo | Status | Descrição |
|--------|--------|-----------|
| ✅ Game Loop | Completo | Loop de renderização com deltaTime |
| ✅ Scene System | Completo | Gerenciamento de cenas e transições |
| ✅ Sprite & Animation | Completo | Sistema de sprites animados |
| ✅ Isometric Rendering | Completo | Renderização isométrica 45° |
| ✅ Audio System | Completo | Gerenciamento completo de áudio |
| ✅ Image System | Completo | Carregamento e manipulação de imagens |
| ✅ UI Components | Completo | Botões, inputs e grupos |
| ✅ Event System | Completo | Sistema de eventos |
| ✅ Error Handling | Completo | Tratamento de erros por domínio |
| ✅ JSDoc | Completo | API documentada com exemplos |

### Game (Terra Brasilis)

| Feature | Status | Descrição |
|---------|--------|-----------|
| ✅ Menu System | Completo | Boot, Intro, MainMenu, NewGame, InsertName |
| ✅ Navigation Flow | Completo | Transições entre cenas |
| ⏳ Gameplay Core | Em desenvolvimento | Mapa isométrico e mecânicas |
| ⏳ Save/Load | Em desenvolvimento | Persistência de partidas |

### Backend

| Feature | Status | Descrição |
|---------|--------|-----------|
| ✅ HTTP Server | Completo | Express configurado |
| ✅ Database | Completo | MongoDB + Mongoose |
| ✅ API Structure | Completo | Routes e controllers base |
| ⏳ Game Logic | Em desenvolvimento | Endpoints de gameplay |
## 🗺️ Roadmap

### 🔄 Em Desenvolvimento

- [ ] **Sistema de Gameplay Principal**: Mapa isométrico jogável
- [ ] **Sistema de Salvamento**: Persistência de partidas no MongoDB
- [ ] **Load Game Completo**: Carregar partidas salvas do banco

### 📋 Próximas Features

- [ ] **Sistema de Unidades**: Criação, seleção e movimentação
- [ ] **Economia e Recursos**: Madeira, ouro, alimentos, população
- [ ] **Construções**: Edifícios e infraestrutura colonial
- [ ] **Input de Teclado**: Atalhos e controles avançados
- [ ] **Minimapa**: Visão geral do mapa

### 🚀 Futuro

- [ ] **IA**: Oponentes com comportamento estratégico
- [ ] **Multiplayer**: WebSockets para partidas online
- [ ] **Campanha Single-Player**: História com missões
- [ ] **Tutorial Interativo**: Guia para novos jogadores
- [ ] **Editor de Mapas**: Criação de cenários customizados
- [ ] **Fog of War**: Sistema de visibilidade estratégica
- [ ] **Sistema de Pesquisa**: Tecnologias e upgrades

## 🎓 Aprendizados e Desafios

Este projeto foi desenvolvido como uma experiência de **construção de game engine do zero**, sem frameworks como Phaser, PixiJS ou Unity.

### Conceitos Implementados

- **Canvas API**: Manipulação direta de contexto 2D para renderização
- **Game Loop Architecture**: Timing preciso com `requestAnimationFrame` e deltaTime
- **Projeção Isométrica**: Matemática de transformação para perspectiva 45°
- **TypeScript Avançado**: Generics, abstracts, interfaces, strict mode
- **Design Patterns**: Template Method, Observer, State, Composite
- **Build Pipeline**: Webpack customizado para desenvolvimento e produção
- **Full-Stack Integration**: Cliente Canvas + Servidor Express + MongoDB

## 🤝 Contribuindo

Contribuições são bem-vindas! Para contribuir:

1. **Fork** o projeto
2. Crie uma **branch** para sua feature:
   ```bash
   git checkout -b feature/MinhaFeature
   ```
3. **Commit** suas mudanças:
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
A: Objetivo educacional de entender fundamentos de game development e ter controle total sobre a arquitetura.

**Q: O projeto está pronto para jogar?**  
A: Não. Atualmente possui apenas o framework e fluxo de menus. O gameplay principal está em desenvolvimento.

**Q: Posso usar o Arcade Framework em outros projetos?**  
A: Sim! O código é MIT License. O framework `src/arcade/` é independente e reutilizável.

**Q: Qual a diferença entre `arcade/` e `game/`?**  
A: `arcade/` é o engine genérico (reutilizável). `game/` é a implementação específica do Terra Brasilis.

**Q: Preciso instalar MongoDB para testar?**  
A: Atualmente não é obrigatório para visualizar as cenas, mas será necessário para save/load.

---

<div align="center">

⭐ **Se este projeto foi útil ou interessante, considere dar uma estrela!** ⭐

**Construído com ❤️ usando TypeScript puro, sem frameworks de terceiros**

[🏠 Início](#terra-brasilis-) • [📖 Documentação](#-arquitetura-do-projeto) • [🚀 Getting Started](#-começando) • [🤝 Contribuir](#-contribuindo)

</div>