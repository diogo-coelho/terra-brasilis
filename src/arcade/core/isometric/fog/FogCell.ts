import { FogState } from './FogState'

export default class FogCell {
  protected _state: FogState = FogState.HIDDEN
  protected _width: number = 0
  protected _height: number = 0

  constructor(
    state: FogState = FogState.HIDDEN,
    width: number = 0,
    height: number = 0
  ) {
    this._state = state
    this._width = width
    this._height = height
  }

  public get state(): FogState {
    return this._state
  }

  public set state(value: FogState) {
    this._state = value
  }

  public get width(): number {
    return this._width
  }

  public set width(value: number) {
    this._width = value
  }

  public get height(): number {
    return this._height
  }

  public set height(value: number) {
    this._height = value
  }

  /**
   * Desenha um diamante representando a célula de névoa no contexto do canvas.
   * @param {CanvasRenderingContext2D} context - Contexto de renderização do canvas
   * @param {number} worldX - Posição X no mundo
   * @param {number} worldY - Posição Y no mundo
   */
  public drawDiamond(
    context: CanvasRenderingContext2D,
    worldX: number,
    worldY: number
  ): void {
    context.beginPath()
    context.moveTo(worldX + this.width / 2, worldY)
    context.lineTo(worldX + this.width, worldY + this.height / 2)
    context.lineTo(worldX + this.width / 2, worldY + this.height)
    context.lineTo(worldX, worldY + this.height / 2)
    context.closePath()
    context.fill()
  }
}
