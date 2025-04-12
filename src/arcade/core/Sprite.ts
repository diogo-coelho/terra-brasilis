class Sprite {
  private _spritesheet: HTMLImageElement | null = null
  private _offsetX: number = 0
  private _offsetY: number = 0
  private _width: number
  private _height: number
  private _frames: number = 1
  private _currentFrame: number = 0
  private _duration: number = 1
  private _posX: number = 0
  private _posY: number = 0
  private _frameTime: number = 0
  private _zoomLevel: number = 1

  constructor(
    src: HTMLImageElement | string,
    width: number,
    height: number,
    offsetX: number,
    offsetY: number,
    frames: number,
    duration: number
  ) {
    this._width = width
    this._height = height
    this.setOffset(offsetX, offsetY)
    this.setSpritesheet(src)
    this.setFrames(frames)
    this.setDuration(duration)
    this.setFrameTime()
  }

  public setSpritesheet(src: HTMLImageElement | string) {
    if (src instanceof HTMLImageElement) {
      this._spritesheet = src
    } else {
      this._spritesheet = new Image()
      this._spritesheet.src = src
    }
  }

  public get spritesheet() {
    return this._spritesheet
  }
  public get offsetX() {
    return this._offsetX
  }
  public get offsetY() {
    return this._offsetY
  }
  public get width() {
    return this._width
  }
  public get height() {
    return this._height
  }
  public get frames() {
    return this._frames
  }
  public get currentFrame() {
    return this._currentFrame
  }
  public get duration() {
    return this._duration
  }
  public get posX() {
    return this._posX
  }
  public get posY() {
    return this._posY
  }

  public setOffset(offsetX: number, offsetY: number) {
    this._offsetX = offsetX
    this._offsetY = offsetY
  }

  public setFrames(frames: number) {
    this._currentFrame = 0
    this._frames = frames
  }

  public setDuration(duration: number) {
    this._duration = duration
  }

  public setPosition(posX: number, posY: number) {
    this._posX = posX
    this._posY = posY
  }

  public setFrameTime() {
    const date = new Date()
    if (this._duration > 0 && this._frames > 0) {
      this._frameTime = date.getTime() + this._duration / this._frames
    } else {
      this._frameTime = 0
    }
  }

  public animate(timer: Date) {
    if (timer.getMilliseconds() > this._frameTime) {
      this.nextFrame()
    }
  }

  public nextFrame() {
    if (this._duration > 0) {
      this.setFrameTime()

      this._offsetX = this._width * this._currentFrame

      if (this._currentFrame === this._frames - 1) {
        this._currentFrame = 0
      } else {
        this._currentFrame++
      }
    }
  }

  public draw(context: CanvasRenderingContext2D) {
    context.drawImage(
      this._spritesheet as HTMLImageElement,
      this._offsetX,
      this._offsetY,
      this._width,
      this._height,
      this._posX,
      this._posY,
      this._width * this._zoomLevel,
      this._height * this._zoomLevel
    )
  }
}

export default Sprite
