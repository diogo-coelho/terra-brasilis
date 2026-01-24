import ImageError from '../errors/ImageError'
import { ImageResizePayload, Position } from '../types'

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
  private _positionY: number = 0
  private _positionTargetY: number = 0
  private _positionX: number = 0
  private _positionTargetX: number = 0
  private _speed: number = 200
  private _initialized: boolean = false

  constructor(src: string, width?: number, height?: number) {
    this._image = new window.Image()
    this._image.src = src
    this._image.width = width || this._image.naturalWidth
    this._image.height = height || this._image.naturalHeight
  }

  public get image(): HTMLImageElement | null {
    return this._image
  }

  public get positionX(): number {
    return this._positionX
  }

  public get positionY(): number {
    return this._positionY
  }

  public set speed(value: number) {
    this._speed = value
  }

  public get speed(): number {
    return this._speed
  }

  /**
   * Verifica se a imagem foi carregada com sucesso.
   * @returns - Verdadeiro se a imagem estiver carregada, falso caso contrário.
   */
  public isLoaded(): boolean {
    return (
      this._image !== null &&
      this._image instanceof HTMLImageElement &&
      this._image.complete &&
      this._image.naturalWidth !== 0
    )
  }

  /**
   * Ajusta a imagem para cobrir todo o canvas, mantendo a proporção.
   * @param {HTMLCanvasElement} canvas - O elemento HTMLCanvasElement onde a imagem será ajustada.
   * @returns {void}
   */
  public setImageAsCover(canvas: HTMLCanvasElement): void {
    if (this._image === null || !this.isLoaded()) return

    const scale = Math.max(
      canvas.width / this._image!.naturalWidth,
      canvas.height / this._image!.naturalHeight
    )

    this._image.width = this._image!.naturalWidth * scale
    this._image.height = this._image!.naturalHeight * scale
  }

  /**
   * Redimensiona a imagem proporcionalmente com base na largura ou altura alvo.
   * @param {ImageResizePayload} params - Objeto contendo as propriedades de redimensionamento.
   * @returns {void}
   */
  public resizeProportionally({
    targetWidth,
    targetHeight,
    option = 'cover',
  }: ImageResizePayload): void {
    if (this._image === null || !this.isLoaded()) return
    if (!targetWidth && !targetHeight) {
      throw new ImageError(
        'Either targetWidth or targetHeight must be provided.'
      )
    }

    switch (option) {
      case 'cover': {
        if (!targetWidth)
          throw new ImageError('targetWidth is required for cover option.')

        const ratioWidth = this._image.naturalHeight / this._image.naturalWidth
        this._image.width = targetWidth
        this._image.height = targetWidth * ratioWidth
        break
      }
      case 'contain': {
        if (!targetHeight)
          throw new ImageError('targetHeight is required for contain option.')

        const ratioHeight = this._image.naturalWidth / this._image.naturalHeight
        this._image.height = targetHeight
        this._image.width = targetHeight * ratioHeight
        break
      }
    }
  }

  /**
   * Define a posição inicial da imagem.
   * @param {number} positionX - A posição X inicial da imagem.
   * @param {number} positionY - A posição Y inicial da imagem.
   * @returns {void}
   */
  public initialPosition(positionX: number, positionY: number): Position {
    if (!this.isLoaded()) {
      throw new ImageError('Image must be loaded to get its initial position.')
    }
    if (!this._initialized) {
      this._positionX = positionX || 0
      this._positionY = positionY || 0
      this._initialized = true
    }

    return {
      x: this._positionX,
      y: this._positionY,
    }
  }

  /**
   * Define a posição alvo da imagem.
   * @param {number} positionX - A posição X alvo da imagem.
   * @param {number} positionY - A posição Y alvo da imagem.
   * @returns {void}
   */
  public setTargetPosition(positionX: number, positionY: number): void {
    this._positionTargetX = positionX
    this._positionTargetY = positionY
  }

  /**
   * Atualiza a posição da imagem em direção à posição alvo.
   * @param {number} deltaTime - O tempo decorrido desde a última atualização.
   * @param {number} [speed] - A velocidade opcional para a atualização da posição.
   * @return {void}
   */
  public updatePosition(deltaTime: number, speed?: number): void {
    if (this._initialized) {
      this._positionX +=
        this._speed *
        deltaTime *
        Math.sign(this._positionTargetX - this._positionX)
      this._positionY +=
        this._speed *
        deltaTime *
        Math.sign(this._positionTargetY - this._positionY)

      if (this._positionX > this._positionTargetX) {
        this._positionX = this._positionTargetX
      }

      if (this._positionY > this._positionTargetY) {
        this._positionY = this._positionTargetY
      }
    }
  }
}
