export default class Frame {
  private _frames: number
  private _currentFrame: number = 0
  private _frameDuration: number // duração de um frame
  private _accumulator: number = 0

  constructor(frames: number, totalDurationMs: number) {
    this._frames = frames
    this._frameDuration = frames > 0 ? totalDurationMs / frames / 1000 : 0
  }

  public get currentFrame(): number {
    return this._currentFrame
  }

  public update(deltaSeconds: number): number {
    if (this._frames <= 1 || this._frameDuration <= 0) {
      return this._currentFrame
    }

    this._accumulator += deltaSeconds

    if (this._accumulator >= this._frameDuration) {
      this._accumulator -= this._frameDuration
      this._currentFrame = (this._currentFrame + 1) % this._frames
    }

    return this._currentFrame
  }

  public reset(): void {
    this._currentFrame = 0
    this._accumulator = 0
  }
}
