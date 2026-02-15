# Changelog

Todas as mudanças relevantes do projeto Terra Brasilis serão documentadas aqui.

## [0.0.0-alpha.2] - 2026-02-15

### Added

#### Arcade Framework - Funcionalidades Documentadas

**Sistema de Áudio** (`Sound.ts`)
- Controle completo de reprodução: play(), pause(), stop()
- Gerenciamento de volume com setVolume()
- Efeitos fade in/out com duração configurável
- Sistema de loop e preload assíncrono
- Verificação de estado de reprodução (isPlaying)
- Listeners de eventos para áudio (on/off)

**Sistema de Imagens** (`Image.ts`)
- Carregamento assíncrono de imagens
- Redimensionamento proporcional com modos cover/contain
- Ajuste automático para cobrir canvas (setImageAsCover)
- Sistema de movimento suave com deltaTime
- Posicionamento inicial e alvo para animações
- Verificação de carregamento (isLoaded)

**Componentes de UI**
- `ButtonStandard`: Botão interativo com hover, sons de feedback, alinhamento automático (vertical/horizontal), renderização customizável
- `ButtonStandardGroup`: Agrupamento de botões com layout automático, espaçamento configurável, propagação de eventos, cálculo de centralização
- `InputStandard`: Campo de entrada com cursor piscante, validação de tamanho máximo, sons de digitação, alinhamento automático, suporte a eventos de teclado
- `TextStandard`: Renderização de texto com customização de fonte, tamanho e cor

**Sistema de Eventos** (`GlobalEvents.ts`)
- Gerenciamento global de eventos de teclado (key up/down)
- Gerenciamento de eventos de mouse (click, mousemove)
- Suporte a redimensionamento de janela
- Despacho automático para cena ativa

**Estruturas Isométricas**
- `ScenarioMap`: Container para mapas de cenários com gerenciamento via Map<string, Scenario>

**Tratamento de Erros** (7 classes customizadas)
- `ButtonError`: Erros de configuração e posicionamento de botões
- `GameSessionError`: Erros relacionados a sessões de jogo
- `ImageError`: Erros de carregamento e manipulação de imagens
- `InputError`: Erros de validação de entrada
- `ScenarioError`: Erros de configuração de cenários
- `SceneManagerError`: Erros de gerenciamento de cenas
- `SoundError`: Erros de carregamento e reprodução de áudio

#### Game Logic - Cenas Documentadas

**BootScene**
- Tela inicial de boot com mensagem "Pressione qualquer tecla"
- Reprodução de música de fundo em loop
- Transição para IntroScene ao detectar qualquer entrada

**IntroScene**
- Logo animado com movimento suave (fade in)
- Imagem de fundo semitransparente
- Música tema em loop
- Aguarda tecla Enter para prosseguir ao menu principal

**MainMenuScene**
- Menu principal com opções "Novo Jogo" e "Continuar"
- Grupo de botões com hover e sons
- Gerenciamento de cursor pointer
- Navegação para InsertNameScene ou LoadGame

**InsertNameScene**
- Campo de entrada para nome do Governador-Geral
- Validação de comprimento máximo
- Botões de navegação (Voltar ao Menu, Iniciar Jogo)
- Armazenamento do nome do usuário

#### Game Logic - Componentes de UI

**Botões Especializados**
- `BackToMenuButton`: Retorna ao menu principal a partir de outras telas
- `NewGameButton`: Inicia nova partida, redireciona para InsertNameScene
- `ContinueGameButton`: Carrega partida salva, redireciona para LoadGame
- `GoToGameButton`: Salva nome do jogador no banco via POST e inicia jogo

**Inputs Especializados**
- `GovernorGeneralNameInput`: Campo temático para capturar nome do Governador-Geral com estilização colonial (cores, fontes, bordas customizadas)

#### Game Logic - Sistema Isométrico

**Gerenciamento de Partida**
- `Match`: Encapsula sessão de jogo completa, gerencia cenário, unidades e estado da partida

**Cenários**
- `ScenarioOne`: Cenário inicial representando oceano Atlântico, utiliza GridScenarioOne para layout de tiles, posiciona caravela inicial

**Unidades**
- `CaravelShip`: Unidade naval portuguesa com animação de 8 direções, movimento apenas em tiles navegáveis, possui sombra dinâmica, speed configurável

**Tiles**
- `OceanTile`: Tile de oceano com animação de 4 frames (ondas suaves em 2,5s), não caminhável mas navegável

**Utilitários**
- `TileMapper`: Mapeador de tiles usando Map<number, Tile>, gerencia criação e acesso aos diferentes tipos de tiles do jogo

### Documentation
- **168 blocos JSDoc** distribuídos em 3 módulos:
  - arcade/: 108 blocos
  - game/: 42 blocos
  - server/: 18 blocos
- Padrão estabelecido: @class, @author, @version, @since, @description, @example, @remarks, @extends, @see, @param, @returns, @throws
- Métodos com regras de negócio documentados (getters/setters excluídos)
- Exemplos práticos em todas as classes principais
- 100% de cobertura de documentação em classes de negócio

### Improved
- Padrões de código estabelecidos para novos PRs
- Guia de contribuição com checklist de JSDoc
- Arquitetura do projeto melhor documentada no README

---

## [0.0.0-alpha.1] - 2026-01-29
### Added
- **Arcade Framework** (engine customizado em TypeScript)
  - Game loop centralizado (`Game`) com deltaTime e controle de FPS
  - Gerenciamento de cenas (`SceneManager`) com transições seguras e ciclo de vida (onEnter/onExit)
  - Sistema de sprites animados (`Sprite`, `Frame`) com suporte a spritesheets, múltiplas animações e geração de sombra dinâmica
  - Renderização isométrica (projeção diamante, tiles back-to-front)
  - Sistema de áudio (sons e música, controle de volume, loop, fade)
  - Gerenciamento de imagens (carregamento assíncrono, redimensionamento, modos de ajuste)
  - Componentes de UI reutilizáveis (botões, inputs, grupos)
  - Sistema de eventos global e por cena
  - Tratamento de erros customizados por domínio
  - Temporizadores de alta precisão (`Timer`)

- **Game Logic (Terra Brasilis)**
  - Implementação de cenas: Boot, Intro, MainMenu, NewGame, InsertName, LoadGame
  - Fluxo de navegação entre cenas com transições e música de fundo
  - Componentes customizados de UI (botões e inputs específicos do jogo)
  - Validação de input do jogador
  - Organização e carregamento de assets visuais e sonoros

- **Backend/Server**
  - Servidor Express 5 configurado
  - Integração com MongoDB via Mongoose
  - API REST para operações do jogo
  - Configuração por variáveis de ambiente (.env)
  - Tratamento de erros de servidor e banco de dados
  - Servir arquivos estáticos compilados

### Changed
- Documentação JSDoc padronizada e atualizada para todas as principais classes do core
- README reescrito para refletir arquitetura, responsabilidades e exemplos atuais

### Infraestrutura
- Webpack otimizado para dev/prod (code splitting, minificação, source maps)
- ESLint, Prettier e scripts de build/lint

---

> Para releases futuros, siga o padrão [Keep a Changelog](https://keepachangelog.com/pt-BR/1.0.0/) e [SemVer](https://semver.org/lang/pt-BR/).
