import Arcade, { KeyCodeState, SceneManager } from '../../arcade'
import { GameSceneState } from '../enums'

class IntroScene extends Arcade.Scene {
  private _title: string
  private _phrase: string

  constructor() {
    super()
    this._title = 'Terra Brasilis'
    this._phrase = 'Press ENTER to start'
  }

  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    const gradient = context.createLinearGradient(
      0,
      canvas.width,
      canvas.height,
      0
    )
    gradient.addColorStop(0, '#CCEFFF')
    gradient.addColorStop(0, '#52bcff')

    context.fillStyle = gradient
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = '#000000'
    context.font = 'bold 40px Arial, sans-serif'

    const titleSize = context.measureText(this._title)
    let xCoord = canvas.width / 2 - titleSize.width / 2

    context.fillText(this._title, xCoord, canvas.height / 2)

    context.fillStyle = '#FF0000'
    context.font = '20px Arial, sans-serif'

    const phraseSize = context.measureText(this._phrase)
    xCoord = canvas.width / 2 - phraseSize.width / 2
    context.fillText(this._phrase, xCoord, canvas.height / 2 + 50)
  }

  handleKeyboardEvent(
    event: KeyboardEvent,
    scene: SceneManager
  ): void {
    if (event.key !== KeyCodeState.ENTER) return

    scene.setCurrentScene(GameSceneState.MENU)
  }
}

export default IntroScene
