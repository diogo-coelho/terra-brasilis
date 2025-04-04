import Arcade from "@/arcade";
import { Callback, SceneConfig } from "@/arcade/types/types";

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

  public handleKeyboardEvent(configs: SceneConfig): void {
    throw new Error("Method not implemented.");
  }
 
}

export default MenuScene