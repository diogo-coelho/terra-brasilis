import { Scene } from '@/arcade/interfaces'
import { SceneManager } from '@/arcade/core'

/**
 * Motor principal do jogo responsável pelo loop de renderização e gerenciamento do canvas.
 *
 * @class Game
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe Game atua como o núcleo do motor de jogo, sendo responsável por:
 * - Inicializar e gerenciar o elemento HTMLCanvasElement e seu contexto de renderização 2D
 * - Controlar o loop principal do jogo usando requestAnimationFrame
 * - Calcular e gerenciar o deltaTime para animações independentes de frame rate
 * - Coordenar a renderização das cenas através do SceneManager
 * - Configurar propriedades do canvas como dimensões e suavização de imagens
 * 
 * Esta classe implementa o padrão de game loop, atualizando o tempo a cada frame
 * e delegando a renderização para a cena ativa, garantindo 60 FPS quando possível.
 *
 * @example
 * ```typescript
 * const canvas = document.querySelector('canvas');
 * const game = new Game(canvas);
 * const sceneManager = new SceneManager();
 * 
 * game.resizeScreen();
 * game.setImageSmoothingEnabled(false);
 * game.startGame(sceneManager);
 * ```
 */
export default class Game {
  private _canvas: HTMLCanvasElement
  private _context: CanvasRenderingContext2D
  private _lastTime: number
  private _currentTime: number = 0
  private _deltaTime: number = 0

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas
    this._context = this._canvas.getContext('2d') as CanvasRenderingContext2D
    this._lastTime = performance.now()
  }

  public get canvas(): HTMLCanvasElement {
    return this._canvas
  }

  public get context(): CanvasRenderingContext2D {
    return this._context
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
    this._canvas.width = width || document.body.clientWidth
    this._canvas.height = height || document.body.clientHeight
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
    this._context.imageSmoothingEnabled = value
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
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
    scene.drawScene(this._canvas, this._context, this._deltaTime)
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
      this.updateTime()
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
  private updateTime(): void {
    this._currentTime = performance.now()
    this._deltaTime = (this._currentTime - this._lastTime) / 1000
    this._lastTime = this._currentTime
  }
}
