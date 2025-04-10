import Arcade, { SceneManager, StandardButton } from '../../arcade'
import { NewGameButton, ContinueGameButton } from '../buttons'

class MenuScene extends Arcade.Scene {
  private _title: string
  private _buttons: StandardButton[]

  constructor() {
    super()
    this._title = 'Menu'
    this._buttons = [
      new NewGameButton(150, 80, 'Novo jogo'), 
      new ContinueGameButton(150, 80, 'Continuar jogo')     
    ]
  }

  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    context.fillStyle = '#CCCCCC'
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = '#000000'
    context.font = 'bold 16px Arial, sans-serif'

    const titleSize = context.measureText(this._title)
    let xCoord = canvas.width / 2 - titleSize.width / 2

    context.fillText(this._title, xCoord, 50)

    const initialPosition = 80

    this._buttons.forEach((btn, i) => {
      const margin = i === 0 ? 0 : 20
      btn.backgroundColor = 'green'
      btn.setPosition({ canvas, align: 'vertical', y: (((i * btn.height) + margin) + initialPosition) })
      btn.renderButton(context)
    })
  }

  public handleKeyboardEvent(event: KeyboardEvent, scene: SceneManager): void {
    console.log('MenuScene: handleKeyboardEvent', event.key)
    throw new Error('Method not implemented.')
  }

  public handleClickEvent(event: MouseEvent, scene?: SceneManager): void {
    throw new Error('Method not implemented.')
  }
}

export default MenuScene
