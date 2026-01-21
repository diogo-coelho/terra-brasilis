/**
 * Classe que representa uma imagem carregada no navegador.
 *
 * @class Image
 *
 * @author Diogo Coelho
 * @version 1.0.0
 * @since 2024-01-15
 *
 * @example
 * const myImage = new Image('path/to/image.png', 100, 200);
 *
 * @see HTMLImageElement
 * @see Window
 *
 */
export default class Image {
  private _image: HTMLImageElement | null = null
  private _width: number = 0
  private _height: number = 0

  constructor(src: string, width?: number, height?: number) {
    this._image = new window.Image()
    this._image.src = src
    if (width) {
      this._width = width
    }
    if (height) {
      this._height = height
    }
  }

  public get image(): HTMLImageElement | null {
    return this._image
  }

  public set width(value: number) {
    this._width = value
  }

  public set height(value: number) {
    this._height = value
  }

  public get width(): number {
    return this._width
  }

  public get height(): number {
    return this._height
  }

  public isLoaded(): boolean {
    return (
      this._image !== null &&
      this._image instanceof HTMLImageElement &&
      this._image.complete &&
      this._image.naturalWidth !== 0
    )
  }
}
