import Arcade, { SceneManager } from '../../arcade'

class MenuScene extends Arcade.Scene {
  private _title: string

  constructor() {
    super()
    this._title = 'Menu'
  }

  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    context.fillStyle = '#CCCCCC'
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = '#000000'
    context.font = 'bold 10px Arial, sans-serif'

    context.fillText(this._title, 100, canvas.height / 2)
  }

  public handleKeyboardEvent(
    event: KeyboardEvent,
    scene: SceneManager
  ): void {
    console.log('MenuScene: handleKeyboardEvent', event.key)
    throw new Error('Method not implemented.')
  }
}

export default MenuScene
