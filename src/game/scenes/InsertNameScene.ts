import Arcade, { EventListenerState, InputBox, SceneManager } from '../../arcade'
import { InsertGovernorGeneralName } from '../components/inputs'

class InsertNameScene extends Arcade.Scene {
  private _title: string
  private _input: InputBox

  constructor() {
    super()
    this._title = 'Insira o nome do Governador-Geral'
    this._input = new InsertGovernorGeneralName(650, 40, "red", "#f50", "black", "black")
  }

  public drawScene(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D
  ): void {
    context.fillStyle = "white"
    context.fillRect(0, 0, canvas.width, canvas.height)

    context.fillStyle = '#000000'
    context.font = '16px Arial, sans-serif'

    const titleSize = context.measureText(this._title)
    const xCoord = (canvas.width / 2) - (titleSize.width / 2)

    context.fillText(this._title, xCoord, 100)

    this._input.setPosition({
      canvas,
      align: 'vertical',
      y: this._input.height + 150
    })
    this._input.renderInputBox(context)
  }

  public handleMouseEvent(event: MouseEvent, scene?: SceneManager): void {
    switch (event.type) {
      case EventListenerState.MOUSE_MOVE:
        this._input.handleMouseMove(event, () => {
          scene?.currentScene.drawScene
        })
        break
      case EventListenerState.CLICK: 
        this._input.handleOnClick(event)
        break
    }
  }

  public handleKeyboardEvent(event: KeyboardEvent, scene?: SceneManager): void {
    switch (event.type) {
      case EventListenerState.KEY_DOWN:
        this._input.handleOnKeydown(event)
        break
    }
  }
}

export default InsertNameScene
