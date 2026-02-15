import { Scene } from '@/arcade/interfaces'
import { SceneManager } from '@/arcade/core'

/**
 * Motor principal do jogo.
 *
 * @class Game
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Gerencia o loop principal do jogo, controle de canvas, deltaTime e renderização de cenas.
 * Implementa o padrão Singleton para garantir uma única instância do motor.
 *
 * @remarks
 * Utiliza requestAnimationFrame para criar um loop de jogo suave e eficiente.
 * Calcula automaticamente o deltaTime para animações independentes da taxa de quadros.
 *
 * @example
 * ```typescript
 * const game = Game.getInstance('gameCanvas');
 * game.resizeScreen(800, 600);
 * game.startGame(sceneManager);
 * ```
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

  /**
   * Obtém ou cria a instância única do Game.
   *
   * @param {string} canvasId - ID do elemento canvas HTML
   *
   * @returns {Game} Instância única do Game
   *
   * @example
   * ```typescript
   * const game = Game.getInstance('myCanvas');
   * ```
   */
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
   * Redimensiona o canvas do jogo.
   *
   * @param {number} [width] - Largura do canvas (usa largura do body se não especificada)
   * @param {number} [height] - Altura do canvas (usa altura do body se não especificada)
   */
  public resizeScreen(width?: number, height?: number): void {
    Game._canvas.width = width || document.body.clientWidth
    Game._canvas.height = height || document.body.clientHeight
  }

  /**
   * Configura a suavização de imagem no contexto de renderização.
   *
   * @param {boolean} value - true para habilitar, false para desabilitar
   *
   * @remarks
   * Desabilitar pode ser útil para jogos pixel art para manter bordas nítidas.
   */
  public setImageSmoothingEnabled(value: boolean): void {
    Game._context.imageSmoothingEnabled = value
  }

  /**
   * Executa um ciclo do loop principal do jogo.
   *
   * @param {Scene} scene - Cena a ser renderizada
   *
   * @remarks
   * Limpa o canvas, desenha a cena atual e executa atualizações.
   */
  public main(scene: Scene): void {
    Game._context.clearRect(0, 0, Game._canvas.width, Game._canvas.height)
    scene.drawScene(Game._canvas, Game._context, Game._deltaTime)
    scene.update?.(Game._canvas, Game._context, Game._deltaTime)
  }

  /**
   * Inicia o loop principal do jogo.
   *
   * @param {SceneManager} sceneManager - Gerenciador de cenas do jogo
   *
   * @remarks
   * Cria um loop infinito usando requestAnimationFrame que atualiza o tempo,
   * renderiza a cena atual e solicita o próximo frame.
   *
   * @example
   * ```typescript
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

  private static updateTime(): void {
    Game._currentTime = performance.now()
    Game._deltaTime = (Game._currentTime - Game._lastTime) / 1000
    Game._lastTime = Game._currentTime
  }
}
