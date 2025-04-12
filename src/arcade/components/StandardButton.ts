import { ButtonPosition, Callback } from '../types/types'
import Button from './Button'

class StandardButton extends Button {
  private _font: string = 'Arial'
  private _fontSize: string = '16px'
  private _textAlign: CanvasTextAlign = 'center'
  private _textBaseLine: CanvasTextBaseline = 'middle'

  public get font(): string {
    return this._font
  }

  public get fontSize(): string {
    return this._fontSize
  }

  public get textAlign(): CanvasTextAlign {
    return this._textAlign
  }

  public get textBaseLine(): CanvasTextBaseline {
    return this._textBaseLine
  }

  public set font(font: string) {
    this._font = font
  }

  public set textAlign(textAlign: CanvasTextAlign) {
    this._textAlign = textAlign
  }

  public set textBaseLine(textBaseLine: CanvasTextBaseline) {
    this._textBaseLine = textBaseLine
  }

  public setPosition(data: ButtonPosition) {
    if (data.align) {
      switch (data.align) {
        case 'vertical':
          if (!data.y)
            throw new Error(`É necessário informar o valor da variável y`)
          this.setVerticalAlign(data.canvas, data.y)
          break
        case 'horizontal':
          if (!data.x)
            throw new Error(`É necessário informar o valor da variável x`)
          this.setHorizontalAlign(data.canvas, data.x)
          break
      }
      return
    } else {
      if (!data.x && !data.y)
        throw new Error(
          `Botões sem alinhamento precisam das variáveis x e y para serem posicionados em tela`
        )
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

  public isMouseOverButton(xCoord: number, yCoord: number): boolean {
    return (
      xCoord >= this.x &&
      xCoord <= this.x + this.width &&
      yCoord >= this.y &&
      yCoord <= this.y + this.height
    )
  }

  public applyHoverOnButton(event: MouseEvent) {
    const hovering = this.isMouseOverButton(event.x, event.y)
    if (hovering) {
      this.backgroundColor = this.backgroundColorOnHover.hover
      this.color = this.colorOnHover.hover
    } else {
      this.backgroundColor = this.backgroundColorOnHover.default
      this.color = this.colorOnHover.default
    }
  }

  public handleMouseMove(event: MouseEvent, callback?: Callback): void {
    this.applyHoverOnButton(event)
    callback
  }

  public renderButton(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.backgroundColor || '#ccc'
    context.fillRect(this.x, this.y, this.width, this.height)

    context.fillStyle = this.color || 'white'
    context.font = `${this.fontSize} ${this.font}`
    context.textAlign = this.textAlign
    context.textBaseline = this.textBaseLine
    context.fillText(
      this.label,
      this.x + this.width / 2,
      this.y + this.height / 2
    )
  }
}

export default StandardButton
