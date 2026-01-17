import { Scene } from '@/arcade/interfaces'
import { SceneManager } from '@/arcade/core'

/**
 * Classe principal do jogo
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe Game é responsável por gerenciar
 * as operações principais do jogo, incluindo
 * a inicialização do canvas e o controle
 * do contexto de renderização.
 *
 *
 */
export default class Game {
  private _canvas: HTMLCanvasElement
  private _context: CanvasRenderingContext2D

  constructor(canvas: HTMLCanvasElement) {
    this._canvas = canvas
    this._context = this._canvas.getContext('2d') as CanvasRenderingContext2D
  }

  public get canvas(): HTMLCanvasElement {
    return this._canvas
  }

  public get context(): CanvasRenderingContext2D {
    return this._context
  }

  /**
   * Método que redimensiona a tela do jogo
   *
   * @param width - nova largura
   * @param height - nova altura
   */
  public resizeScreen(width?: number, height?: number): void {
    this._canvas.width = width || document.body.clientWidth
    this._canvas.height = height || document.body.clientHeight
  }

  /**
   * Método que habilita ou desabilita o suavização de imagens
   *
   * @param value - true para habilitar, false para desabilitar
   */
  public setImageSmoothingEnabled(value: boolean): void {
    this._context.imageSmoothingEnabled = value
  }

  /**
   * Método principal do jogo que desenha a cena atual
   * @param {Scene} scene- cena a ser desenhada
   */
  public main(scene: Scene): void {
    this._context.clearRect(0, 0, this._canvas.width, this._canvas.height)
    scene.drawScene(this._canvas, this._context)
  }

  /**
   * Método que inicia o loop do jogo
   *
   * @param {SceneManager} sceneManager - gerenciador de cenas
   */
  public startGame(sceneManager: SceneManager): void {
    const gameLoop = (): void => {
      this.main(sceneManager.currentScene)
      requestAnimationFrame(gameLoop)
    }
    gameLoop()
  }
}
