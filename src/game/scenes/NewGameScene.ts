import { SceneEvent } from '@/arcade/core'
import { Scene } from '@/arcade/interfaces'
import { SceneManager } from '@/arcade/types'

export default class NewGameScene extends SceneEvent implements Scene {
  private _title: string

  constructor() {
    super()
    this._title = 'New Game Scene'
  }

  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
    deltaTime: number
  ): void {
    /** Escreve a frase centralizada */
    context.fillStyle = '#ffffff'
    context.font = '30px "Jersey 15", sans-serif'
    context.lineWidth = 3
    context.strokeStyle = '#000000'
    context.textAlign = 'center'

    let xCoord = canvas.width / 2

    context.strokeText(this._title, xCoord, canvas.height / 2 + 100)
    context.fillText(this._title, xCoord, canvas.height / 2 + 100)
  }

  public handleKeyboardEvent?(
    event: KeyboardEvent,
    sceneManager: SceneManager
  ): void {
    console.log('Key pressed in NewGameScene:', event.key)
  }

  public handleMouseEvent?(
    event: MouseEvent,
    sceneManager: SceneManager
  ): void {
    console.log('Mouse event in NewGameScene:', event.type)
  }
}
