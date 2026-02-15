import { AlignedPosition, ColorOnHover, SceneManager } from '@/arcade/types'
import GameObject from '../../core/game/GameObject'

/**
 * Classe abstrata base para campos de entrada.
 *
 * @class Input
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-06-20
 *
 * @description
 * Define a estrutura base para campos de input do jogo, gerenciando
 * estado de foco, texto digitado, cursor piscante e estilização de borda.
 *
 * @extends GameObject
 *
 * @remarks
 * Classes concretas devem implementar renderInputBox, setPosition e isMouseOverInput.
 *
 * @see InputStandard
 */
export default abstract class Input extends GameObject {
  private _backgroundColorOnHover: ColorOnHover = {
    default: '',
    hover: '',
  }
  private _colorOnHover: ColorOnHover = { default: '', hover: '' }
  private _isTyping: boolean = false
  private _inputText: string = ''
  private _cursorVisible: boolean = false
  private _borderWidth: number = 0
  private _borderColor: string = ''

  constructor(width: number, height: number) {
    super(width, height)
  }

  public set backgroundColorOnHover(backgroundColorOnHover: string) {
    this._backgroundColorOnHover = {
      default: this.backgroundColor,
      hover: backgroundColorOnHover,
    }
  }

  public get backgroundColorOnHover(): ColorOnHover {
    return this._backgroundColorOnHover
  }

  public set colorOnHover(colorOnHover: string) {
    this._colorOnHover = {
      default: this.color,
      hover: colorOnHover,
    }
  }

  public get colorOnHover(): ColorOnHover {
    return this._colorOnHover
  }

  public set isTyping(isTyping: boolean) {
    this._isTyping = isTyping
  }

  public get isTyping(): boolean {
    return this._isTyping
  }

  public set inputText(inputText: string) {
    this._inputText = inputText
  }

  public get inputText(): string {
    return this._inputText
  }

  public set cursorVisible(cursorVisible: boolean) {
    this._cursorVisible = cursorVisible
  }

  public get cursorVisible(): boolean {
    return this._cursorVisible
  }

  public set borderWidth(borderWidth: number) {
    this._borderWidth = borderWidth
  }

  public get borderWidth(): number {
    return this._borderWidth
  }

  public set borderColor(borderColor: string) {
    this._borderColor = borderColor
  }

  public get borderColor(): string {
    return this._borderColor
  }

  abstract renderInputBox(context: CanvasRenderingContext2D): void

  abstract setPosition({ canvas, x, y, align }: AlignedPosition): void

  abstract isMouseOverInput(xCoords: number, yCoords: number): boolean

  public onClick(scene: SceneManager): void {}
}
