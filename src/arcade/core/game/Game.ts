import { Scene } from '@/arcade/interfaces'
import { SceneManager } from '@/arcade/core'

/**
 * Classe singleton responsável pelo ciclo principal do jogo (game loop) e gerenciamento do canvas.
 *
 * @class Game
 * @author Diogo Coelho
 * @version 1.1.0
 * @since 2026-01-29
 *
 * @description
 * A classe Game é o núcleo do Arcade Framework, responsável por:
 * - Inicializar e gerenciar o elemento HTMLCanvasElement e seu contexto 2D
 * - Controlar o game loop usando requestAnimationFrame
 * - Calcular e expor o deltaTime para animações fluidas e independentes do frame rate
 * - Delegar a renderização para a cena ativa via SceneManager
 * - Configurar propriedades do canvas (dimensões, suavização de imagem)
 *
 * O Game garante um ciclo de atualização consistente (60 FPS), sincronizando o tempo e a renderização
 * de acordo com o hardware do usuário. É a porta de entrada para inicialização e execução do jogo.
 *
 * @example
 * // Inicialização típica:
 * const canvas = document.querySelector('canvas');
 * const game = Game.getInstance(canvas);
 * const sceneManager = SceneManager.getInstance();
 *
 * game.resizeScreen();
 * game.setImageSmoothingEnabled(false);
 * game.startGame(sceneManager);
 */
export default class Game {
  private static _canvas: HTMLCanvasElement
  private static _context: CanvasRenderingContext2D
  private static _lastTime: number
  private static _currentTime: number = 0
  private static _deltaTime: number = 0
  private static _instance: Game

  private constructor() {}

  public set canvas(canvas: HTMLCanvasElement) {
    Game._canvas = canvas
    Game._context = Game._canvas.getContext('2d') as CanvasRenderingContext2D
    Game._lastTime = performance.now()
  }

  public get canvas(): HTMLCanvasElement {
    return Game._canvas
  }

  public get context(): CanvasRenderingContext2D {
    return Game._context
  }

  public get deltaTime(): number {
    return Game._deltaTime
  }

  public static getInstance(canvasId: string): Game {
    if (!Game._canvas || !Game._context) {
      this._instance = new Game()
      this._instance.canvas = document.getElementById(
        canvasId
      ) as HTMLCanvasElement
    }
    return this._instance
  }

  /**
   * Redimensiona o canvas do jogo para as dimensões especificadas ou para o tamanho da janela.
   *
   * @param {number} [width] - Nova largura do canvas em pixels. Se omitido, usa a largura do documento
   * @param {number} [height] - Nova altura do canvas em pixels. Se omitido, usa a altura do documento
   *
   * @returns {void}
   *
   * @remarks
   * Este método é útil para adaptar o jogo a diferentes resoluções de tela ou para implementar
   * responsividade. Quando width e height são omitidos, o canvas ocupa toda a área disponível
   * do documento (document.body.clientWidth e clientHeight).
   *
   * @example
   * // Redimensionar para tamanho customizado
   * game.resizeScreen(1920, 1080);
   *
   * @example
   * // Redimensionar para tamanho da janela
   * game.resizeScreen();
   */
  public resizeScreen(width?: number, height?: number): void {
    Game._canvas.width = width || document.body.clientWidth
    Game._canvas.height = height || document.body.clientHeight
  }

  /**
   * Controla a suavização (anti-aliasing) de imagens renderizadas no canvas.
   *
   * @param {boolean} value - `true` para habilitar suavização, `false` para pixel art nítido
   *
   * @returns {void}
   *
   * @remarks
   * Quando desabilitada (false), as imagens mantêm bordas nítidas e definidas, ideal para
   * jogos de pixel art. Quando habilitada (true), aplica anti-aliasing, suavizando as bordas
   * das imagens, adequado para gráficos de alta resolução.
   *
   * @example
   * // Para jogos pixel art
   * game.setImageSmoothingEnabled(false);
   *
   * @example
   * // Para gráficos suavizados
   * game.setImageSmoothingEnabled(true);
   */
  public setImageSmoothingEnabled(value: boolean): void {
    Game._context.imageSmoothingEnabled = value
  }

  /**
   * Método principal do loop de jogo que limpa o canvas e renderiza a cena atual.
   *
   * @param {Scene} scene - Cena ativa que será renderizada no frame atual
   *
   * @returns {void}
   *
   * @remarks
   * Este método é chamado a cada frame pelo loop do jogo (via requestAnimationFrame).
   * Ele executa duas operações fundamentais:
   * 1. Limpa todo o canvas usando clearRect
   * 2. Delega a renderização para o método drawScene da cena ativa
   *
   * O deltaTime é passado para a cena permitindo animações independentes da taxa de frames.
   */
  public main(scene: Scene): void {
    Game._context.clearRect(0, 0, Game._canvas.width, Game._canvas.height)
    scene.drawScene(Game._canvas, Game._context, Game._deltaTime)
    scene.update?.(Game._canvas, Game._context, Game._deltaTime)
  }

  /**
   * Inicia o loop principal do jogo usando requestAnimationFrame.
   *
   * @param {SceneManager} sceneManager - Gerenciador que controla as cenas do jogo
   *
   * @returns {void}
   *
   * @remarks
   * Este método inicializa o game loop recursivo que:
   * 1. Atualiza o tempo e calcula o deltaTime
   * 2. Renderiza a cena atual do SceneManager
   * 3. Agenda o próximo frame via requestAnimationFrame
   *
   * O loop continua executando até que a página seja fechada ou o processo seja interrompido.
   * A taxa de atualização é sincronizada com a taxa de refresh do monitor (tipicamente 60 FPS).
   *
   * @example
   * ```typescript
   * const sceneManager = new SceneManager();
   * sceneManager.setScenesMap([...]);
   * sceneManager.setCurrentScene('boot');
   * game.startGame(sceneManager);
   * ```
   */
  public startGame(sceneManager: SceneManager): void {
    const gameLoop = (): void => {
      Game.updateTime()
      this.main(sceneManager.currentScene)
      requestAnimationFrame(gameLoop)
    }
    gameLoop()
  }

  /**
   * Calcula e atualiza o deltaTime baseado no tempo decorrido desde o último frame.
   *
   * @private
   * @returns {void}
   *
   * @remarks
   * Este método utiliza performance.now() para calcular com precisão o tempo decorrido
   * entre frames. O deltaTime é convertido para segundos (dividido por 1000) e é usado
   * para criar animações independentes da taxa de frames, garantindo movimento consistente
   * mesmo em diferentes velocidades de renderização.
   *
   * A fórmula aplicada:
   * deltaTime = (currentTime - lastTime) / 1000
   */
  private static updateTime(): void {
    Game._currentTime = performance.now()
    Game._deltaTime = (Game._currentTime - Game._lastTime) / 1000
    Game._lastTime = Game._currentTime
  }
}
