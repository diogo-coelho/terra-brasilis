class Timer {
  private _date: Date | null = null

  public update() {
    const date = new Date()
    this._date = date
  }

  public getMilliseconds() {
    return this._date!.getTime()
  }

  public getSeconds() {
    return Math.round((this._date as Date)?.getTime() / 1000)
  }

  public get date() {
    return this._date
  }
}

export default Timer