import Arcade from '../../arcade'

class InsertNameScene extends Arcade.Scene {
  private _title: string

  constructor() {
    super()
    this._title = 'Insira o nome do Governador-Geral'
  }

  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    const titleSize = context.measureText(this._title)
    const xCoord = canvas.width / 2 - titleSize.width / 2

    context.fillText(this._title, xCoord, canvas.height / 2)
  }
}

export default InsertNameScene
