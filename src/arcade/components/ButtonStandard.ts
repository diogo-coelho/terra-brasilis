import ButtonError from '../errors/ButtonError'
import { ButtonPosition, Callback } from '../types'
import Button from './Button'

/**
 * Classe que representa um botão padrão no jogo.
 * Estende a classe Button e implementa métodos específicos para renderização e posicionamento.
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-15
 *
 * @description
 * A classe ButtonStandard é uma implementação concreta
 * da classe abstrata Button, representando um botão
 * padrão no jogo. Ela define propriedades como fonte,
 * tamanho da fonte, alinhamento do texto e métodos para
 * renderização e posicionamento do botão na tela.
 *
 * @constructor
 * @param {number} x - A largura inicial do botão.
 * @param {number} y - A altura inicial do botão.
 * @param {string} label - O rótulo do botão.
 * @param {string} font - A fonte do texto do botão.
 * @param {number} fontSize - O tamanho da fonte do texto do botão.
 * @param {CanvasTextAlign} textAlign - O alinhamento do texto do botão.
 * @param {CanvasTextBaseline} textBaseline - A linha de base do texto do botão.
 *
 * @example
 * const startButton = new ButtonStandard(
 *  100,
 *  50,
 *  'Start Game',
 *  'Arial',
 *  20,
 *  'center',
 *  'middle'
 * );
 */
export default class ButtonStandard extends Button {
  private _font: string
  private _fontSize: number
  private _textAlign: CanvasTextAlign
  private _textBaseline: CanvasTextBaseline

  constructor(
    x: number,
    y: number,
    label: string,
    font: string,
    fontSize: number,
    textAlign: CanvasTextAlign,
    textBaseline: CanvasTextBaseline
  ) {
    super(x, y, label)
    this._font = font
    this._fontSize = fontSize
    this._textAlign = textAlign
    this._textBaseline = textBaseline
  }

  public get font(): string {
    return this._font
  }

  public get fontSize(): number {
    return this._fontSize
  }

  public get textAlign(): CanvasTextAlign {
    return this._textAlign
  }

  public get textBaseline(): CanvasTextBaseline {
    return this._textBaseline
  }

  public set font(font: string) {
    this._font = font
  }

  public set fontSize(fontSize: number) {
    this._fontSize = fontSize
  }

  public set textAlign(textAlign: CanvasTextAlign) {
    this._textAlign = textAlign
  }

  public set textBaseline(textBaseline: CanvasTextBaseline) {
    this._textBaseline = textBaseline
  }

  public setPosition({ canvas, x, y, align }: ButtonPosition): void {
    if (!align) {
      if (!x && !y)
        throw new ButtonError(
          'É necessário fornecer pelo menos uma coordenada (x ou y) para posicionar o botão.'
        )
      this.positionX = x as number
      this.positionY = y as number
    } else {
      switch (align) {
        case 'vertical':
          if (!y)
            throw new ButtonError(`É necessário informar o valor da variável y`)
          this.setVerticalAlign(canvas, y)
          break
        case 'horizontal':
          if (!x)
            throw new ButtonError(`É necessário informar o valor da variável x`)
          this.setHorizontalAlign(canvas, x)
          break
      }
      return
    }
  }

  public isMouseOverButton(xCoord: number, yCoord: number): boolean {
    return (
      xCoord >= this.positionX &&
      xCoord <= this.positionX + this.width &&
      yCoord >= this.positionY &&
      yCoord <= this.positionY + this.height
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

  public renderButton(context: CanvasRenderingContext2D): void {
    context.fillStyle = this.backgroundColor || '#ccc'
    context.fillRect(this.positionX, this.positionY, this.width, this.height)

    context.fillStyle = this.color || 'white'
    context.font = `${this.fontSize} ${this.font}`
    context.textAlign = this.textAlign
    context.textBaseline = this.textBaseline
    context.fillText(
      this.label,
      this.positionX + this.width / 2,
      this.positionY + this.height / 2
    )
  }

  public handleMouseMove(event: MouseEvent, callback?: Callback): void {
    this.applyHoverOnButton(event)
    callback?.()
  }

  private setVerticalAlign(canvas: HTMLCanvasElement, y: number): void {
    this.positionX = canvas.width / 2 - this.width / 2
    this.positionY = y
  }

  private setHorizontalAlign(canvas: HTMLCanvasElement, x: number): void {
    this.positionY = canvas.height / 2 - this.height / 2
    this.positionX = x
  }
}
