export default class Frame {
  private _frames: number
  private _currentFrame: number = 1
  private _frameDuration: number // duração de um frame
  private _accumulator: number = 0

  constructor(frames: number, totalDuration: number) {
    this._frames = frames
    this._frameDuration = frames > 0 ? (totalDuration / frames) : 0
  }

  public get currentFrame(): number {
    return this._currentFrame
  }

  public update(deltaTime: number): number {
    if (this._frames <= 1 || this._frameDuration <= 0) {
      return this._currentFrame
    }

    this._accumulator += deltaTime

    if (this._accumulator >= this._frameDuration) {
      this._accumulator = 0
      this._currentFrame = this._currentFrame < this._frames ? (this._currentFrame + 1) : 1
    }
    return this._currentFrame
  }

  public reset(): void {
    this._currentFrame = 1
    this._accumulator = 0
  }
}
