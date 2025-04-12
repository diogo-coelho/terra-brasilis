class Text {
  private _text: string

  constructor(text: string) {
    this._text = text
  }

  public drawText(
    canvas: CanvasRenderingContext2D,
    size: number,
    font: string,
    posX: number,
    posY: number,
    color: string
  ) {
    canvas.font = size + 'px' + ' ' + font
    canvas.fillStyle = color
    canvas.fillText(this._text, posX, posY)
  }
}

export default Text
