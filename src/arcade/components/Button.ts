abstract class Button {
  private _x: number = 0
  private _y: number = 0
  private _width: number
  private _height: number
  private _backgroundColor: string = ''
  private _color: string = ''
  private _label: string

  constructor(width: number, height: number, label: string) {
    this._width = width
    this._height = height
    this._label = label
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

  public set color(color: string) {
    this._color = color
  }

  public get color(): string {
    return this._color
  }

  public get label(): string {
    return this._label
  }

  abstract renderButton(context: CanvasRenderingContext2D): void

}

export default Button