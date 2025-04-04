import Scene from './Scene'

/**
 * Classe responsável pelas configurações iniciais do jogo
 */
class Game {
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
   * Configura o tamanho da tela do jogo
   * @param width - largura do quadro do canvas
   * @param height - altura do quadro do canvas
   */
  public resize(width?: number, height?: number): void {
    this._canvas.width = width || document.body.clientWidth
    this._canvas.height = height || document.body.clientHeight
  }

  /**
   * Determina se imagens redimensionadas são suavizadas
   * @param active - boolean
   */
  public setImageSmoothingEnabled(active: boolean): void {
    this._context.imageSmoothingEnabled = active
  }

  /**
   * Função principal que renderiza a cena atual que será exibida na tela
   * @param scene - cena que será desenhada
   */
  public main(scene: Scene): void {
    this._context?.clearRect(0, 0, this._canvas.width, this._canvas.height)
    scene.drawScene(this._canvas, this._context)
  }

  /**
   * Função funciona em looping para renderizar o jogo
   * @param scene - cena que está sendo atualmente renderizada
   */
  public startGame(scene: Scene): void {
    this.main(scene)
    requestAnimationFrame(this.startGame as unknown as FrameRequestCallback)
  }
}

export default Game
