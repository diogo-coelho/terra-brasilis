# Changelog

Todas as mudanças relevantes do projeto Terra Brasilis serão documentadas aqui.

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
