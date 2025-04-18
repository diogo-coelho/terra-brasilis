import { Callback, InputBoxClickHandle, Position } from "@/arcade/types/types";
import InputBox from "../abstract/InputBox";
import { KeyCodeState } from "@/arcade/enums";

class StandardInputBox extends InputBox {
  private _font: string = 'Arial'
  private _fontSize: number = 14
  private _textAlign: CanvasTextAlign = 'center'
  private _textBaseLine: CanvasTextBaseline = 'middle'
  private _blinkingTimer: NodeJS.Timeout | undefined = undefined

  public get font(): string {
    return this._font
  }

  public get fontSize(): number {
    return this._fontSize
  }

  public set fontSize(fontSize: number) {
    this._fontSize = fontSize
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

  public set blinkingTimer(blinkingTimer: NodeJS.Timeout) {
    this._blinkingTimer = blinkingTimer
  }

  public get blinkingTimer(): NodeJS.Timeout {
    return this._blinkingTimer as NodeJS.Timeout
  }

  public setPosition(data: Position) {
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

  public renderInputBox(context: CanvasRenderingContext2D): void {
    context.strokeStyle = this.backgroundColor || '#ccc'
    context.strokeRect(this.x, this.y, this.width, this.height)

    context.fillStyle = this.color || 'white'
    context.font = `${this.fontSize}px ${this.font}`
    context.textAlign = this.textAlign
    context.textBaseline = this.textBaseLine
    context.fillText(
      this.inputText,
      this.x + this.width / 2,
      this.y + this.height / 2
    )

    if (this.isTyping && this.cursorVisible) {
      const textWidth = context.measureText(this.inputText).width;
      const cursorX = (this.x + this.width / 2) + (textWidth / 2);
      context.beginPath();
      context.moveTo(cursorX, (this.y + 12));
      context.lineTo(cursorX, (this.y + this.height - 12));
      context.strokeStyle = this.color;
      context.stroke();
    }
  }

  private blinkingCursor(): void {
    this.blinkingTimer = setInterval(() => {
      if (this.isTyping) {
        this.cursorVisible = !this.cursorVisible
      }
    }, 500)
  }

  private disableBlinkingCursor(): void {
    clearInterval(this.blinkingTimer)
  }

  public handleOnClick(event: MouseEvent, callback?: Callback): void {
    this.applyHoverOnButton(event)
    const isOnHover = this.isMouseOverButton(event.x, event.y)
    if (isOnHover) {
      this.isTyping = true
      this.cursorVisible = true 
      this.blinkingCursor()     
      callback
    } 
  }

  public handleOnKeydown(event: KeyboardEvent, callback?: Callback ): void {
    if (!this.isTyping) return
    if (event?.key === KeyCodeState.BACKSPACE) {
      this.inputText = this.inputText.slice(0, -1)
    } else if (event?.key.length === 1) {
      this.inputText += event?.key
    } else if (event?.key === KeyCodeState.ENTER) {
      console.log(event?.key)
      this.isTyping = false
      this.disableBlinkingCursor()
      callback
    }
  }

}

export default StandardInputBox