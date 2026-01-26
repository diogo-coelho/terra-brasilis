# Terra Brasilis 🎮

> Jogo de estratégia em tempo real (RTS) isométrico desenvolvido com TypeScript e Canvas API

[![Version](https://img.shields.io/badge/version-0.0.0--alpha.1-orange.svg)](https://github.com/diogo-coelho/terra-brasilis)
[![License](https://img.shields.io/badge/license-ISC-blue.svg)](LICENSE)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9.3-blue)](https://www.typescriptlang.org/)

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
4. **InsertNameScene**: Interface para inserir nome do jogador
5. **LoadGame**: Carregamento de partidas salvas

## 🛠️ Tecnologias Utilizadas
 5.9.3**: Linguagem principal com configuração strict
- **Canvas API**: Renderização gráfica 2D com controle de image smoothing
- **HTML5 Audio API**: Sistema de áudio nativo do navegador
- **SASS**: Pré-processador CSS com Webpack
- **Webpack 5**: Bundler com configurações separadas dev/prod
- **SASS**: Pré-processador CSS
- **Webpack**: Bundler e build tool

### Backend
- **Node.js 25+**: Runtime JavaScript
- **Express 5**: Framework web moderno
- **MongoDB 7**: Banco de dados NoSQL
- **Mongoose 9**: ODM para MongoDB
- **body-parser**: Middleware para parsing de requisições
- **dotenv**: Gerenciamento de variáveis de ambiente

### DevOps & Qualidade
- **ESLint 9**: Linter com plugin TypeScript e Prettier
- **Prettier**: Formatação de código consistente
- **TypeScript**: Verificação de tipos em modo strict
- **TerserPlugin**: Minificação de código em produção
- **CSS Minimizer**: Otimização de CSS

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
- S🎯 Funcionalidades Implementadas

### Framework Arcade
- ✅ Game loop com delta time
- ✅ Sistema de cenas com ciclo de vida
- ✅ Gerenciamento de imagens (carregamento, redimensionamento)
- ✅ Sistema de áudio (play, pause, stop, volume, loop, fade)
- ✅ Componentes de UI (botões com hover e click)
- ✅ Sistema de eventos customizados
- ✅ Tratamento de erros específicos (ImageError, SoundError, ButtonError)

### Jogo
- ✅ Telas de boot, intro e menu principal
- ✅ Interface para novo jogo e continuar
- ✅ Sistema de música de fundo
- ✅ Botões interativos com efeitos visuais

### Backend
- ✅ Servidor Express configurado
- ✅ Conexão com MongoDB
- ✅ Rotas de API (GameRouter)
- ✅ Servir arquivos estáticos

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
- **Path Aliases**: Imports limpos usando `@/` via tsconfig
- **Error Handling**: Classes de erro customizadas para cada domínio
- **Type Safety**: Interfaces e tipos para todos os contratos

### Performance
- **Game Loop**: Baseado em `requestAnimationFrame` para 60 FPS
- **Delta Time**: Animações independentes do framerate
- **Asset Preloading**: Carregamento assíncrono de recursos
- **Code Splitting**: Webpack otimizado para produçãode jogo
- [ ] Tutorial interativo
- [ ] Campanha single-player

---

⭐ Se este projeto foi útil para você, considere dar uma estrela no GitHub!
