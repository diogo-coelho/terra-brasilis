class SceneManagerError extends Error {
  private _message: string

  constructor(message: string) {
    super(message)
    this._message = message
  }

  public get message(): string {
    return this._message
  }
}