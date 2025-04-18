import { Callback, ColorOnHover, InputBoxClickHandle, Position } from "../../types/types"

abstract class InputBox {
  private _x: number = 0
  private _y: number = 0
  private _width: number
  private _height: number
  private _backgroundColor: string = ''
  private _color: string = ''
  private _backgroundColorOnHover: ColorOnHover = {
    default: '',
    hover: '',
  }
  private _colorOnHover: ColorOnHover = { default: '', hover: '' }
  private _isTyping: boolean = false
  private _inputText: string = ''
  private _cursorVisible: boolean = true

  constructor(width: number, height: number) {
    this._width = width
    this._height = height
  }

  public set x(x: number) {
    this._x = x
  }

  public get x(): number {
    return this._x
  }

  public set y(y: number) {
    this._y = y
  }

  public get y(): number {
    return this._y
  }

  public get width(): number {
    return this._width
  }

  public get height(): number {
    return this._height
  }

  public set backgroundColor(backgroundColor: string) {
    this._backgroundColor = backgroundColor
  }

  public get backgroundColor(): string {
    return this._backgroundColor
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

  public set color(color: string) {
    this._color = color
  }

  public get color(): string {
    return this._color
  }

  public set colorOnHover(colorOnHover: string) {
    this._colorOnHover = {
      default: this.color,
      hover: colorOnHover,
    }
  }

  public set isTyping(isTyping: boolean) {
    this._isTyping = isTyping
  }

  public get isTyping(): boolean {
    return this._isTyping
  }

  public get colorOnHover(): ColorOnHover {
    return this._colorOnHover
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

  abstract renderInputBox(context: CanvasRenderingContext2D): void

  abstract setPosition({ canvas, x, y }: Position): void
  
  abstract isMouseOverButton(xCoord: number, yCoord: number): boolean
  
  abstract handleMouseMove(event: MouseEvent, callback?: Callback): void
  
  public handleOnClick(event: MouseEvent): void {}

  public handleOnKeydown(event: KeyboardEvent, callback?: Callback ): void {}

}

export default InputBox