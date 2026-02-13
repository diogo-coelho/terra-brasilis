import Sprite from '@/arcade/core/Sprite'
import Image from '@/arcade/images/Image'

export default class Unit extends Sprite {
  protected _unitSpeed: number = 0
  protected _path: any
  protected _destination: any
  protected _hasShadow: boolean = true

  constructor(
    width: number,
    height: number,
    frames: number,
    durationPerFrame: number,
    spritesheet?: Image
  ) {
    super(
      spritesheet as unknown as Image,
      width,
      height,
      frames,
      0,
      0,
      durationPerFrame
    )
  }

  public set unitSpeed(value: number) {
    this._unitSpeed = value
  }

  public get unitSpeed(): number {
    return this._unitSpeed
  }

  public set destination(value: any) {
    this._destination = value
  }

  public get destination(): any {
    return this._destination
  }

  public set path(value: any) {
    this._path = value
  }

  public get path(): any {
    return this._path
  }

  public set hasShadow(value: boolean) {
    this._hasShadow = value
  }

  public get hasShadow(): boolean {
    return this._hasShadow
  }

  public drawUnit(
    canvas: HTMLCanvasElement,
    context: CanvasRenderingContext2D,
  ): void {
    this.draw(context, this._hasShadow)
  }
}
