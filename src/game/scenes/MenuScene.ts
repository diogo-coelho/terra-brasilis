import { SceneEvent } from '@/arcade/core'
import Scene from '@/arcade/interfaces/Scene'

export default class MenuScene extends SceneEvent implements Scene {
  private _title: string

  constructor() {
    super()
    this._title = 'Menu Principal'
  }

  drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    context.fillStyle = '#000000'
    context.font = 'bold 40px Arial, sans-serif'

    const titleSize = context.measureText(this._title)
    let xCoord = canvas.width / 2 - titleSize.width / 2

    context.fillText(this._title, xCoord, canvas.height / 2)

    context.fillStyle = '#FF0000'
    context.font = '20px Arial, sans-serif'
  }
}
