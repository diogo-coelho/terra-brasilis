import { ButtonPosition } from "../types/types";
import Button from "./Button";

class StandardButton extends Button {

  public setPosition(data: ButtonPosition) {
    if (data.align) {
      switch(data.align) {
        case 'vertical':
          if (!data.y) throw new Error(`É necessário informar o valor da variável y`)
          this.setVerticalAlign(data.canvas, data.y)
          break
        case 'horizontal':
          if (!data.x) throw new Error(`É necessário informar o valor da variável x`)
          this.setHorizontalAlign(data.canvas, data.x)
          break
      }
      return
    } else {
      if (!data.x && !data.y) 
        throw new Error(`Botões sem alinhamento precisam das variáveis x e y para serem posicionados em tela`)
      this.x = data.x as number
      this.y = data.y as number
    }
  }

  private setVerticalAlign(canvas: HTMLCanvasElement, y: number): void {
    this.x = canvas.width / 2 - this.width / 2
    this.y = y
  }

  private setHorizontalAlign(canvas: HTMLCanvasElement, x: number): void {
    this.y = canvas.height / 2 - this.height / 2
    this.x = x
  }

  public renderButton(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.backgroundColor || '#ccc'
    context.fillRect(this.x, this.y, this.width, this.height)

    context.fillStyle = this.color || 'white'
    context.font = '16px Arial'
    context.textAlign = 'center'
    context.textBaseline = 'middle'
    context.fillText(this.label, this.x + this.width / 2, this.y + this.height / 2)
  }
  
}

export default StandardButton